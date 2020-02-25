import DatabaseConnection from "../Loaders/databaseLoader";
import * as sql from 'mssql';
import { Inject, Container } from "typescript-ioc";
import ResponseTable from '../ResponseTable/ResponseTable'
import RegistroFotograficoModel from '../Models/RegistroFotograficoModel'

export default class RegistroFotograficoDAO {
	private responseTable:ResponseTable
	private result:any
	constructor(@Inject private databaseConnection:DatabaseConnection){
		this.responseTable = Container.get(ResponseTable)
	}

	async insertarRegistroFotografico(registroFotograficoModel:RegistroFotograficoModel):Promise<Object|any> {
		try{
			const connect = await this.databaseConnection.getPool()
			this.result =  await connect.request()
				.input('CodPaso',sql.Int,registroFotograficoModel.CodPaso)
				.input('Nombre',sql.VarChar,registroFotograficoModel.Nombre)
				.input('NumOrden',sql.VarChar,registroFotograficoModel.NumOrden)
				.query(`INSERT INTO RegistrosFotografico (CodPaso,Nombre,NumOrden)
								VALUES (@CodPaso, @Nombre, @NumOrden)`)
			this.responseTable.response = this.result
		}catch(error){
			this.responseTable.response = error.name
		}finally{
			return this.responseTable
		}
	}

	async validarRegistroFotografico(registroFotograficoModel:RegistroFotograficoModel):Promise<Object|any> {
		try{
			const connect = await this.databaseConnection.getPool()
			this.result =  await connect.request()
				.input('CodPaso',sql.Int,registroFotograficoModel.CodPaso)
				.input('NumOrden',sql.VarChar,registroFotograficoModel.NumOrden)
				.query(`SELECT Id_RegistroFoto, CodPaso, NumOrden
								FROM RegistrosFotografico
								WHERE CodPaso = @CodPaso AND NumOrden = @NumOrden`)
			this.responseTable.response = this.result
		}catch(error){
			this.responseTable.response = error.name
		}finally{
			return this.responseTable
		}
	}

	async actualizarRegistroFotografico(registroFotograficoModel:RegistroFotograficoModel):Promise<Object|any> {
		try{
			const connect = await this.databaseConnection.getPool()
			this.result =  await connect.request()
				.input('Nombre',sql.VarChar,registroFotograficoModel.Nombre)
				.input('Id_RegistroFoto',sql.Int,registroFotograficoModel.Id_RegistroFoto)
				.query(`UPDATE RegistrosFotografico
								SET Nombre = @Nombre, Fecha = getdate()
								WHERE Id_RegistroFoto = @Id_RegistroFoto`)
			this.responseTable.response = this.result
		}catch(error){
			this.responseTable.response = error.name
		}finally{
			return this.responseTable
		}
	}	

}