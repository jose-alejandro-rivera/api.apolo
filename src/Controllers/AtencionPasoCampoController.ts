import { Request, Response, NextFunction } from 'express'
import { Inject, Container } from "typescript-ioc";
import FlujoModels from '../models/FlujoModels'
import Conections from '../connet'
import Conection from '../loaders/databaseLoader'
import { AtencionPasoCampoDAO } from '../DAO/AtencionPasoCampoDAO'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { request } from 'https';

export default class AtencionPasoCampoController {
	//	private flujos: FlujoModels[]
	constructor(
		@Inject private atencionPasoCampoDAO: AtencionPasoCampoDAO,

	) {
		//this.flujos = []
	}
	/* Metodo que recibe los datos del formulario */
	async createAtencionPasoCampo(request: any): Promise<void> {
		let validation: any; let idAtnPaso: any;
		let data: any;
		let validacionCampos: any;
		let valAtencionCampo: any;
		try {
			console.log(request[0].atencionCampo,'new array de datos')
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
			if(request[0].atencionProceso){
				if (
					CodAtencionPaso != '' &&
					CodProceso != '' &&
					TipoServicio != '' &&
					Servicio != '' &&
					Request != '' &&
					Response != ''
				) {
					let idProceso = await this.atencionPasoCampoDAO.createAtencionProceso(idAtnPaso, request[0].atencionProceso, request[0].atencionProcesoSalida);
				}else{
					data = {
						status: 201,
						msg: 'Error en los datos ingresados'
					}
					return data;
				}
			}

			//validacionCampos = await this.validarInsert(request[0].atencionCampo);
			valAtencionCampo = await this.validarArrayAtencionCampo(request[0].atencionCampo);
			console.log('----------- valAtencionCampo ', valAtencionCampo)
			//Valida que los objetos atencionPaso y atencionCampo esten llenos
			if(request[0].atencionCampo){
				if (valAtencionCampo) {
					validation = await this.atencionPasoCampoDAO.createAtencionCampo(request[0].atencionCampo,idAtnPaso);
				}else{
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

	public async validarArrayAtencionCampo(atencionCampo: any){

		let resCodCuestionarioCampo:any = atencionCampo.find((e:any) => {
			 return e.CodCuestionarioCampo != ''
		})
		let resValorCampo:any = atencionCampo.find((e:any) => { 
			return e.ValorCampo != ''
		})

		if(resCodCuestionarioCampo.CodCuestionarioCampo == ""){
			return false;
		}
		if(resCodCuestionarioCampo.ValorCampo == ""){
			return false;
		}
		return true;
	}
}

