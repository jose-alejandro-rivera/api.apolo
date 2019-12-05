import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import FlujoModels from '../models/FlujoModels'
import { FlujoListDAO } from '../DAO/FlujoListDAO'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'


export default class FlujoController {
	private flujos: FlujoModels[]
	constructor(
		@Inject private FlujoListDAO: FlujoListDAO
	) {
		this.flujos = []
	}

	async getCategoriaFlujo(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const result = await this.FlujoListDAO.getCategoriaFlujoList();
			let categoriaFlujoModel: CategoriaFlujoModel;
			if (result.rowsAffected[0] == 0) {
				return res.status(201).json({ 'status': 201, 'response': "no existen elementos creados para la consulta" });
			} else {
				categoriaFlujoModel = Object.assign(result.recordset);
				return categoriaFlujoModel;
			}
		} catch (error) {
			console.log(error)
		}
	}

	async getFlujoPorCategoria(Id_CategoriaFlujo: any): Promise<void> {
		try {
			const result = await this.FlujoListDAO.getFlujosPorCategoria(Id_CategoriaFlujo);
			return result;
		} catch (error) {
			console.log(error)
		}
	}

	async getSteps(id: any): Promise<void> {
		try {
			const responseDao = await this.FlujoListDAO.getFlujoList(id)
			const responseLoginModel = responseDao
			return responseLoginModel
		} catch (error) {
			console.log(error)
			return error
		}
	}

	async validateFlujoExist(Id_Flujo: number): Promise<any> {
		try {
			const result = await this.FlujoListDAO.validateFlujoExist(Id_Flujo);
			return result;
		} catch (error) {
			console.log(error)
		}
	}

}

