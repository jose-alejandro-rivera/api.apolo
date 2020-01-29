import Conection from '../Loaders/databaseLoader'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc";
import AtencionProcesoModel from '../Models/AtencionProcesoModel'

export default class AtencionProcesoDao {
	constructor(@Inject private databaseConnection: Conection){}

	async searchIdProcesoToa(NomProceso:string = 'Integración con TOA', Id_Proceso:number = 8): Promise<string> {

		let result:any
		let atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		try{
			const sqlConnect = await this.databaseConnection.getPool();
			result = await sqlConnect.request()
			.input('NomProceso',sql.VarChar,NomProceso)
			.query('SELECT Id_Proceso FROM Proceso WHERE NomProceso  = @NomProceso')
			atencionPostModels.CodProceso = result.recordset[0].Id_Proceso
			return 'succes'
		}catch(error){
			return 'error'
		}

	}

	async registerAtencionProceso():Promise<string> {

		let result:any
		let atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel);
		return 'ok'
	}
}