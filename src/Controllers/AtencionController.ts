import { Request, Response, NextFunction } from 'express'
import { Inject, Container } from "typescript-ioc";
import FlujoModels from '../models/FlujoModels'
import Conections from '../connet'
import Conection from '../loaders/databaseLoader'
import { AtencionDAO } from '../DAO/AtencionDAO'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'


export default class FlujoController {
	private flujos: FlujoModels[]
	constructor(
		@Inject private AtencionDAO: AtencionDAO,
		@Inject private databaseConnection: Conections
	) {
		this.flujos = []
	}


	async createAtencion(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const validation = await this.AtencionDAO.validateAtencion(req.body);
			if (validation) {
				const result = await this.AtencionDAO.createAtencion(req.body);
				return res.status(200).json(result);
			} else {
				return res.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
			}
		} catch (error) {
			console.log(error)
		}
	}

}

