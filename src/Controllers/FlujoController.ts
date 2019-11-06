import { Request, Response, NextFunction } from 'express'
import {Inject, Container} from "typescript-ioc";
import FlujoModels  from '../models/FlujoModels'
import Conections  from '../connet'
import Conection  from '../loaders/databaseLoader'
import  { FlujoListDAO }  from '../DAO/FlujoListDAO'


export default class FlujoController {
	private flujos:FlujoModels[]
	constructor(
		@Inject private FlujoListDAO: FlujoListDAO,
		@Inject private databaseConnection: Conections
	){
		this.flujos =[]
	}

	async getSteps(request: any):Promise<void>{
		try{
			const responseDao = await this.FlujoListDAO.getFlujoList()
			const responseLoginModel = responseDao
			return responseLoginModel
		}catch(error){
			console.log(error)
			return error
		}
	}

}

