import { Router } from 'express'
import FlujoController  from '../../controllers/FlujoController'
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express'

export default class ProcesoRoute{
	private app:Router
	constructor(router:Router){
		this.app = router
	}

	router():void{
		this.app.get(
			'/proceso/list',
			(req: Request, res: Response, next: NextFunction) => {
				try{
					console.log('services new route')
					res.status(200).json({data : 'res data'})
				}catch(error){
					console.log(error)
				}

			}
		)
	}
}