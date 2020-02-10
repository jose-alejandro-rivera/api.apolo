import { Inject, Container } from "typescript-ioc"
import IntegracionProcesoInterface from '../InterfaceIntegracion/IntegracionProcesoInterface'
import AtencionProcesoGeneralDAO from '../DAOIntegracion/AtencionProcesoGeneralDAO'
export default class IntegracionesFactory {
	constructor() {}

	async registraIntegracion(peticion:string, body:any = {}):Promise<any>{
		let atencionProcesoGeneralDAO:IntegracionProcesoInterface
		atencionProcesoGeneralDAO = Container.get(AtencionProcesoGeneralDAO)
		let resToaIntegrate:Object
		switch (peticion) {
			case "procesado":
				resToaIntegrate = await atencionProcesoGeneralDAO.registerAtencionProceso(body)
				return resToaIntegrate
			break
			
			default:
				resToaIntegrate = await atencionProcesoGeneralDAO.registerAtencionProceso(body)
				return resToaIntegrate
			break;
		}

	}
}