import { Request, Response, NextFunction } from 'express'
import { Inject, Container } from "typescript-ioc";
import FlujoModels from '../models/FlujoModels'
import { AtencionDAO } from '../DAO/AtencionDAO'

export default class AtencionController {
	
	constructor(@Inject private AtencionDAO: AtencionDAO) {}

	async createAtencion(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			let { CodLogin, CodFlujo } = req.body;
			const validation = await this.AtencionDAO.validateAtencion(CodLogin, CodFlujo);
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

