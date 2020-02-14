import IntegracionToaService from '../services/IntegracionToaService'
import ToaFactory from '../FactoryApolo/ToaFactory'
import { Container, Inject } from "typescript-ioc";
import moments  from 'moment'
import FechaConsulta from '../ValidationParameters/FechaConsulta'
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import ConfigIntegraciones from '../Config/configIntegraciones'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import LoguinModel from '../ModelTableIntegration/LoguinModel'

import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'
import IntegracionToaResponse from '../ResponseTable/IntegracionToaResponse'

export default class IntegracionToaController {
	private integracionToaService:IntegracionToaService
	private fechaConsulta:FechaConsulta
	private atencionProcesoDao:AtencionProcesoDao
	private registrarToaFactory:RegistrarToaFactory
	private integracionToaResponse:IntegracionToaResponse
	private toaFactory:ToaFactory

	private atencionPostModels:AtencionProcesoModel
	private configIntegraciones:ConfigIntegraciones

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
		this.integracionToaService = Container.get(IntegracionToaService)
		this.fechaConsulta = Container.get(FechaConsulta)
		this.atencionProcesoDao = Container.get(AtencionProcesoDao)
		this.registrarToaFactory = Container.get(RegistrarToaFactory)
		this.integracionToaResponse = Container.get(IntegracionToaResponse)
		this.toaFactory = Container.get(ToaFactory)

		this.atencionPostModels = Container.get(AtencionProcesoModel)
		this.configIntegraciones = Container.get(ConfigIntegraciones)
	}

	 async getIntegracionToa(tipo_orden:string,n_orden:string,valor:string):Promise<Object> {
		let Id_Login:number|any = null

		let fechaFin   = await this.fechaConsulta.getDateCurrent()
		let fechaHasta = await this.fechaConsulta.getDatePass()

		let resulIdToa:any = await this.atencionProcesoDao.searchIdProcesoToa()
		/**
			Integracion  obtener activityType de la orden
		**/

		let resToa:any = await this.integracionToaService.serviceIntegrationToa(tipo_orden,n_orden,fechaFin,fechaHasta)
		if(resToa[0].responseToa.statusOrden == 'error_request'){
			let response:Object|any = 
			{ 
				response : 
				{ 
					status: null, 
					activityType: null,  
					statusOrden: 'no encontrada', 
					error: 'Bad Request'
				}
			}
			return response
		}
		let insertData = await this.setDataModels(n_orden,tipo_orden,fechaHasta,fechaFin,resulIdToa.recordset[0].Id_Proceso,resToa)
		if(resToa[0].responseToa.statusOrden == 'no encontrada'){
			const responseInsertar = this.registrarToaFactory.registraIntegracion('no_procesado',insertData)
			let response:Object|any = { response : resToa[0].responseToa }
			return response
		}
		const responseInsertar = this.registrarToaFactory.registraIntegracion('procesado',insertData)
		/**
			Integracion  datos de orden
		**/

		let toaInfo:any = await this.toaFactory.factoryIntegracionToa('orden',resToa[0].responseToa.orden)
		if(toaInfo[0].responseToa.statusOrden =='error_request'){
			let response:Object|any = 
			{
				response : 
				{ 
					status: null, 
					activityType: null,  
					statusOrden: 'no encontrada', 
					error: 'Bad Request'
				}
			}
			return response
		}
		let setModelsInsert = await this.setModelSave(n_orden,tipo_orden,resulIdToa.recordset[0].Id_Proceso,toaInfo)
		let reponseSql:any = await this.registrarToaFactory.registraIntegracion('servicioStatus',setModelsInsert)
		/**
			Integracion datos Tecnico 
		**/

		let toaTecnico:any = await this.toaFactory.factoryIntegracionToa('tecnico',toaInfo[1].responseIntegracion.resourceId)
		if(toaTecnico[0].responseToa.statusOrden =='error_request'){
			let response:Object|any = 
			{
				response : 
				{ 
					status: null, 
					activityType: null,  
					statusOrden: 'no encontrada', 
					error: 'Bad Request'
				}
			}
			return response
		}
		
		let reponseTecnico:any = await this.setModelSaveTecnico(n_orden,tipo_orden,resulIdToa.recordset[0].Id_Proceso,toaTecnico)
		let reponseSqlTecnico:any = await this.registrarToaFactory.registraIntegracion('servicioTecnico',reponseTecnico)
		let loguinData = await this.setLoguinModel(toaTecnico)
		let loguinConsult:any = await this.registrarToaFactory.registraIntegracion('tecnicoLoguinConsult',loguinData)
		if(loguinConsult.response.rowsAffected[0] > 0){
			Id_Login = loguinConsult.response.recordset[0].Id_Login
		}else{
			let loguinRegister = await this.registrarToaFactory.registraIntegracion('tecnicoLoguinRegister',loguinData)
			Id_Login = loguinRegister.response.recordset[0].Id_Login
		}

		this.integracionToaResponse.response = {
			activityId : resToa[1].responseIntegracion.items[0].activityId,
			status : toaInfo[0].responseToa.status,
			activityType : toaInfo[0].responseToa.activityType,
			statusOrden : toaInfo[0].responseToa.statusOrden,
			resourceId : toaTecnico[0].responseToa.resourceId,
			statusTecnico : toaTecnico[0].responseToa.status,
			name : toaTecnico[0].responseToa.name,
			IdLogin: Id_Login
		}

		return this.integracionToaResponse
	}

	async setDataModels(n_orden:string,tipo_orden:string,fechaHasta:string,fechaFin:string,idIntegracionToa:number,resToa:any): Promise<Object> {
		this.atencionPostModels.CodProceso = idIntegracionToa
		this.atencionPostModels.NumOrden = n_orden
		this.atencionPostModels.Request = n_orden + '-' + tipo_orden 
		this.atencionPostModels.Response = JSON.stringify(resToa[1].responseIntegracion)
		this.atencionPostModels.Servicio = resToa[1].responseIntegracion.links[0].href
		this.atencionPostModels.Estado = (resToa[0].responseToa.statusOrden == 'encontrada') ? 'orden_encontrada' : 'orden_no_encontrada'

		return this.atencionPostModels

	}

	async setModelSave(n_orden:string,tipo_orden:string,idIntegracionToa:number,response:any): Promise<Object> {
		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = response[1].responseIntegracion.activityId
		atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		atencionPostModels.Estado = 'orden_encontrada' 
		delete response[1].responseIntegracion.XA_REPAIR_INFO
		delete response[1].responseIntegracion.XA_TELEPHONE_DATA
		delete response[1].responseIntegracion.XA_BROADBAND_DATA
		delete response[1].responseIntegracion.XA_TV_DATA
		delete response[1].responseIntegracion.XA_EQUIPMENT
		atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return atencionPostModels

	}

	async setModelSaveTecnico(n_orden:string,tipo_orden:string,idIntegracionToa:number,response:any):Promise<Object> {
		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = response[1].responseIntegracion.resourceId
		atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		atencionPostModels.Estado = 'orden_encontrada' 
		atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return atencionPostModels
	}

	async setLoguinModel(response:Object|any):Promise<Object> {
		const loguinModel:LoguinModel = Container.get(LoguinModel)
		loguinModel.Usuario = response[1].responseIntegracion.name
		loguinModel.ResourceId = response[1].responseIntegracion.resourceId
		return loguinModel
	}
}
