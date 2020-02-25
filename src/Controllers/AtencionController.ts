import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { AtencionDAO } from '../DAO/AtencionDAO'
import { ResponseStatus } from "../ConfigRes/resStatus";

export default class AtencionController {

	constructor(@Inject private AtencionDAO: AtencionDAO, @Inject private responseStatus: ResponseStatus) { }
	/**
	 * Crear atencion luego de haber seleccioando el flujo a ejecutar.
	 * 
	 * @param {Request} req  request que contiene el codigo del flujo y codigo de login de usuario
	 * @param {Response} res respuesta como 200 o 201
	 * @param {NextFunction} next funcion next
	 * @returns {Promise}
	 */
	async createAtencion(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			let { CodLogin, CodFlujo } = req.body;
			const validation = await this.AtencionDAO.validateAtencion(CodLogin, CodFlujo);
			if (validation) {
				const result = await this.AtencionDAO.createAtencion(req.body);
				return res.status(200).json(result);
			} else {
				return res.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
			}
		} catch (error) {
			console.log(error)
		}
	}

	/* Metodo que recibe los datos del formulario */
	async createAtencionPasoCampo(request: any): Promise<void> {
		let validation: any; let idAtnPaso: any;
		let data: any;
		let validacionCampos: any;
		let valAtencionCampo: any;
		try {
			const { CodAtencion, CodPaso, Secuencia, Soluciona, CodPasoDestino } = request[0].atencionPaso;
			const { CodAtencionPaso, CodProceso, TipoServicio, Servicio, Request, Response, NumOrden } = request[0].atencionProceso;
			const { CodCuestionarioCampo, ValorCampo } = request[0].atencionCampo;
			if (CodAtencion != '' && CodPaso != '' && CodPasoDestino != '') {
				validation = await this.AtencionDAO.createAtencionPasoCampo(request[0].atencionPaso);
				idAtnPaso = validation.recordset[0].Id_AtencionPaso;
			} else {
				return this.validadorMsgError(201, 'crear atención paso campo');
			}
			//Valida que todos los campos de los objetos esten llenos
			validacionCampos = await this.validarInsert(request[0].atencionProceso);

			if (request[0].atencionProceso) {
				if (
					CodAtencionPaso != '' &&
					CodProceso != '' &&
					TipoServicio != '' &&
					Servicio != '' &&
					Request != '' &&
					Response != '' &&
					NumOrden != ''
				) {
					let idProceso = await this.AtencionDAO.createAtencionProceso(idAtnPaso, request[0].atencionProceso, request[0].atencionProcesoSalida);
				} else if (
					CodAtencionPaso == '' ||
					CodProceso == '' ||
					TipoServicio == '' ||
					Servicio == '' ||
					Request == '' ||
					Response == '' ||
					NumOrden == ''

				) {
					//return;
				} else {
					return this.validadorMsgError(201, 'crear atencion proceso');
				}
			}
			valAtencionCampo = await this.validarArrayAtencionCampo(request[0].atencionCampo);
			//Valida que los objetos atencionPaso y atencionCampo esten llenos
			if (request[0].atencionCampo) {
				if (valAtencionCampo == 1) {
					validation = await this.AtencionDAO.createAtencionCampo(request[0].atencionCampo, idAtnPaso);
				} else if (valAtencionCampo == 2) {
					return this.validadorMsgError(201, 'crear atencion campo');
				}
			}
			return this.validadorMsgError(200, '');
		} catch (error) {
		}
	}
	// Este metodo permite validar los campos de atencionProceso --- >> esta pendiente de ser utilizado	
	public async validarInsert(camposValidar: any) {
		for (var i = 0; i < camposValidar.length; i++) {
			if (camposValidar[i] == '') {
			   return false;
			}
		}
		return true;
	}
	// Metodo para adcionar los mensajes de validaciones 
	public async validadorMsgError(estado: any, clas: any) {
		let data: any;

		if (estado == 200 && clas == '') {
			data = {
				status: estado,
				msg: 'Datos registrados'
			}
			return data;
		} else {
			data = {
				status: estado,
				msg: 'Error en los datos ingresados ' + clas
			}
			return data;
		}
	}
	//Este metodo permite validar los datos que llegan de atencionCampo
	public async validarArrayAtencionCampo(atencionCampo: any) {
		let resAtencion: number = 1;
		atencionCampo.forEach((elemento: any, indice: number) => {
			if (
				elemento.CodCuestionarioCampo != '' &&
				elemento.ValorCampo == ''
			) {
				resAtencion = 2;
			}
			if (
				elemento.CodCuestionarioCampo == '' &&
				elemento.ValorCampo != ''
			) {
				resAtencion = 2;
			}
			if (
				elemento.CodCuestionarioCampo == '' &&
				elemento.ValorCampo == '' &&
				atencionCampo.length > 1
			) {
				resAtencion = 2;
			}
			if (
				elemento.CodCuestionarioCampo == '' &&
				elemento.ValorCampo == '' &&
				atencionCampo.length == 1
			) {
				resAtencion = 3;
			}
			if (
				elemento.CodCuestionarioCampo != '' &&
				elemento.ValorCampo != '' &&
				atencionCampo.length > 1
			) {
				resAtencion = 1;
			}
		});
		return resAtencion;
	}

	async getLastStep(CodAtencion: any): Promise<void> {
		try {
			const result = await this.AtencionDAO.ultimoAtencionPaso(CodAtencion);
			return result;
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

	async atencionPasoAtras(idAtencion:any,idPaso:any): Promise<void> {
		try {
			const result = await this.AtencionDAO.atencionPasoAtras(idAtencion,idPaso);
			return result;
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

}

