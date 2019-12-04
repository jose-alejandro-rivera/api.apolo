import { Router } from 'express'
import AtencionController from '../../controllers/AtencionController'
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express'

export default class AtencionRoute {
    private app: Router
    constructor(router: Router) {
        this.app = router
    }

    router(): void {
        /**
         * @swagger
         *
         * /api/atencion/create:
         *   post:
         *    tags:
         *      - Atencion
         *    name: CrearAtencion
         *    summary: servicio que crea una atencion nueva 
         *    produces:
         *       - application/json
         *    parameters:
         *       - name: CodLogin
         *         description: Id del login correspondiente al usuario conectado
         *         required: true
         *         type: number
         *       - name: CodFlujo
         *         description: Id del flujo seleccionado
         *         required: true
         *         type: number
         *    consumes:
		 *      - application/json
         *    responses:
         *      '200':
         *          description: devuelve el Id_Atencion creada para registrar las acciones de los pasos
         *          schema:
         *              type: object
         *              properties:
         *                  status: 
         *                      type: number
         *                  rows:
         *                      type: object
         */
        this.app.post('/atencion/create', (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req);
                const atencionController: AtencionController = Container.get(AtencionController);
                let responseModel = atencionController.createAtencion(req, res, next);
                return responseModel;
            } catch (error) {
                console.log(error)
            }
        }
        )


        this.app.post('/atencion-paso-campo/create',
        async(req: Request, res: Response, next: NextFunction) => {
            try {
                const atencionController: AtencionController = Container.get(AtencionController);
                let respuesta = await atencionController.createAtencionPasoCampo(req.body);
                res.status(200).json({'data':respuesta});
              } catch(error) {
                console.log(error)
              }
        }
        )
    }
}