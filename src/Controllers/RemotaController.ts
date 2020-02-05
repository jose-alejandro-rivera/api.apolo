import { Inject, Container } from "typescript-ioc"
import { RetomaChatDao } from '../DAO/RetomaChatDao'
import AtencionModel from '../Models/AtencionModel'
import { ResponseStatus } from "../ConfigRes/resStatus"
import { FlujoListDAO } from '../DAO/FlujoListDAO'
import AtencionPasoModel from '../Models/AtencionPasoModel'

export default class RemotaController {
	private response:Array<string | number>
	private jsonResponse:Object|any
	constructor(
		@Inject private retomaChatDao:RetomaChatDao,
		@Inject private responseStatus: ResponseStatus,
		@Inject private flujoListDAO: FlujoListDAO,
	) {
		this.response = []
		this.jsonResponse = {}
	}

	async consultarFlujosRetoma(request:string): Promise<Object> {
		let NumOrden = await this.setValuesAtencion(request)
		let atencionSql:Object|any = await this.retomaChatDao.retomaChatFlujos(NumOrden)
		if(atencionSql.rowsAffected[0] == 'RequestError'){
			this.response = []
			this.response = this.responseStatus.stateSelect(500)

		}else if(atencionSql.rowsAffected[0] > 0) {
			this.response = []
			//this.response = this.responseStatus.stateSelect(201)
			let idFlujo = atencionSql.recordset[0].CodFlujo
			let CodAtencion = atencionSql.recordset[0].Id_Atencion
			let codAtencionSet = await this.setValuesAtencionPaso(CodAtencion)

			let atencionConsultSql:Object|any = await this.retomaChatDao.retomachatAtencionPaso(codAtencionSet)
			//if (atencionConsultSql.rowsAffected[0] > 0) {
				this.response = []
				let flujoSql:Object|any = await this.flujoListDAO.getFlujoList(idFlujo)
				this.jsonResponse = {
					"status": 200,
					"msg": "Exitoso",
					"rowsTecnico": {
						//Id_Atencion : atencionSql.recordset[0].Id_Atencion,
						ResourceId: atencionSql.recordset[0].ResourceId,
						Usuario : atencionSql.recordset[0].Usuario,
						Id_Login : atencionSql.recordset[0].Id_Login
					},
					"rowsAtaencionPaso": (atencionConsultSql.rowsAffected[0] > 0) ? atencionConsultSql.recordset[0] :{CodAtencion :atencionSql.recordset[0].Id_Atencion},
					"recordsets": flujoSql.recordset
				}
				this.response =this.jsonResponse
			//}
		}else{
			this.response = []
			this.response = this.responseStatus.stateSelect(201)
		}
		return this.response
		
	}

	setValuesAtencion(request:string):any {
		const atencionModel = Container.get(AtencionModel)
		atencionModel.NumOrden = request
		return atencionModel
	}

	setValuesAtencionPaso(request:string):any {
		const atencionPasoModel = Container.get(AtencionPasoModel)
		atencionPasoModel.CodAtencion = request
		return atencionPasoModel
	}

	setResponse(dataResponse:Object|any):Object {
		let response:Object|any
		if(dataResponse.rowsAffected[0] == 'RequestError'){
			response = this.responseStatus.stateSelect(500)
		}else if(dataResponse.rowsAffected[0] > 0){
			response = this.responseStatus.stateSelect(200,dataResponse.recordsets)
		}else{
			response = this.responseStatus.stateSelect(201)
		}
		return response
	}
}