
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import { Inject, Container } from "typescript-ioc"

export default class RegistrarToaFactory {
	constructor(@Inject private atencionProcesoDao:AtencionProcesoDao){}

	async registraIntegracion(peticion:string, body:any = {}):Promise<any>{
		this.atencionProcesoDao = Container.get(AtencionProcesoDao)
		let toaFactory:any
		let resToaIntegrate:any
		switch (peticion) {
			case "no_procesado":
				resToaIntegrate = await this.atencionProcesoDao.registerAtencionProceso(body)
				return resToaIntegrate
			break;
			default:
				// code...
			break;
		}

	}

}