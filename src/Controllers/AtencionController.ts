import { Request, Response, NextFunction } from 'express'
import { Inject, Container } from "typescript-ioc";
import FlujoModels from '../models/FlujoModels'
import Conections from '../connet'
import Conection from '../loaders/databaseLoader'
import { FlujoListDAO } from '../DAO/FlujoListDAO'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'


export default class FlujoController {
	private flujos: FlujoModels[]
	constructor(
		@Inject private FlujoListDAO: FlujoListDAO,
		@Inject private databaseConnection: Conections
	) {
		this.flujos = []
    }
    
    
	async createAtencion(Id_Flujo: any): Promise<void> {
		try {
			const result = await this.AtencionDAO.createAtencion();
			return result;
		} catch (error) {
			console.log(error)
		}
	}

}

