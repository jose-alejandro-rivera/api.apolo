import { Request, Response, NextFunction, Router } from 'express'
import FlujoController from '../../Controllers/FlujoController'
import { Container } from "typescript-ioc";


export default class FlujoRouter {
  public app: Router
  constructor(router: Router) {
    this.app = router
  }
  router(): void {

    /**
		* @swagger
		* /api/flujo/list/:id:
		*  get:
		*    tags:
		*      - Flujo
		*    name: Lista de Flujos
		*    summary: servicio retorna listado de los pasos asociados a un flujo creado.
		*    parameters:
		*      - in: path
		*        name: Id
		*        type: integer
		*        required: true
		*        description: numero de id del flujo a filtrar
		*    produces:
		*      - application/json
		*    consumes:
		*      - application/json
		*    responses:
		*      '200':
		*          description: objeto con un array de pasos asociados al flujo
		*          schema:
		*              type: object
		*              properties:
		*                  status: 
		*                      type: number
		*                  rows:
		*                      type: object
		*      '201':
		*          description: error en la consulta a la BD
		*          
		*/
    this.app.get(
      '/flujo/list/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getSteps(req.params.id);
          res.status(200).json(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
    )
    /**
		* @swagger
		* /api/flujos/por/categorias/:id_categoriaFlujo:
		*  get:
		*    tags:
		*      - Flujo
		*    name: Lista de flujo filtrados por categoria
		*    summary: servicio retornaLista de flujo asociados a una misma categoria de flujo
		*    parameters:
		*      - in: path
		*        name: IdCategoriaFlujo
		*        type: integer
		*        required: true
		*        description: numero de id de la categoria flujo
		*    produces:
		*      - application/json
		*    consumes:
		*      - application/json
		*    responses:
		*      '200':
		*          description: objeto con un array de flujos asociados a la categoria
		*          schema:
		*              type: object
		*              properties:
		*                  status: 
		*                      type: number
		*                  rows:
		*                      type: object
		*      '201':
		*          description: error en la consulta a la BD
		*          
		*/
    this.app.get(
      '/flujos/por/Categorias/:id_categoriaFlujo',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getFlujoPorCategoria(req.params.id_categoriaFlujo);
          res.status(200).send(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
    )
    /**
		* @swagger
		* /api/flujo/categorias:
		*  get:
		*    tags:
		*      - Flujo
		*    name: Lista de categorias de flujo
		*    summary: servicio retorna lista de categorias de flujo existentes
		*    produces:
		*      - application/json
		*    consumes:
		*      - application/json
		*    responses:
		*      '200':
		*          description: objeto con un array de las categorias
		*          schema:
		*              type: object
		*              properties:
		*                  status: 
		*                      type: number
		*                  rows:
		*                      type: object
		*      '201':
		*          description: error en la consulta a la BD
		*          
		*/
    this.app.get(
      '/flujo/categorias',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const flujoController: FlujoController = Container.get(FlujoController);
          let responseModel = await flujoController.getCategoriaFlujo(req, res, next);
          res.status(200).send(responseModel);
        } catch (error) {
          console.log(error)
        }
      }
	)
	
  }
}