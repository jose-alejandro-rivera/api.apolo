import {Router, Request, Response, NextFunction} from 'express'
import { Container } from "typescript-ioc";
import IntegracionToa  from '../../Controllers/IntegracionToaController'
import OrdenFinalizaToaController  from '../../Controllers/OrdenFinalizaToaController'
import IntegracionActualizarPropiedadToa from '../../Controllers/OrdenFinalizaToaController'

export default class IntegracionToaRouter {
	public app: Router
	constructor(router: Router) {
		this.app = router
	}

	/**
		@parms tipo_orden = 'Primer parametro de busqueda orden en TOA'
		@parms n_orden = 'Segundo parametro de busqueda orden en TOA'
		@parms valor = 'Busqueda especifica Factory Class'
	**/
	router() : void {
		this.app.get(
			'/integracion/apolo/toa/:tipo_orden/:n_orden/:valor',
			async (req: Request, res: Response, next: NextFunction) => {
				const { n_orden, tipo_orden, valor } = req.params
				const integracionToa:IntegracionToa = Container.get(IntegracionToa)
				let resIntegra:Object|any = await integracionToa.getIntegracionToa(tipo_orden,n_orden,valor)	
				res.status(200).json(resIntegra)
		})
		/**
		@parms n_orden = 'Segundo parametro de busqueda orden en TOA'
		@parms tipo_servicio = 'tipo de arquitectura api REST/SOAP'
	**/
		this.app.patch(
			'/integracion/toa/finaliza/:tipo_servicio/:num_orden',
			async (req:Request, res:Response, next:NextFunction) =>{
				console.log(req.params)
				const ordenFinalizaToaController:OrdenFinalizaToaController = Container.get(OrdenFinalizaToaController)
        let responseModel = await ordenFinalizaToaController.ordenFinalizaToa(req)
				res.status(200).json(responseModel)
		})
	}
}