import { Router } from 'express'
import FlujoController  from '../../controllers/FlujoController'
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express'

export default class FlujoRouter {
  public app:Router
  constructor(router:Router) {
    this.app = router
  }
   router():void{
    this.app.get(
      '/flujo/list/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getSteps(req.params);
          res.status(200).json(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/flujos/por/categorias/:id_categoriaFlujo',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getFlujoPorCategoria(req.params.id_categoriaFlujo);
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/flujo/categorias',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getCategoriaFlujo(req, res, next);
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/flujos/completos',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getFlujoListaCompleta();
          res.status(200).send(responseModel);
        } catch(error) {
          console.log(error)
        }
      }
    )
  }
}