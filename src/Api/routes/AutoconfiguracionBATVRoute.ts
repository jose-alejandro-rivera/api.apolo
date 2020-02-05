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
			'/autoconfiguracion/ba/tv/:n_orden_activity',
			async (req:Request, res:Response, next: NextFunction) => {
				const { n_orden_activity } = req.params
				const integracionToa:IntegracionToa = Container.get(IntegracionToa)
				let resIntegra = await integracionToa.obtenerConfiguracion(n_orden_activity)	
			res.status(200).json({data : 'ok'})
		})
	}
}