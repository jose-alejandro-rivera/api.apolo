import Conection from '../Loaders/databaseLoader'
import AtencionProcesoInterface from '../InterfaceIntegracion/AtencionProcesoInterface'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import ResponseTable from '../ResponseTable/ResponseTable'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc";


export default class AtencionProcesoDao implements AtencionProcesoInterface {
	constructor(@Inject private databaseConnection: Conection){}

	async searchIdProcesoToa(NomProceso:string = 'Integración con TOA', Id_Proceso:number = 8): Promise<string> {

		let result:any
		let atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		const sqlConnect = await this.databaseConnection.getPool();
		result = await sqlConnect.request()
		.input('NomProceso',sql.VarChar,NomProceso)
		.query('SELECT Id_Proceso FROM Proceso WHERE NomProceso  = @NomProceso')
		atencionPostModels.CodProceso = result.recordset[0].Id_Proceso
		return result
	}

	async registerAtencionProceso(atencionProcesoModel: AtencionProcesoModel):Promise<Object> {
		const responseTable:ResponseTable = Container.get(ResponseTable)
		let result:any
		const sqlConnect = await this.databaseConnection.getPool()
		result = await sqlConnect.request()
		.input('NumOrden',sql.VarChar,atencionProcesoModel.NumOrden)
		.input('CodProceso',sql.Int,atencionProcesoModel.CodProceso)
		.input('Request',sql.VarChar,atencionProcesoModel.Request)
		.input('Response',sql.VarChar(1000),atencionProcesoModel.Response)
		.input('Estado',sql.VarChar,atencionProcesoModel.Estado)
		.input('Servicio',sql.VarChar,atencionProcesoModel.Servicio)
		.query(`INSERT INTO Integracion (NumOrden, CodProceso,Request,Response,Estado,Servicio) VALUES (@NumOrden, @CodProceso, @Request, @Response, @Estado, @Servicio)`)
		responseTable.response = result
		return responseTable
	}
}