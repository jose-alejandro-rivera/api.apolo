import DatabaseConnection from "../Loaders/databaseLoader";
import AtencionModel from '../Models/AtencionModel'
import ResponseTable from '../ResponseTable/ResponseTable'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc"
import AtencionPasoModel from '../Models/AtencionPasoModel'


export class RetomaChatDao {
	private result:any
	constructor(@Inject private databaseConnection:DatabaseConnection){
		
	}

	async retomaChatFlujos(atencionModel:AtencionModel): Promise<Object> {
		const responseTable = Container.get(ResponseTable)
		try {
		const connect = await this.databaseConnection.getPool()
		this.result = await connect.request()
        .input('NumOrden',sql.VarChar,atencionModel.NumOrden)
        .query(`SELECT 
        				a.Id_Atencion
								,a.CodFlujo
								,a.NumOrden 
								,l.ResourceId
								,l.Usuario
								,l.Id_Login
							FROM 
								Atencion a
							INNER JOIN Login as l ON  a.CodLogin = l.Id_Login
							WHERE NumOrden = @NumOrden`)
    return responseTable.response = this.result
		}catch(error){
			 return responseTable.response = error.name
		}
	}

	async retomachatAtencionPaso(atencionPasoPasoModel:AtencionPasoModel): Promise<Object> {
		const responseTable = Container.get(ResponseTable)
		try{
			const connect = await this.databaseConnection.getPool()
			this.result = await connect.request()
        .input('CodAtencion',sql.Int,atencionPasoPasoModel.CodAtencion)
        .query(`SELECT TOP (1) CodAtencion,CodPaso FROM AtencionPaso WHERE CodAtencion = @CodAtencion ORDER BY Id_AtencionPaso DESC`)
    return responseTable.response = this.result

		}catch(error){
			return responseTable.response = error.name
		}
	}
}