import Conection from '../Loaders/databaseLoader'
import * as sql from 'mssql'
import { Inject } from "typescript-ioc";

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
			const result = await sqlGetSteps.request()
				.input('Id_CategoriaFlujo', sql.Int, Id_CategoriaFlujo)
				.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND CodCategoriaFlujo=@Id_CategoriaFlujo`);
			return Object.assign(result.recordset);
		} catch (error) {
			return error
		}
	}
	
	//OBTIENE EL LISTADO DE PASOS DE LA CONSULTA EN FORMATO JSON
	public async getFlujoList(id:number): Promise<void> {
		let queryFlujo:any
		try {
			let activo:number = 1;
			const connect = await this.databaseConnection.getPool()
		  queryFlujo = await connect.request()
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
											 tp.Id_TipoPaso
											,tp.NomTipoPaso
											,ps.Id_Paso
											,ps.NomPaso
											,ps.Descripcion
										 FROM Paso ps 
										 INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										 INNER JOIN TipoPaso	tp ON tp.Id_TipoPaso = ps.CodTipoPaso
										 WHERE fp.CodFlujo = @id_flujo AND tp.Activo = @activo
										 GROUP BY 
										   ps.NomPaso
											,ps.Descripcion
											,ps.Id_Paso
											,tp.Id_TipoPaso
											,tp.NomTipoPaso
										 FOR JSON PATH
										) AS Pasos

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
									  FOR JSON PATH
									) AS FlujoPasos 

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
										ORDER BY ps.Id_Paso ASC
										FOR JSON PATH
									) AS Cuestionarios

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
									  FOR JSON PATH
									) AS Procesos
									FROM Flujo fl
									LEFT JOIN FlujoPaso fp ON fp.CodFlujo = fl.CodCategoriaFlujo
									LEFT JOIN Paso ps ON ps.Id_Paso = fl.CodPaso_inicial
									LEFT JOIN TipoPaso tp ON tp.Id_TipoPaso = ps.CodTipoPaso
									WHERE fl.Id_flujo = @id_flujo AND fl.Activo = @activo
									FOR JSON PATH`)
			return queryFlujo;
		} catch (error) {
			queryFlujo = { rowsAffected : error.name }
			return queryFlujo
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
			const result = await sqlGetSteps.request()
				.input('Id_Flujo', sql.Int, Id_Flujo)
			    .query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND Id_Flujo=@Id_Flujo`);
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