import Conections from "../connet"
import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { Container, Inject } from "typescript-ioc";

/**
 * 
 * @category DAO
 */
export class AtencionDAO {

	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}
 
	public async createAtencion(data: any){
		try {
			let { CodLogin, CodFlujo } = data;
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`INSERT INTO Atencion (CodLogin, CodFlujo, Fecha) VALUES (${CodLogin},${CodFlujo},getdate()); SELECT SCOPE_IDENTITY() as Id_Atencion;`);
			console.log(result.recordset);
			return result.recordset;
		} catch (error) {
			return error
		}
	}

	public async validateAtencion(CodLogin: number, CodFlujo: number){
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			let validateLogin = await sqlGetSteps.query`SELECT * FROM Login WHERE Id_Login = ${CodLogin}`;
			let validateFlujo = await sqlGetSteps.query`SELECT * FROM Flujo WHERE Id_Flujo = ${CodFlujo}`;
			if(validateLogin.recordset.length > 0 && validateFlujo.recordset.length > 0 ){
				return true;
			}else{
				return false;
			}
		} catch (error) {
			return error
		}
	}

}