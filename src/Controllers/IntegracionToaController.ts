import IntegracionToaService from '../services/IntegracionToaService'
import ToaFactory from '../FactoryApolo/ToaFactory'
import { Container } from "typescript-ioc";
import moments  from 'moment'
import FechaConsulta from '../ValidationParameters/FechaConsulta'
import AtencionProcesoDao from '../DAO/AtencionProcesoDao'
import AtencionProcesoModel from '../Models/AtencionProcesoModel'
import ConfigIntegraciones from '../Config/configIntegraciones'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'

export default class IntegracionToaController {

	constructor(){}

	 async getIntegracionToa(tipo_orden:string,n_orden:string,valor:string):Promise<Object> {

		const integracionToaService:IntegracionToaService = Container.get(IntegracionToaService)
		const fechaConsulta:FechaConsulta = Container.get(FechaConsulta)
		const integracionToaModels:IntegracionToaModels = Container.get(IntegracionToaModels)
		const atencionProcesoDao:AtencionProcesoDao = Container.get(AtencionProcesoDao)
		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		/*OBTEBNER FECHA ACTUAL Y PASADA*/
		let fechaFin   = await fechaConsulta.getDateCurrent()
		let fechaHasta = await fechaConsulta.getDatePass()
		/*SET DATA EN MODEL*/
		//await this.setDataModels(n_orden,tipo_orden,fechaHasta,fechaFin)
		/*CONSULTA EL ID DEL PROCESO*/
		//let resulIdToa = await atencionProcesoDao.searchIdProcesoToa()
		
		let resToa:any = await integracionToaService.serviceIntegrationToa(tipo_orden,n_orden,fechaFin,fechaHasta)
		console.log(resToa,'resulIdToa--------')
		/*if(resToa.data.totalResults == 0){
      integracionToaModels.responseToa = {status: null, activityType: null, statusOrden:'no encontrada'}
      return integracionToaModels
    }*/

    /*let n_orden_activity:number = resToa.data.items[0].activityId

    integracionToaModels.responseToa = { orden : n_orden_activity, statusOrden:'encontrada' }
    
    return integracionToaModels */

		if(resToa.responseToa.statusOrden == 'no encontrada'){
			return resToa
		}
		const toaFactory:ToaFactory = Container.get(ToaFactory)
		let res:any = await toaFactory.factoryIntegracionToa(valor,resToa.responseToa.orden)
		return res;
	}

	setDataModels(n_orden:string,tipo_orden:string,fechaHasta:string,fechaFin:string): void {

		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
		atencionPostModels.TipoServicio = 'rest|get'
		atencionPostModels.Servicio = `${configIntegraciones.urlToa}/activities/custom-actions/search?searchInField=${tipo_orden}&searchForValue=${n_orden}&dateFrom=${fechaHasta}&dateTo=${fechaFin}`
		atencionPostModels.Request = n_orden + '-' + tipo_orden 

	}
}
