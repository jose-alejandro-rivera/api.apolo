import Conections from "../connet"
import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { Container, Inject } from "typescript-ioc";
import { any } from "bluebird";

/**
 * 
 * @category DAO
 */
export class AtencionPasoCampoDAO {
	private result: any;
	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}

	//Filtra que metodos se ejecutaran segun los datos enviados
	public async createAtencionPasoCampo(atencionPaso: any, atencionProceso: any, atencionProcesoSalida: any, atencionCampo: any) {

		try {
			let CodAtencionpaso: any; let codCuestionario: any; let codAtencionProsces: any; let codigopaso: any;
			let { CodPaso } = atencionPaso;
			codigopaso = await this.consultaAtencionPaso(atencionPaso);
			 if (CodPaso == codigopaso ) {
				CodAtencionpaso = await this.createAtencionPaso(atencionPaso);
				return CodAtencionpaso;
			}
		} catch (error) {
			return error
		}
	}
	//Metodo que consulta si el codigo del paso enviado existe en la bd
	public async consultaAtencionPaso(atencionPaso: any) {
		let { CodPaso } = atencionPaso;
		const sqlGetSteps = await this.databaseConnection.getPool();
		const request = await sqlGetSteps.request()
		const validacion: any = await request
		this.result = await request
			.input('codPas', sql.Int, CodPaso)
			.query('SELECT p.id_Paso, a.Id_Atencion FROM Paso p, Atencion a where p.id_Paso = @codPas');
		let cPaso = this.result.recordset[0].id_Paso;
		return cPaso;
	}
	public async createAtencionPaso(atencionPaso: any) {
		let { CodAtencion, CodPaso, Secuencia, Soluciona } = atencionPaso;
		const sqlGetSteps = await this.databaseConnection.getPool();
		let idatencion : any;
		const request = await sqlGetSteps.request()
		let id = await this.consultaIdAtencionPaso();
		let SecuenciaC =  id + 1;
		const validacion: any = await request
		this.result = await request
			.input('codAt', sql.Int, CodAtencion)
			.input('codPas', sql.Int, CodPaso)
			.input('secu', sql.Int, SecuenciaC)
			.input('solu', sql.Int, Soluciona)
			.query('INSERT INTO AtencionPaso (CodAtencion,CodPaso,Secuencia,Soluciona,Fecha) VALUES (@codAt,@codPas,@secu,@solu,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionPaso;');
			let CodAtencionpaso = this.result.recordset[0].Id_AtencionPaso;
		return CodAtencionpaso;
	}
	//Consulta el ultimo id_atencionPaso
	public async consultaIdAtencionPaso() {
		let idatenciopas : any;
		let secuencia : any;
		const sqlGetSteps = await this.databaseConnection.getPool();
		const request = await sqlGetSteps.request()
			.query('SELECT TOP 1 Secuencia,Id_AtencionPaso FROM atencionPaso ORDER BY Id_AtencionPaso DESC');
			idatenciopas  = request.recordset[0].Secuencia 
		return idatenciopas;
	}	
	public async createAtencionCampo(arrCuestionarioCampo: any, CodAtencionpaso: any) {
		let result:any;
		const sqlGetSteps = await this.databaseConnection.getPool();
		const request = await sqlGetSteps.request()
		for(let i = 0; i < arrCuestionarioCampo.length; i++){
			let CodCuestionarioCampo = arrCuestionarioCampo[i].CodCuestionarioCampo;
			let ValorCampo = arrCuestionarioCampo[i].ValorCampo;
			result = await request
			.input('codAtPas', sql.Int, CodAtencionpaso)
			.input('codCuest', sql.Int, CodCuestionarioCampo)
			.input('valCam', sql.Int, ValorCampo)
			.query('INSERT INTO AtencionCampo (CodAtencionPaso,CodCuestionarioCampo,ValorCampo,Fecha) VALUES (@codAtPas,@codCuest,@valCam,getdate());');
		}
		return result.rowsAffected;
	}
	public async createAtencionProceso(idAtnPaso : any, atencionProceso: any, atencionProcesoSalida: any) {
		let { CodProceso, TipoServicio, Servicio, Request, Response } = atencionProceso;
		const sqlGetSteps = await this.databaseConnection.getPool();
		const request = await sqlGetSteps.request()
		let result = await request
			.input('codAtPas', sql.Int, idAtnPaso)
			.input('codProces', sql.Int, CodProceso)
			.input('tipoServ', sql.VarChar, TipoServicio)
			.input('serv', sql.VarChar, Servicio)
			.input('req', sql.VarChar, Request)
			.input('res', sql.VarChar, Response)
			.query('INSERT INTO AtencionProceso (CodAtencionPaso,CodProceso,TipoServicio,Servicio,Request,Response,Fecha) VALUES (@codAtPas,@codProces,@tipoServ,@serv,@req,@res,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionProceso;');
			let codAtencionProces = result.recordset[0].Id_AtencionProceso;
			this.createAtencionProcesoSalida(atencionProcesoSalida,codAtencionProces)
		return codAtencionProces;
	}
	public async createAtencionProcesoSalida(atencionProcesoSalida: any, codAtencionProsces: any) {
		let { CodProcesoSalida, Valor } = atencionProcesoSalida;
		const sqlGetSteps = await this.databaseConnection.getPool();
		const request = await sqlGetSteps.request()
		let result = await request
			.input('codAtProces', sql.Int, codAtencionProsces)
			.input('codProceSalida', sql.Int, CodProcesoSalida)
			.input('valCam', sql.Int, Valor)
			.query('INSERT INTO AtencionProcesoSalida (CodAtencionProceso,CodProcesoSalida,Valor,Fecha) VALUES (@codAtProces,@codProceSalida,@valCam,getdate());');
		return this.result.rowsAffected;

	}
}