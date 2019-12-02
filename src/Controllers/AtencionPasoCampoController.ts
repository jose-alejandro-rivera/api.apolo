import { Inject, Container } from "typescript-ioc";
import { AtencionPasoCampoDAO } from '../DAO/AtencionPasoCampoDAO'

export default class AtencionPasoCampoController {
	// private flujos: FlujoModels[]
	constructor(
		@Inject private atencionPasoCampoDAO: AtencionPasoCampoDAO,

	) {
		//this.flujos = []
	}
	/* Metodo que recibe los datos del formulario */
	async createAtencionPasoCampo(request: any): Promise<void> {
		let validation: any; let idAtnPaso: any;
		let data: any;
		let validacionCampos: any;
		let valAtencionCampo: any;
		try {
			const { CodAtencion, CodPaso, Secuencia, Soluciona } = request[0].atencionPaso;
			const { CodAtencionPaso, CodProceso, TipoServicio, Servicio, Request, Response } = request[0].atencionProceso;
			const { CodCuestionarioCampo, ValorCampo } = request[0].atencionCampo;
			if (CodAtencion != '' && CodPaso != '' && Secuencia != '' && Soluciona != '') {
				validation = await this.atencionPasoCampoDAO.createAtencionPasoCampo(request[0].atencionPaso, request[0].atencionProceso, request[0].atencionProcesoSalida, request[0].atencionCampo);
				idAtnPaso = validation;
			} else {
				data = {
					status: 201,
					msg: 'Error en los datos ingresados'
				}
				return data;
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
					Response != ''
				) {
					let idProceso = await this.atencionPasoCampoDAO.createAtencionProceso(idAtnPaso, request[0].atencionProceso, request[0].atencionProcesoSalida);
				} else if (
					CodAtencionPaso == '' &&
					CodProceso == '' &&
					TipoServicio == '' &&
					Servicio == '' &&
					Request == '' &&
					Response == ''

				) {

				} else {
					data = {
						status: 201,
						msg: 'Error en los datos ingresados'
					}
					return data;
				}
			}
			valAtencionCampo = await this.validarArrayAtencionCampo(request[0].atencionCampo);
			//Valida que los objetos atencionPaso y atencionCampo esten llenos
			if (request[0].atencionCampo) {
				if (valAtencionCampo == 1) {
					validation = await this.atencionPasoCampoDAO.createAtencionCampo(request[0].atencionCampo, idAtnPaso);
				} else if (valAtencionCampo == 3) {

				} else {
					data = {
						status: 201,
						msg: 'Error en los datos ingresados'
					}
					return data;
				}
			}
			data = {
				status: 200,
				msg: 'Datos registrados'
			}
			return data;
		} catch (error) {
		}
	}
	public async validarInsert(camposValidar: any) {
		let arrayList = [];
		arrayList.push(camposValidar);
		for (let x in camposValidar) {
			if (camposValidar[x] == '') {
				return false;
			} else {
				return true;
			}
		}
	}

	public async validarArrayAtencionCampo(atencionCampo: any) {
		let resAtencion: number = 1;
		atencionCampo.forEach((elemento: any, indice: any) => {
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
				elemento.CodCuestionarioCampo != '' &&
				elemento.ValorCampo != '' &&
				atencionCampo.length > 0
			) {
				resAtencion = 1;
			}
		});
		return resAtencion;
	}

}