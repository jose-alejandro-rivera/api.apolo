import IntegracionToaConsult from '../services/IntegracionToaConsult'
import IntegracionToaTecnico from '../services/IntegracionToaTecnico'
import IntegracionToaFinaliza from '../services/IntegracionActualizarPropiedadToa'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'
import { Inject, Container } from "typescript-ioc"

export default class ToaFactory {
	constructor(@Inject private integracionToaConsult:IntegracionToaConsult){}

	async factoryIntegracionToa(peticionToa:string,request:number):Promise<any>{
		let integracionToa:IntegracionToaInterface
		let resToaIntegrate:Object
		switch (peticionToa) {
			case "tecnico":
				integracionToa = Container.get(IntegracionToaTecnico)
				resToaIntegrate = await integracionToa.serviceIntegrationToa(request)
				return resToaIntegrate

			break

			case "finaliza":
			  integracionToa = Container.get(IntegracionToaFinaliza)
				resToaIntegrate = await integracionToa.serviceIntegrationToa(request)
				return resToaIntegrate
			break

			default:
				integracionToa = Container.get(IntegracionToaConsult)
				resToaIntegrate = await integracionToa.serviceIntegrationToa(request)
				return resToaIntegrate
			break;
		}

	}
}