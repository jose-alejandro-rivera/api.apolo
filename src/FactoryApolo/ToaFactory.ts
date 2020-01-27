import IntegracionToaConsult from '../services/IntegracionToaConsult'
export default class ToaFactory {
	constructor(){}

	async factoryIntegracionToa(peticionToa:string,nOrden:number):Promise<any>{
		let toaFactory:any
		let resToaIntegrate:IntegracionToaConsult
		switch (peticionToa) {
			case "orden":
				toaFactory = new IntegracionToaConsult()
				resToaIntegrate = await toaFactory.getValidateOrden(nOrden)
				return resToaIntegrate
			break;
			default:
				// code...
			break;
		}

	}
}