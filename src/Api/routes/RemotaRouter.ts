import RemotaController from '../../Controllers/RemotaController'
import {Request, Response, NextFunction, Router} from 'express'
import { Inject, Container } from "typescript-ioc"
import IntegracionActualizarPropiedadToa from '../../services/IntegracionActualizarPropiedadToa'

export default class RemotaRouter {
	private app: Router
	constructor(router: Router){
		this.app =router
	}

	router(): void {
		this.app.get(
			'/retoma/apolo/:num_orden',
			async (req:Request, res:Response, next:NextFunction) =>{
				const remotaController:RemotaController = Container.get(RemotaController)
        let responseModel = await remotaController.consultarFlujosRetoma(req.params.num_orden)
				res.status(200).json(responseModel)
		})

		this.app.get(
			'/integracion/toa/finaliza/:activityId',
			async (req:Request, res:Response, next:NextFunction) =>{
				const PropiedadToa:IntegracionActualizarPropiedadToa = Container.get(IntegracionActualizarPropiedadToa)
        let responseModel = await PropiedadToa.actualizarPropiedadToa(req.params.activityId)
				res.status(200).json(responseModel)
		})
	}
}