import { Router } from 'express';
import ProcesoController  from '../../controllers/ProcesoController';
import { Request, Response, NextFunction } from 'express';
import { Container } from "typescript-ioc";


export default class ProcesoRoute {
	private app:Router
	constructor(router:Router){
		this.app = router
	}

	router():void{
		this.app.get('/proceso/list', 
			(req: Request, res: Response, next: NextFunction) => {
				try{
					console.log('services new route')
					res.status(200).json({data : 'res data'})
				}catch(error){
					console.log(error)
				}
			}
		)

		this.app.post('/proceso/fake',
			async (req: Request, res: Response, next: NextFunction) => {
			  try {
				console.log(req.params);
				let { Id_Proceso , TipoServicio, Servicio } = req.params
				console.log(Id_Proceso + TipoServicio + Servicio);
				if (Id_Proceso && TipoServicio && Servicio){
					return res.status(200).json({ 'status': 200, 'response': "procesos " + Id_Proceso + "ok" });
				}
				else{
					return res.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
				}
			  } catch(error) {
				console.log(error)
			  }
			}
		)

		this.app.get('/proceso/fake/ok',
			async (req: Request, res: Response, next: NextFunction) => {
			  try {
				return res.status(200).json({ 'status': 200, 'response': "ok" });
			  } catch(error) {
				console.log(error)
			  }
			}
		)
	}
}