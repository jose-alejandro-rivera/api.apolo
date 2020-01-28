import IntegracionToaService from '../services/IntegracionToaService'
import ToaFactory from '../FactoryApolo/ToaFactory'
import { Container } from "typescript-ioc";
import moments  from 'moment'
import FechaConsulta from '../ValidationParameters/FechaConsulta'
export default class IntegracionToaController {

	constructor(){}

	 async getIntegracionToa(tipo_orden:string,n_orden:string,valor:string):Promise<void> {
		const integracionToaService:IntegracionToaService = Container.get(IntegracionToaService)
		const fechaConsulta:FechaConsulta = Container.get(FechaConsulta)
		let fechaFin   = await fechaConsulta.getDateCurrent()
		let fechaHasta = await fechaConsulta.getDatePass()
		let resToa:any = await integracionToaService.serviceIntegrationToa(tipo_orden,n_orden,fechaFin,fechaHasta)
		if(resToa.responseToa.statusOrden == 'no encontrada'){
			return resToa
		}
		const toaFactory:ToaFactory = Container.get(ToaFactory)
		let res:any = await toaFactory.factoryIntegracionToa(valor,resToa.responseToa.orden)
		return res;
	}
}