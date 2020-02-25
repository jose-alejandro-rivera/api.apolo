import{ Inject, Container } from "typescript-ioc"
import RegistroFotograficoDAO from '../DAO/RegistroFotograficoDAO'
import { ResponseStatus } from "../ConfigRes/resStatus"

import RegistroFotograficoModel from '../Models/RegistroFotograficoModel'
import AtencionModel from '../Models/AtencionModel'

export default class RegistroFotograficoController {
	private response:Array<string | number>
	private jsonResponse:Object|any
	private registroFotoSql:Object|any
	private validarRegSql:Object|any
	private actualizarRegSql:Object|any
	registroFotograficoModel:RegistroFotograficoModel
	constructor(
		@Inject private registroFotograficoDAO:RegistroFotograficoDAO,
		@Inject private responseStatus: ResponseStatus,
	){
		this.response = []
		this.jsonResponse = {}
		this.registroFotograficoModel = Container.get(RegistroFotograficoModel)
	}

	async guardarRegistroFotografico(request:Object|any): Promise<Object|any> {
		const { nombreImagen, imagen } = request.body
		const { Id_Paso, numOrden } = request.param

		if(!nombreImagen && !imagen) {
			this.response = []
			this.response = this.responseStatus.stateSelect(201)
			return this.response
		}
		await this.setModelsRegistroFoto(request)
		this.validarRegSql = await this.registroFotograficoDAO.validarRegistroFotografico(this.registroFotograficoModel)
		if(this.validarRegSql.response.rowsAffected[0] > 0 ){
			this.response = []
			this.response = this.responseStatus.stateSelect(201)
			return this.response
			/*await this.setIdRegistroFotografico(this.validarRegSql.response.recordset[0].Id_RegistroFoto)
			this.actualizarRegSql = await this.registroFotograficoDAO.actualizarRegistroFotografico(this.registroFotograficoModel)
			this.response = []
			if(this.actualizarRegSql.response == 'RequestError'){
				this.response = this.responseStatus.stateSelect(201)
				return this.response
			}
			if(this.actualizarRegSql.response.rowsAffected[0] == 0 ){
				this.response = this.responseStatus.stateSelect(201)
				return this.response
			}
			this.response = this.responseStatus.stateSelect(200)
			return this.response*/
		}

		this.registroFotoSql = await this.registroFotograficoDAO.insertarRegistroFotografico(this.registroFotograficoModel)
		this.response = []
		if(this.registroFotoSql.response == 'RequestError'){
			this.response = this.responseStatus.stateSelect(201)
			return this.response
		}
		if(this.registroFotoSql.response.rowsAffected[0] == 0 ){
			this.response = this.responseStatus.stateSelect(201)
			return this.response
		}
		this.response = this.responseStatus.stateSelect(200)
		return this.response
	}

	async actualizarRegistroFotografico(request:Object|any): Promise<Object|any> {

		const { nombreImagen, imagen } = request.body
		const { Id_Paso, numOrden } = request.param

		if(!nombreImagen && !imagen) {
			this.response = []
			this.response = this.responseStatus.stateSelect(201)
			return this.response
		}
		await this.setModelsRegistroFoto(request)
		this.validarRegSql = await this.registroFotograficoDAO.validarRegistroFotografico(this.registroFotograficoModel)

		if(this.validarRegSql.response.rowsAffected[0] > 0 ){
			await this.setIdRegistroFotografico(this.validarRegSql.response.recordset[0].Id_RegistroFoto)
			this.actualizarRegSql = await this.registroFotograficoDAO.actualizarRegistroFotografico(this.registroFotograficoModel)
			this.response = []
			if(this.actualizarRegSql.response == 'RequestError'){
				this.response = this.responseStatus.stateSelect(201)
				return this.response
			}
			if(this.actualizarRegSql.response.rowsAffected[0] == 0 ){
				this.response = this.responseStatus.stateSelect(201)
				return this.response
			}
			this.response = this.responseStatus.stateSelect(200)
			return this.response
		}
		this.response = this.responseStatus.stateSelect(201)
		return this.response
	}

	setModelsRegistroFoto(request:Object|any) :void {
		this.registroFotograficoModel.CodPaso = request.params.CodPaso
		this.registroFotograficoModel.NumOrden = request.params.NumOrden
		this.registroFotograficoModel.Nombre = request.body.nombreImagen
	}

	setIdRegistroFotografico(IdRegistroFotografico:number|any) : void {
		console.log(IdRegistroFotografico)
		this.registroFotograficoModel.Id_RegistroFoto = IdRegistroFotografico
	}
}