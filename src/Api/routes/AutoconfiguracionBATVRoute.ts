import {Router, Response, Request, NextFunction} from 'express'
import { Container } from "typescript-ioc";
import IntegracionToa  from '../../Controllers/AutoconfiguracionBATVController'

export default class AutoconfiguracionBATVRouter {

	private app:Router
	constructor(router: Router){
		this.app = router
	}

	router(): void {
		this.app.get(
			'/autoconfiguracion/:n_orden_activity/:parametro_config',
			async (req:Request, res:Response, next: NextFunction) => {
				const { n_orden_activity, parametro_config } = req.params
				const integracionToa:IntegracionToa = Container.get(IntegracionToa)
				let resIntegra = await integracionToa.obtenerConfiguracion(n_orden_activity,parametro_config)	
				console.log('*************',resIntegra,'**********')
				res.status(200).json(resIntegra)
		})
	}
}