import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import ProcesoModels from '../models/ProcesoModels'


export default class ProcesoController {
	private procesos: ProcesoModels[]
	constructor() {
		this.procesos = []
	}

	async createProceso(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			return res.status(201).json({ 'status': 201, 'response': "no existen elementos creados para la consulta" });
		} catch (error) {
			console.log(error)
		}
	}

}

