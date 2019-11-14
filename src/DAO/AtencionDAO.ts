import Conections from "../connet"
import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { Container, Inject } from "typescript-ioc";

/**
 * 
 * @category DAO
 */
export class FlujoListDAO {

	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}
	public async createAtencion(Id_Flujo: number){
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT Id_CategoriaFlujo,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo where Activo=1`);
			return result;
		} catch (error) {
			return error
		}
	}
}