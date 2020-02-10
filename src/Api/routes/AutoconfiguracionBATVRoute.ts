import {Router, Response, Request, NextFunction} from 'express'
import { Container } from "typescript-ioc";
import IntegracionToa  from '../../Controllers/AutoconfiguracionBATVController'

export default class AutoconfiguracionBATVRouter {

	private app:Router
	constructor(router: Router){
		this.app = router
	}
	/**
	@parms rest = 'tipo de servicio rest soap'
	@parms n_orden_activity = 'numero de orden registra en TOA'
	@parms parametro_config = 'parametro de busqueda configuracion TV o BA' 
	**/
	router(): void {
		this.app.get(
			'/autoconfiguracion/:rest/:n_orden_activity/:parametro_config',
			//'/autoconfiguracion/:rest/:n_orden_activity/:parametro_config/:Cod_atencion_paso/:cod_proceso',
			async (req:Request, res:Response, next: NextFunction) => {
				const integracionToa:IntegracionToa = Container.get(IntegracionToa)
				let resIntegra = await integracionToa.obtenerConfiguracion(req)	
				res.status(200).json(resIntegra)
		})
	}
}