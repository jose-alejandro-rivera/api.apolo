import AtencionProcesoInterface from '../InterfaceIntegracion/AtencionProcesoInterface'
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import { Inject, Container } from "typescript-ioc"

export default class RegistrarToaFactory {
	constructor(){}

	async registraIntegracion(peticion:string, body:any = {}):Promise<any>{
		let atencionProcesoDao:AtencionProcesoInterface
		atencionProcesoDao = Container.get(AtencionProcesoDao)
		let resToaIntegrate:Object
		switch (peticion) {
			case "procesado":
				resToaIntegrate = await atencionProcesoDao.registerAtencionProceso(body)
				return resToaIntegrate
			break

			case "servicioStatus":
				resToaIntegrate = await atencionProcesoDao.registerAtencionProceso(body)
				return resToaIntegrate
			break

			case "servicioTecnico":
				resToaIntegrate = await atencionProcesoDao.registerAtencionProceso(body)
				return resToaIntegrate
			break

			case "tecnicoLoguinConsult":
				resToaIntegrate = await atencionProcesoDao.consultLoguin(body)
				return resToaIntegrate
			break

			case "tecnicoLoguinRegister":
				resToaIntegrate = await atencionProcesoDao.registerLoguin(body)
				return resToaIntegrate
			break

			case "validar_orden":
				resToaIntegrate = await atencionProcesoDao.validarNumOrden(body)
				return resToaIntegrate
			break
			
			default:
				resToaIntegrate = await atencionProcesoDao.registerAtencionProceso(body)
				return resToaIntegrate
			break;
		}

	}

}