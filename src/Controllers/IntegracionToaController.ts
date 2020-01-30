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

import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'
import IntegracionToaResponse from '../ResponseTable/IntegracionToaResponse'

export default class IntegracionToaController {

	constructor(@Inject private responseIntegracion:ResponseIntegracion ){}

	 async getIntegracionToa(tipo_orden:string,n_orden:string,valor:string):Promise<Object> {

		const integracionToaService:IntegracionToaService = Container.get(IntegracionToaService)
		const fechaConsulta:FechaConsulta = Container.get(FechaConsulta)
		const atencionProcesoDao:AtencionProcesoDao = Container.get(AtencionProcesoDao)
		const registrarToaFactory:RegistrarToaFactory = Container.get(RegistrarToaFactory)
		const integracionToaResponse:IntegracionToaResponse = Container.get(IntegracionToaResponse);

		/*OBTEBNER FECHA ACTUAL Y PASADA*/
		let fechaFin   = await fechaConsulta.getDateCurrent()
		let fechaHasta = await fechaConsulta.getDatePass()
		/*CONSULTA EL ID DEL PROCESO*/
		let resulIdToa:any = await atencionProcesoDao.searchIdProcesoToa()
		/*RESPONSE INTEGRACION TOA VALIDATE */
		let resToa:any = await integracionToaService.serviceIntegrationToa(tipo_orden,n_orden,fechaFin,fechaHasta)
		
    let insertData = await this.setDataModels(n_orden,tipo_orden,fechaHasta,fechaFin,resulIdToa.recordset[0].Id_Proceso,resToa)
  
		if(resToa[0].responseToa.statusOrden == 'no encontrada'){
			const responseInsertar = registrarToaFactory.registraIntegracion('no_procesado',insertData)
			return resToa[0]
		}
		
		const responseInsertar = registrarToaFactory.registraIntegracion('procesado',insertData)

		const toaFactory:ToaFactory = Container.get(ToaFactory)
		let toaInfo:any = await toaFactory.factoryIntegracionToa('orden',resToa[0].responseToa.orden)
		let setModelsInsert = await this.setModelSave(n_orden,tipo_orden,fechaHasta,fechaFin,resulIdToa.recordset[0].Id_Proceso,toaInfo)
		//let reponseSql = await this.setModelSave(n_orden,tipo_orden,fechaHasta,fechaFin,resulIdToa.recordset[0].Id_Proceso,toaInfo)
		//let reponseSql:any = await registrarToaFactory.registraIntegracion('servicioStatus',reponseSql)
		let toaTecnico:any = await toaFactory.factoryIntegracionToa('tecnico',toaInfo[1].responseIntegracion.resourceId)

		integracionToaResponse.responseToa = {
			status : toaInfo[0].responseToa.status,
			activityType : toaInfo[0].responseToa.activityType,
			statusOrden : toaInfo[0].responseToa.statusOrden,
			resourceId : toaTecnico[0].responseToa.resourceId,
			statusTecnico : toaTecnico[0].responseToa.status,
			name : toaTecnico[0].responseToa.name
		}

		return integracionToaResponse;
	}

	async setDataModels(n_orden:string,tipo_orden:string,fechaHasta:string,fechaFin:string,idIntegracionToa:number,resToa:any): Promise<Object> {

		this.responseIntegracion= Container.get(ResponseIntegracion)

		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = n_orden + '-' + tipo_orden 
		atencionPostModels.Response = JSON.stringify(resToa[1].responseIntegracion.data)
		atencionPostModels.Servicio = resToa[1].responseIntegracion.data.links[0].href
		atencionPostModels.Estado = (resToa[0].responseToa.statusOrden == 'encontrada') ? 'orden_encontrada' : 'orden_no_encontrada' //(resToa[1].responseIntegracion.data)

		return atencionPostModels

	}

	async setModelSave(n_orden:string,tipo_orden:string,fechaHasta:string,fechaFin:string,idIntegracionToa:number,response:any): Promise<Object> {
		//console.log('response-----------',response[1].responseIntegracion,'response-----------')
		this.responseIntegracion= Container.get(ResponseIntegracion)

		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = response[1].responseIntegracion.activityId
		atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)
		atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		atencionPostModels.Estado = 'orden_encontrada' 

		return atencionPostModels

	}
}
