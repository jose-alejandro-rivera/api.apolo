import ProcesoController from '../../controllers/ProcesoController';
import { Request, Response, NextFunction, Router } from 'express';


export default class ProcesoRoute {
	private app: Router
	constructor(router: Router) {
		this.app = router
	}

	router(): void {
		
		this.app.get('/proceso/list',
			(req: Request, res: Response, next: NextFunction) => {
				try {
					console.log('services new route')
					res.status(200).json({ data: 'res data' })
				} catch (error) {
					console.log(error)
				}
			}
		)
		/**
		* @swagger
		* /proceso/fake:
		*  post:
		*    tags:
		*      - Proceso
		*    name: Proceso
		*    summary: servicio que simula la respuesta de un proceso ejecutado, se reajusta en futuras integraciones 
		*    parameters:
		*      -   in: body
		*          schema:
		*              type: object
		*              properties:
		*                  Id_Proceso:
		*                      description: id del proceso a ejecutar desde el paso
		*                      type: number
		*                  TipoServicio:
		*                      description: tipo del servicio a ejecutar definido en la creacion del flujo (Proceso asociado) 
		*                      type: string
		*                  Servicio:
		*                      description: servicio a ejecutar (integracion ocn IVR, Registro de imagenes, Proceso de integracion)
		*                      type: string
		*              required:
		*                  - Id_Proceso
		*                  - TipoServicio
		*                  - Servicio
		*    produces:
		*      - application/json
		*    consumes:
		*      - application/json
		*    responses:
		*      '200':
		*          description: respuesta exitosa = procesos Id_Proceso ok
		*          schema:
		*              type: object
		*              properties:
		*                  status: 
		*                      type: string
		*                  message:
		*                      type: string
		*      '201':
		*          description: informacion incompleta
		*          
		*/
		this.app.post('/proceso/fake',
			(req: Request, res: Response, next: NextFunction) => {
				try {
					let { Id_Proceso, TipoServicio, Servicio } = req.body
					if (Id_Proceso && TipoServicio && Servicio) {
						return res.status(200).json({ 'status': 200, 'message': "procesos " + Id_Proceso + " ok" });
					}
					else {
						return res.status(201).json({ 'status': 201, 'message': "informacion incompleta" });
					}
				} catch (error) {
					console.log(error)
				}
			}
		)

		this.app.get('/proceso/fake/ok',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					return res.status(200).json({ 'status': 200, 'response': "ok" });
				} catch (error) {
					console.log(error)
				}
			}
		)
	}
}