import Conection from '../Loaders/databaseLoader'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc"
import ResponseTable from '../ResponseTable/ResponseTable'
import AtencionProcesoModel from '../Models/AtencionProcesoModel'

export default class AtencionProcesoGeneralDAO {
	private result:Object|any
	private sqlConnect:any
	private responseTable:ResponseTable
	constructor(@Inject private databaseConnection: Conection){
		this.result = {}
		this.responseTable = Container.get(ResponseTable)
	}

	async registerAtencionProceso(atencionProcesoModel: AtencionProcesoModel):Promise<ResponseTable> {
			console.log(atencionProcesoModel)
		this.result = {}
		//const sqlConnect = await this.databaseConnection.getPool()
		this.sqlConnect = await this.databaseConnection.getPool()
		this.result = await this.sqlConnect.request()
		.input('CodAtencionPaso',sql.Int,atencionProcesoModel.CodAtencionPaso)
		.input('CodProceso',sql.Int,atencionProcesoModel.CodProceso)
		.input('TipoServicio',sql.VarChar,atencionProcesoModel.TipoServicio)
		.input('Servicio',sql.VarChar(1000),atencionProcesoModel.Servicio)
		.input('Request',sql.VarChar,atencionProcesoModel.Request)
		.input('Response',sql.VarChar(3000),atencionProcesoModel.Response)
		.query(`INSERT INTO AtencionProceso (CodAtencionPaso, CodProceso, TipoServicio, Servicio, Request, Response, Fecha) 
						VALUES (@CodAtencionPaso, @CodProceso, @TipoServicio, @Servicio, @Request, @Response, getdate())`)
		this.responseTable.response = this.result
		return this.responseTable
	}
}