import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import { Inject, Container } from "typescript-ioc";
import AtencionModels from "../Models/AtencionModels";
import FlujoGetModels from "../models/FlujoGetModels";
import LoginModels from "../Models/LoginModels";
import ValidationModels from "../Models/ValidationModels";

/**
 * 
 * @category DAO
 */
export class AtencionDAO {


	private result: any;


	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}

	public async createAtencion(data: any) {
		let result:any
		let atencionPostModels: AtencionModels = Container.get(AtencionModels);
		try {
			let { CodLogin, CodFlujo } = data;
			const sqlGetSteps = await this.databaseConnection.getPool();
			result = await sqlGetSteps.request()
				.input('CodLogin', sql.Int, CodLogin)
				.input('CodFlujo', sql.Int, CodFlujo)
				.query(`INSERT INTO Atencion (CodLogin, CodFlujo, Fecha) VALUES (@CodLogin,@CodFlujo,getdate()); SELECT SCOPE_IDENTITY() as Id_Atencion;`);
			return atencionPostModels.atencionPost = result;
		} catch (error) {
			console.log("error reported");
			return atencionPostModels.atencionPost = error.name;
		}
	}

	public async validateAtencion(CodLogin: number, CodFlujo: number) {
		let validationModels: ValidationModels = Container.get(ValidationModels);
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			let validation = await sqlGetSteps.request()
				.input('CodLogin', sql.Int, CodLogin)
				.input('CodFlujo', sql.Int, CodFlujo)
				.query`SELECT l.Id_Login,f.Id_Flujo FROM (SELECT * FROM Login WHERE Id_Login=@CodLogin) AS l,(SELECT * FROM Flujo WHERE Id_Flujo=@CodFlujo) AS f`;
			if (validation.recordsets) {
				return validationModels.validation = true;
			} else {
				return validationModels.validation = false;
			}
		} catch (error) {
			return error;
		}
	}

	//Filtra que metodos se ejecutaran segun los datos enviados
	public async createAtencionPasoCampo(atencionPaso: any) {
		let CodAtencionpaso: any; 
		try {
			let cPasopruebas = 2; 
			let codigopaso: any;
			let { CodPaso } = atencionPaso;
			codigopaso = await this.consultaAtencionPaso(atencionPaso);
			let cPaso = (codigopaso.recordsets[0].CodPaso) ? codigopaso.recordsets[0].CodPaso : cPasopruebas;
			if (CodPaso == cPaso) {
				CodAtencionpaso = await this.createAtencionPaso(atencionPaso);
				return CodAtencionpaso;
			}
		} catch (error) {
			CodAtencionpaso = { rowsAffected : error.name }
			return CodAtencionpaso
		}
	}
	//Metodo que consulta si el codigo del paso enviado existe en la bd
	public async consultaAtencionPaso(atencionPaso: any) {
		try {
			let { CodPaso } = atencionPaso;
			const sqlGetSteps = await this.databaseConnection.getPool();
			this.result = await sqlGetSteps.request()
				.input('codPas', sql.Int, CodPaso)
				.query('SELECT p.id_Paso FROM Paso p where p.id_Paso = @codPas');
			let cPaso = this.result;
			return cPaso;
		} catch (error) {
			return error;
		}
	}
	//Metodo que crea una atecionPaso
	public async createAtencionPaso(atencionPaso: any) {
		try {
			
			let { CodAtencion, CodPaso, Soluciona } = atencionPaso;
			const sqlGetSteps = await this.databaseConnection.getPool();
			let id = await this.consultaIdAtencionPaso();
			let SecuenciaC = id + 1;
			let result = await sqlGetSteps.request()
				.input('codAt', sql.Int, CodAtencion)
				.input('codPas', sql.Int, CodPaso)
				.input('secu', sql.Int, SecuenciaC)
				.input('solu', sql.Int, Soluciona)
				.query('INSERT INTO AtencionPaso (CodAtencion,CodPaso,Secuencia,Soluciona,Fecha) VALUES (@codAt,@codPas,@secu,@solu,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionPaso;');
			let CodAtencionpaso = result;
			return CodAtencionpaso;
		} catch (error) {
			return error;
		}
	}
	//Consulta el ultimo id_atencionPaso
	public async consultaIdAtencionPaso() {
		try {
			let idatenciopas: any;
			const sqlGetSteps = await this.databaseConnection.getPool();
			const request = await sqlGetSteps.request()
				.query('SELECT TOP 1 Secuencia,Id_AtencionPaso FROM atencionPaso ORDER BY Id_AtencionPaso DESC');
				if(request.recordset){
					if (request.recordset.length > 0) {
						idatenciopas = request.recordset[0].Secuencia
					} else {
						idatenciopas = 0;
					}
				}
			return idatenciopas;
		} catch (error) {
			return error;
		}
	}
	//Metodo que crea una atecionCampo
	public async createAtencionCampo(arrCuestionarioCampo: any, CodAtencionpaso: any) {
		try {
			let result: any;
			const sqlGetSteps = await this.databaseConnection.getPool();
			for (let i = 0; i < arrCuestionarioCampo.length; i++) {
				let CodCuestionarioCampo = arrCuestionarioCampo[i].CodCuestionarioCampo;
				let ValorCampo = arrCuestionarioCampo[i].ValorCampo;
				result = await sqlGetSteps.request()
					.input('codAtPas', sql.Int, CodAtencionpaso)
					.input('codCuest', sql.Int, CodCuestionarioCampo)
					.input('valCam', sql.VarChar, ValorCampo)
					.query('INSERT INTO AtencionCampo (CodAtencionPaso,CodCuestionarioCampo,ValorCampo,Fecha) VALUES (@codAtPas,@codCuest,@valCam,getdate());');
			}
			return result;
		} catch (error) {
			return error;
		}
	}
	//Metodo que crea una atecionProceso	
	public async createAtencionProceso(idAtnPaso: any, atencionProceso: any, atencionProcesoSalida: any) {
		try {
			let { CodProceso, TipoServicio, Servicio, Request, Response } = atencionProceso;
			const sqlGetSteps = await this.databaseConnection.getPool();
			let result = await sqlGetSteps.request()
				.input('codAtPas', sql.Int, idAtnPaso)
				.input('codProces', sql.Int, CodProceso)
				.input('tipoServ', sql.VarChar, TipoServicio)
				.input('serv', sql.VarChar, Servicio)
				.input('req', sql.VarChar, Request)
				.input('res', sql.VarChar, Response)
				.query('INSERT INTO AtencionProceso (CodAtencionPaso,CodProceso,TipoServicio,Servicio,Request,Response,Fecha) VALUES (@codAtPas,@codProces,@tipoServ,@serv,@req,@res,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionProceso;');
			this.createAtencionProcesoSalida(atencionProcesoSalida, result)
			return result; 
		} catch (error) {
			return error;
		}
	}
	//Metodo que crea una atecionProcesoSalida
	public async createAtencionProcesoSalida(atencionProcesoSalida: any, result: any) {
		let { Id_AtencionProceso } = result;
		try {
			let { CodProcesoSalida, Valor } = atencionProcesoSalida;
			const sqlGetSteps = await this.databaseConnection.getPool();
			let result = await sqlGetSteps.request()
				.input('codAtProces', sql.Int, Id_AtencionProceso)
				.input('codProceSalida', sql.Int, CodProcesoSalida)
				.input('valCam', sql.VarChar, Valor)
				.query('INSERT INTO AtencionProcesoSalida (CodAtencionProceso,CodProcesoSalida,Valor,Fecha) VALUES (@codAtProces,@codProceSalida,@valCam,getdate());');
				return result;
		} catch (error) {
			return error;
		}

	}

}