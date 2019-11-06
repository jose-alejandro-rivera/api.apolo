import { Router } from 'express'
import FlujoController  from '../../controllers/FlujoController'
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express'

class FlujoRouter {
	public router:Router
	constructor() {
		this.router = Router()
		this.routes()
	}
	routes(){
		this.router.get(
      '/flujo/list/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getSteps(req.param);
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.router.get(
      '/flujos/por/categorias',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getFlujoPorCategoria(req.Id_CategoriaFlujo);
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.router.get(
      '/flujo/categorias',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getCategoriaFlujo();
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.router.post(
    	'/flujo/'
    )
	}
}
const FlujoRouters =  new FlujoRouter
export default FlujoRouters.router