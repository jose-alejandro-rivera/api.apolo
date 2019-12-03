import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import { Inject } from "typescript-ioc";

/**
 * 
 * @category DAO
 */
export class AtencionDAO {

	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}

	public async createAtencion(data: any) {
		try {
			let { CodLogin, CodFlujo } = data;
			const sqlGetSteps = await this.databaseConnection.getPool();
			const request = sqlGetSteps.request();
			const result = await request
				.input('CodLogin', sql.Int, CodLogin)
				.input('CodFlujo', sql.Int, CodFlujo)
				.query(`INSERT INTO Atencion (CodLogin, CodFlujo, Fecha) VALUES (@CodLogin,@CodFlujo,getdate()); SELECT SCOPE_IDENTITY() as Id_Atencion;`);
			return result.recordset;
		} catch (error) {
			return error
		}
	}

	public async lastAtencion() {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT TOP 1 CAST(Id_Atencion AS int) as Id_Atencion FROM Atencion ORDER BY Id_Atencion DESC `);
			return result.recordset;
		} catch (error) {
			return error
		}
	}

	public async validateAtencion(CodLogin: number, CodFlujo: number) {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const request = sqlGetSteps.request();
			let validateLogin = await request
			.input('CodLogin', sql.Int, CodLogin)
			.query`SELECT Id_Login, Usuario, Fecha FROM Login WHERE Id_Login = @CodLogin`;
			let validateFlujo = await request
			.input('CodLogin', sql.Int, CodFlujo).
			query`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo WHERE Id_Flujo = @CodLogin`;
			if (validateLogin.recordset.length > 0 && validateFlujo.recordset.length > 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return error
		}
	}

}