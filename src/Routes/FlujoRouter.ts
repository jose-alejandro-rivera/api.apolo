import { Router } from 'express'
import { flujoController } from '../controllers/FlujoController'

class FlujoRouter {
	public router:Router
	constructor() {
		this.router = Router()
		this.routes()
	}
	routes(){
		this.router.get('/flujo', (flujoController.getFlujo))
		this.router.get('/flujo/:id', (flujoController.getFlujoId))
		this.router.post('/flujo/create/:id', (flujoController.createFlujo))
		this.router.get('/flujo/controller/:id', (flujoController.getSteps))
	}
}
const FlujoRouters =  new FlujoRouter
export default FlujoRouters.router