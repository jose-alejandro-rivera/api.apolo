import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import FlujoModels from '../Models/FlujoModels'
import { FlujoListDAO } from '../DAO/FlujoListDAO'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { ResponseStatus } from "../ConfigRes/resStatus"



export default class FlujoController {
	private flujos: FlujoModels[]
	constructor(
		@Inject private FlujoListDAO: FlujoListDAO,
		@Inject private responseStatus: ResponseStatus
	) {
		this.flujos = []
	}

	async getCategoriaFlujo(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const result = await this.FlujoListDAO.getCategoriaFlujoList();
			let categoriaFlujoModel: CategoriaFlujoModel;
			if (result.rowsAffected[0] == 0) {
				return res = this.responseStatus.stateSelect(201);
			} else {
				categoriaFlujoModel = Object.assign(result.recordset);
				return categoriaFlujoModel;
			}
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

	async getFlujoPorCategoria(Id_CategoriaFlujo: any): Promise<void> {
		try {
			const result = await this.FlujoListDAO.getFlujosPorCategoria(Id_CategoriaFlujo);
			return result;
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

	async getSteps(id: any): Promise<void> {
		let res:any;
		try {
			let responseDao:any = await this.FlujoListDAO.getFlujoList(id)
			if(responseDao.rowsAffected[0] == 'RequestError'){
				res = this.responseStatus.stateSelect(500)
			}else if(responseDao.rowsAffected > 0){
				res = this.responseStatus.stateSelect(200,responseDao.recordsets)
			}else{
				res = this.responseStatus.stateSelect(201)
			}
			return res
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

	async validateFlujoExist(Id_Flujo: number): Promise<any> {
		try {
			const result = await this.FlujoListDAO.validateFlujoExist(Id_Flujo);
			return result;
		} catch (error) {
			let res = this.responseStatus.stateSelect(500)
			return res;
		}
	}

}

