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
        /**
         * @swagger
         *
         * /api/atencion-paso-campo/create:
         *   post:
         *    tags:
         *      - Atencion
         *    name: Crear Atnecion Paso
         *    summary: servicio que crea una atencion paso con los distintos casos , asociado a un proceso , a un cuestionario o a ninguno. 
         *    produces:
         *       - application/json
	     *    parameters:
		 *      -   in: body
		 *          schema:
		 *              type: object
		 *              properties:
		 *                  atencionPaso:
		 *                      description: informacion de basica del registro del paso 
		 *                      type: object
         *                      properties:
		 *                          CodAtencion:
         *                             type: number
		 *                          CodPaso:
         *                             type: number
		 *                          Secuencia:
         *                             type: number
		 *                          Soluciona:
         *                             type: number
		 *                  atencionProceso:
		 *                      description: informacion del procesos asociado al paso
		 *                      type: object
         *                      properties:
		 *                          CodProceso:
         *                             type: number
		 *                          TipoServicio:
         *                             type: string
		 *                          Servicio:
         *                             type: string
		 *                          Request:
         *                             type: string
		 *                          Response:
         *                             type: string
		 *                  atencionProcesoSalida:
		 *                      description: registro de la respuesta del proceso ejecutado en el paso
		 *                      type: object
         *                      properties:
		 *                          CodProcesoSalida:
         *                             type: number
		 *                          Valor:
         *                             type: string
         *                  atencionCampo:
         *                      description: registro de los campos de un cuestionaroio asociado al paso 
         *                      type: array
         *                      items:
         *                         type: object
         *                         properties:
         *                             CodCuestionarioCampo:
         *                                 type: number
         *                             ValorCampo:
         *                                 type: string
		 *              required:
		 *                  - atencionPaso
		 *                  - atencionProceso
		 *                  - atencionProcesoSalida
         *                  - atencionCampo
         *    consumes:
		 *      - application/json
         *    responses:
         *      '200':
         *          description: Datos registrados
         *          schema:
         *              type: object
         *              properties:
         *                  status: 
         *                      type: number
         *                  rows:
         *                      type: object
         *      '201':
         *          description: Error en los datos ingresados
         *          schema:
         *              type: object
         *              properties:
         *                  status: 
         *                      type: number
         *                  rows:
         *                      type: object
         */
        this.app.post('/atencion-paso-campo/create',
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const atencionController: AtencionController = Container.get(AtencionController);
                    let respuesta = await atencionController.createAtencionPasoCampo(req.body);
                    res.status(200).json({ 'data': respuesta });
                } catch (error) {
                    console.log(error)
                }
            }
        )

        this.app.get('/atenciona/lastStep/:id',
            async (req: Request, res: Response, next: NextFunction) => {
              try {
                const atencionController: AtencionController = Container.get(AtencionController);
                let responseModel = await atencionController.getLastStep(req.params.id);
                res.status(200).json(responseModel);
              } catch (error) {
                console.log(error)
              }
            }
          )
    }
}