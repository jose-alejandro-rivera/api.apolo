import RemotaController from '../../Controllers/RemotaController'
import {Request, Response, NextFunction, Router} from 'express'
import { Inject, Container } from "typescript-ioc"

export default class RemotaRouter {
	private app: Router
	constructor(router: Router){
		this.app =router
	}

	router(): void {
		this.app.get(
			'/retoma/apolo/chat-bot/:num_orden',
			async (req:Request, res:Response, next:NextFunction) =>{
				const remotaController:RemotaController = Container.get(RemotaController)
          let responseModel = await remotaController.consultarFlujosRetoma(req.params.num_orden)
          console.log('---------',responseModel,'----------------------')
				res.status(200).json(responseModel)
		})
	}
}