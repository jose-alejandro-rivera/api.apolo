import Conection from '../Loaders/databaseLoader'
import AtencionProcesoInterface from '../InterfaceIntegracion/AtencionProcesoInterface'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import ResponseTable from '../ResponseTable/ResponseTable'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc"
import LoguinModel from '../ModelTableIntegration/LoguinModel'

export default class AtencionProcesoDao implements AtencionProcesoInterface {
	private result:Object|any
	private sqlConnect:any
	private responseTable:ResponseTable
	constructor(@Inject private databaseConnection: Conection){
		this.result = {}
		this.responseTable = Container.get(ResponseTable)
	}

	async searchIdProcesoToa(NomProceso:string = 'Integración con TOA', Id_Proceso:number = 8): Promise<string> {
		this.result = {}
		//let result:any
		let atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		this.sqlConnect = await this.databaseConnection.getPool();
		this.result = await this.sqlConnect.request()
		.input('NomProceso',sql.VarChar,NomProceso)
		.query('SELECT Id_Proceso FROM Proceso WHERE NomProceso  = @NomProceso')
		atencionPostModels.CodProceso = this.result.recordset[0].Id_Proceso
		//atencionPostModels.CodProceso = (this.result.recordset) ?  this.result.recordset[0].Id_Proceso : this.result
		return this.result
	}

	async validarNumOrden(request:string|any): Promise<Object> {
		this.result = {}
		this.sqlConnect = await this.databaseConnection.getPool()
		this.result = await this.sqlConnect.request()
		.input('NumOrden',sql.VarChar,request)
		.query(`SELECT NumOrden,CodFlujo,CodLogin FROM Atencion WHERE NumOrden = @NumOrden`)
		this.responseTable.response = this.result
		return this.responseTable
	}

	async registerAtencionProceso(atencionProcesoModel: AtencionProcesoModel):Promise<Object> {
		this.result = {}
		this.sqlConnect = await this.databaseConnection.getPool()
		this.result = await this.sqlConnect.request()
		.input('NumOrden',sql.VarChar,atencionProcesoModel.NumOrden)
		.input('CodProceso',sql.Int,atencionProcesoModel.CodProceso)
		.input('Request',sql.VarChar,atencionProcesoModel.Request)
		.input('Response',sql.VarChar(1000),atencionProcesoModel.Response)
		.input('Estado',sql.VarChar,atencionProcesoModel.Estado)
		.input('Servicio',sql.VarChar,atencionProcesoModel.Servicio)
		.query(`INSERT INTO 
							Integracion (NumOrden, CodProceso,Request,Response,Estado,Servicio) 
						VALUES (@NumOrden, @CodProceso, @Request, @Response, @Estado, @Servicio)`)
		this.responseTable.response = this.result
		return this.responseTable
	}


	async registerLoguin(loguinModel: LoguinModel): Promise<Object> {
		//const responseTable:ResponseTable = Container.get(ResponseTable)
		this.result = {}
		this.sqlConnect = await this.databaseConnection.getPool()
		this.result = await this.sqlConnect.request()
		.input('Usuario',sql.VarChar,loguinModel.Usuario)
		.input('ResourceId',sql.VarChar,loguinModel.ResourceId)
		.query(`INSERT INTO 
							Login (Usuario, ResourceId, Fecha) 
						VALUES (@Usuario, @ResourceId,getdate()); 
						SELECT SCOPE_IDENTITY() as Id_Login;`)
		this.responseTable.response = this.result
		return this.responseTable
	}


	async consultLoguin(loguinModel: LoguinModel): Promise<Object> {
		this.result = {}
		this.sqlConnect = await this.databaseConnection.getPool()
		this.result = await this.sqlConnect.request()
		.input('ResourceId',sql.VarChar,loguinModel.ResourceId)
		.query(`SELECT Id_Login,Usuario,ResourceId FROM Login WHERE ResourceId  = @ResourceId`)
		this.responseTable.response = this.result
		return this.responseTable
	}
}