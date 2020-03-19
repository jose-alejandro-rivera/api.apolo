import { Inject, Container } from "typescript-ioc"
import { RetomaChatDao } from '../DAO/RetomaChatDao'
import AtencionModel from '../Models/AtencionModel'
import { ResponseStatus } from "../ConfigRes/resStatus"
import { FlujoListDAO } from '../DAO/FlujoListDAO'
import AtencionPasoModel from '../Models/AtencionPasoModel'
import FechaConsulta from '../ValidationParameters/FechaConsulta'
import IntegracionToaService from '../services/IntegracionToaService'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'
import ToaFactory from '../FactoryApolo/ToaFactory'

export default class RemotaController {

	private response:Array<string | number>
	private jsonResponse:Object|any
	private responseIntegracion:Object|any
	private toaTecnico:Object|any
	private atencionConsultSql:Object|any
	private atencionSql:Object|any
	private flujoSql:Object|any
	private fechaConsulta:FechaConsulta
	private integracionToaService:IntegracionToaService
	private atencionPostModels:AtencionProcesoModel
	private atencionProcesoDao:AtencionProcesoDao
	private registrarToaFactory:RegistrarToaFactory
	private toaFactory:ToaFactory

	constructor(

		@Inject private retomaChatDao:RetomaChatDao,
		@Inject private responseStatus: ResponseStatus,
		@Inject private flujoListDAO: FlujoListDAO,

	) {

		this.atencionPostModels = Container.get(AtencionProcesoModel)
		this.integracionToaService = Container.get(IntegracionToaService)
		this.atencionProcesoDao = Container.get(AtencionProcesoDao)
		this.fechaConsulta = Container.get(FechaConsulta)
		this.registrarToaFactory = Container.get(RegistrarToaFactory)
		this.toaFactory = Container.get(ToaFactory)
		this.response = []
		this.jsonResponse = {}
		this.toaTecnico = {}
		this.atencionConsultSql = {}
		this.atencionSql = {}
		this.flujoSql = {}

	}

	async consultarFlujosRetoma(request:string, tipo_orden:string): Promise<Object> {
		let responseInsertarError:Object|any
		let responseInsertar:Object|any
		let reponseSqlTecnico:Object|any

		let NumOrden = await this.setValuesAtencion(request)
		this.atencionSql = await this.retomaChatDao.retomaChatFlujos(NumOrden)
		//if(this.atencionSql.rowsAffected[0] == 'RequestError'){
		if(this.atencionSql == 'RequestError'){
			this.response = []
			this.response = this.responseStatus.stateSelect(500)
		}else if(this.atencionSql.rowsAffected[0] > 0) {
			this.response = []
			const resulIdToa:any = await this.atencionProcesoDao.searchIdProcesoToa()
			const fechaFin   = await this.fechaConsulta.getDateCurrent()
		  const fechaHasta = await this.fechaConsulta.getDatePass()
			const resToa:any = await this.integracionToaService.serviceIntegrationToa(tipo_orden,request,fechaFin,fechaHasta)

			if(resToa[0].responseToa.statusOrden == 'error_request'){
				await this.respuestaIntegracion('error')
				return this.jsonResponse
			}

			let insertData = await this.setDataModels(request,tipo_orden,fechaHasta,fechaFin,resulIdToa.recordset[0].Id_Proceso,resToa)
			console.log(resToa[0].responseToa,'integracion')
			if(resToa[0].responseToa.statusOrden == 'no encontrada'){
				responseInsertarError = await this.registrarToaFactory.registraIntegracion('no_procesado',insertData)
				let response:Object|any = { response : resToa[0].responseToa }
				return response
			}

			responseInsertar = await this.registrarToaFactory.registraIntegracion('procesado',insertData)
			const IdTecnico = resToa[1].responseIntegracion.items[0].resourceId
		  this.toaTecnico = await this.toaFactory.factoryIntegracionToa('tecnico',IdTecnico)

			if(this.toaTecnico[0].responseToa.statusOrden =='error_request'){
				await this.respuestaIntegracion('error')
				return this.jsonResponse
			}

			const reponseTecnico:any = await this.setModelSaveTecnico(request,tipo_orden,resulIdToa.recordset[0].Id_Proceso,this.toaTecnico)
			reponseSqlTecnico = await this.registrarToaFactory.registraIntegracion('servicioTecnico',reponseTecnico)

			let idFlujo = this.atencionSql.recordset[0].CodFlujo
			let CodAtencion = this.atencionSql.recordset[0].Id_Atencion
			let codAtencionSet = await this.setValuesAtencionPaso(CodAtencion)
			//console.log(codAtencionSet)
			this.atencionConsultSql = await this.retomaChatDao.retomachatAtencionPaso(codAtencionSet)
			await this.respuestaIntegracion()
			this.response = []
			this.flujoSql = await this.flujoListDAO.getFlujoList(idFlujo)
			await this.respuestaIntegracion()
			this.response =this.jsonResponse
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

	respuestaIntegracion(error:any = ''): void {
		//console.log(this.atencionConsultSql.rowsAffected[0])
		//console.log(this.atencionConsultSql.recordset[0])
		if(error == 'error'){
			this.jsonResponse = {	response : { status: null, activityType: null, statusOrden: 'no encontrada', error: 'Bad Request' } }
		}else{
			this.jsonResponse = {
				"status": 200,
				"msg": "Exitoso",
				"ActivityId": (this.atencionSql.rowsAffected[0] > 0) ? this.atencionSql.recordset[0].ActivityId : 'NULL',
				"rowsTecnico": {
				//Id_Atencion : atencionSql.recordset[0].Id_Atencion,
					ResourceId: this.toaTecnico[1].responseIntegracion.resourceId,
					Usuario : this.toaTecnico[1].responseIntegracion.name,
					Id_Login : this.toaTecnico[1].responseIntegracion.status
				},
				"rowsAtaencionPaso": (this.atencionConsultSql.rowsAffected[0] > 0) ? this.atencionConsultSql.recordset[0] :{CodAtencion : this.atencionSql.recordset[0].Id_Atencion},
				"recordsets": this.flujoSql.recordset
			}
		}
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

  async setDataModels(n_orden:string,tipo_orden:string,fechaHasta:string,fechaFin:string,idIntegracionToa:number,resToa:any): Promise<Object> {
		this.atencionPostModels.CodProceso = idIntegracionToa
		this.atencionPostModels.NumOrden = n_orden
		this.atencionPostModels.Request = n_orden + '-' + tipo_orden 
		this.atencionPostModels.Response = JSON.stringify(resToa[1].responseIntegracion)
		this.atencionPostModels.Servicio = resToa[1].responseIntegracion.links[0].href
		this.atencionPostModels.Estado = (resToa[0].responseToa.statusOrden == 'encontrada') ? 'orden_encontrada' : 'orden_no_encontrada'

		return this.atencionPostModels
	}

	async setModelSaveTecnico(n_orden:string,tipo_orden:string,idIntegracionToa:number,response:any):Promise<Object> {
		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = response[1].responseIntegracion.resourceId
		atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		atencionPostModels.Estado = 'orden_encontrada' 
		atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return atencionPostModels
	}
}