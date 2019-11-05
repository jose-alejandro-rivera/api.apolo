import { Request, Response, NextFunction } from 'express'
import {Inject, Container} from "typescript-ioc";
import FlujoModels  from '../models/FlujoModels'
import Conections  from '../connet'
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
			//res.status(200).json({data : result.recordset})
			//await this.blackListDAO.getBlackList(blackListModel)
			const responseDao = await this.FlujoListDAO.getFlujoList()
			const responseLoginModel = responseDao
			console.log(responseDao)
			return responseLoginModel
			//res.status(500).json({msg : responseDao})
			console.log(responseDao)
		}catch(error){
			console.log(error)
			//res.status(500).json({msg : 'hola'})
		}
	}

}

//export const flujoController = new FlujoController()
