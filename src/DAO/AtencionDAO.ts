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
			return result.recordset;
		} catch (error) {
			return error
		}
	}

	public async lastAtencion(){
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT TOP 1 CAST(Id_Atencion AS int) as Id_Atencion FROM Atencion ORDER BY Id_Atencion DESC `);
			return result.recordset;
		} catch (error) {
			return error
		}
	}

	public async validateAtencion(CodLogin: number, CodFlujo: number){
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			let validateLogin = await sqlGetSteps.query`SELECT Id_Login, Usuario, Fecha FROM Login WHERE Id_Login = ${CodLogin}`;
			let validateFlujo = await sqlGetSteps.query`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo WHERE Id_Flujo = ${CodFlujo}`;
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