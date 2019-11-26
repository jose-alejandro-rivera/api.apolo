import Conections from "../connet"
import Conection from '../loaders/databaseLoader'
import * as sql from 'mssql'
import CategoriaFlujoModel from '../Models/CategoriaFlujoModels'
import { Container, Inject } from "typescript-ioc";

/**
 * 
 * @category DAO
 */
export class FlujoListDAO {

	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}

	public async getFlujosPorCategoria(Id_CategoriaFlujo: number): Promise<void> {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND CodCategoriaFlujo=${Id_CategoriaFlujo}`);
			return Object.assign(result.recordset);
		} catch (error) {
			return error
		}
	}

	public async getFlujosComplete(): Promise<void> {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.request().query(`SELECT f.Id_Flujo,
														f.NomFlujo,
													(SELECT cf.Id_CategoriaFlujo as 'Id_CategoriaFlujo',
														cf.NomCategoriaFlujo as 'NomCategoriaFlujo',
														cf.Usuario as 'Usuario'
													FROM CategoriaFlujo cf
													WHERE cf.Id_CategoriaFlujo = f.CodCategoriaFlujo
													FOR JSON PATH,ROOT('Categorias')) AS CategoriaFlujo,
													(SELECT p.Id_Paso,
														p.NomPaso,
														p.Descripcion,
														p.Activo,

													(SELECT c.Id_Cuestionario,
															c.NomCuestionario,
															c.Descripcion,
															c.Activo,

														(SELECT ca.Id_Campo,
																ca.NomCampo,
																ca.Descripcion,
																ca.Tipo,
																ca.Longitud
														FROM Campo AS ca
														JOIN CuestionarioCampo AS cc ON cc.CodCampo=ca.Id_Campo
														WHERE cc.CodCuestionario=c.Id_Cuestionario
															FOR JSON PATH,ROOT('Pasos')) AS Pasos
													FROM Cuestionario AS c
													WHERE c.Id_Cuestionario=p.CodCuestionario
														FOR JSON PATH,ROOT('Cuestionario')) AS Cuestionario,
														p.CodProceso
													FROM Paso p
													JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = p.Id_Paso
													OR fp.CodPaso_Destino = p.Id_Paso
													WHERE fp.CodFlujo = f.Id_Flujo
													FOR JSON PATH,ROOT('PasosAsociados')) AS PasosAsociados,
														f.Descripcion,
														f.Orden,
														f.Activo
													FROM Flujo AS f
													FOR JSON PATH, ROOT('flujo')`);
			return Object.assign(result.recordset);
		} catch (error) {
			return error
		}
	}
	//OBTIENE EL LISTADO DE PASOS DE LA CONSULTA EN FORMATO JSON
	public async getFlujoList(id:number): Promise<void> {
		let data: any
		try {
			let activo = 1;
			const connect = await this.databaseConnection.getPool()
			let queryFlujo:any = await connect.request()
				.input('id_flujo',sql.Int,id)
				.input('activo',sql.BigInt,activo)
				.query(`SELECT DISTINCT
									 fl.Id_flujo 
									,fl.NomFlujo 
									,fl.CodCategoriaFlujo
									,fl.CodPaso_Inicial 
									,fl.Descripcion 
									,fl.Orden 

									,( SELECT 
											 fp.Id_FlujoPaso 
											,fp.CodFlujo 
											,fp.CodPaso_Origen 
											,fp.CodPaso_Destino 
											,fp.Orden
											,fp.ExpresionEjecucion
											,fp.finaliza 
									  FROM FlujoPaso fp 
									  WHERE CodFlujo = @id_flujo AND fp.Activo = @activo
									  FOR JSON PATH, ROOT('flujoPaso')
									) AS flujo_paso 

									,( SELECT
											 ct.Id_Cuestionario  
											,ct.NomCuestionario 
											,ct.Descripcion 
											,cc.Id_CuestionarioCampo
											,cc.NomCuestionarioCampo
											,cc.Sigla 
											,cc.Orden 
											,cc.Obligatorio 
											,cc.CodCampo_Dependencia
											,cc.CodCuestionario
											,ca.Id_Campo
											,ca.NomCampo 
											,ca.Descripcion AS campoDescripcion
											,ca.Tipo 
											,ca.Longitud 
											,ca.ExpresionRegular
											,ps.Id_Paso
										  FROM  Paso ps
										INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										LEFT JOIN  Cuestionario ct ON ps.CodCuestionario = ct.Id_Cuestionario 
										INNER JOIN CuestionarioCampo cc ON cc.CodCuestionario = ct.Id_Cuestionario 
										INNER JOIN Campo ca ON  ca.Id_Campo = cc.CodCampo
									  WHERE  fp.CodFlujo = @id_flujo AND fp.Activo = @activo AND ps.Activo = @activo AND ct.Activo = @activo
									  GROUP BY
											 ct.Id_Cuestionario  
											,ct.NomCuestionario 
											,ct.Descripcion 
											,cc.Id_CuestionarioCampo
											,cc.NomCuestionarioCampo
											,cc.Sigla 
											,cc.Orden 
											,cc.Obligatorio 
											,cc.CodCampo_Dependencia
											,cc.CodCuestionario
											,ca.Id_Campo
											,ca.NomCampo 
											,ca.Descripcion 
											,ca.Tipo 
											,ca.Longitud 
											,ca.ExpresionRegular
											,ps.Id_Paso
										FOR JSON PATH, ROOT('paso_cuestionario')
									) AS pasoCuestionario

									,( SELECT  
									    pc.Id_Proceso
									   ,pc.NomProceso
									   ,pc.Descripcion
									   ,pc.Servicio
									   ,pc.TipoServicio
									   ,ps.Id_Paso
									   ,pcs.Id_ProcesoSalida
									   ,pcs.NomProcesoSalida
									   ,pcs.Sigla
									   ,pcs.Criterio_Busqueda
									  FROM Paso ps 
										INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										LEFT JOIN Proceso pc ON pc.Id_Proceso = ps.CodProceso
										INNER JOIN ProcesoSalida pcs ON pcs.CodProceso = pc.Id_Proceso
										WHERE fp.CodFlujo = @id_flujo AND fp.Activo = @activo
									  GROUP BY 
										   pc.Id_Proceso
										  ,pc.NomProceso
										  ,pc.Descripcion
										  ,pc.Servicio
										  ,pc.Servicio
										  ,pc.TipoServicio
										  ,ps.Id_Paso
										  ,pcs.Id_ProcesoSalida
										  ,pcs.NomProcesoSalida
										  ,pcs.Sigla
										  ,pcs.Criterio_Busqueda
									  FOR JSON PATH, ROOT('paso_proceso')
									) AS pasoProcesos
									FROM Flujo fl
									LEFT JOIN FlujoPaso fp ON fp.CodFlujo = fl.CodCategoriaFlujo
									LEFT JOIN Paso ps ON ps.Id_Paso = fl.CodPaso_inicial
									LEFT JOIN TipoPaso tp ON tp.Id_TipoPaso = ps.CodTipoPaso
									WHERE fl.Id_flujo = @id_flujo AND fl.Activo = @activo
									FOR JSON PATH, ROOT('Flujo')`)
			if(queryFlujo.rowsAffected > 0){
				data = {
					status: 200,
					rows : queryFlujo.recordsets
				}
			}else{
				data = {
					status: 201,
					rows : []
				}
			}
			return data
		} catch (error) {
			console.log(error)
			data = {
					status: 500,
					rows : []
				}
			return data
		}
	}

	public async getCategoriaFlujoList() {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT Id_CategoriaFlujo,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo where Activo=1`);
			return result;
		} catch (error) {
			return error
		}
	}

	public async validateFlujoExist(Id_Flujo: number): Promise<boolean> {
		try {
			const sqlGetSteps = await this.databaseConnection.getPool();
			const result = await sqlGetSteps.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND Id_Flujo=${Id_Flujo}`);
			if (result.rowsAffected[0] > 0) {
				return true;
			} else {
				return false;
			}

		} catch (error) {
			return error
		}
	}

}