import   Conections  from "../connet"
import Conection  from '../loaders/databaseLoader'
import * as sql from 'mssql'
import CategoriaFlujoModel  from '../Models/CategoriaFlujoModels'
import {Container, Inject} from "typescript-ioc";

/**
 * 
 * @category DAO
 */
export class FlujoListDAO {
	
	constructor(@Inject private databaseConnection: Conection) {
		// code...
	}

	public async getFlujosPorCategoria(Id_CategoriaFlujo:number):Promise<void> {
        try{
            const sqlGetSteps = await this.databaseConnection.getPool();
            const result = await sqlGetSteps.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND CodCategoriaFlujo=${Id_CategoriaFlujo}`);
            return Object.assign(result.recordset);
        }catch(error){
            return error
        }
    }
  //OBTIENE EL LISTADO DE PASOS DE LA CONSULTA EN FORMATO JSON
	public async getFlujoList():Promise<void> {
		try{
			
			const sqlGetSteps = await this.databaseConnection.getPool()
			let result:any = await sqlGetSteps.request()
			.query(`SELECT DISTINCT 
						  p.Id_Paso as 'pasosProceso.Id_Paso'
						  ,p.NomPaso  as 'pasosProceso.NomPaso'
						  ,p.Descripcion as 'pasosProceso.Descripcion'
						  ,c.NomCuestionario as 'cuestionariosPaso.NomCuestionario'
						  ,c.Descripcion as 'cuestionariosPaso.Descripcion'
						  ,(SELECT
						    pa.Id_Paso as 'paso.Id_Paso'
						    ,cc.Orden as 'CuestionarioCampo.Orden'
						    ,CASE WHEN cc.Obligatorio = 1 THEN 'true' ELSE 'false' END  as 'CuestionarioCampo.Obligatorio'
						    ,ca.NomCampo as 'campos.NomCampo'
						    ,ca.Descripcion as 'campos.Descripcion'
						    ,ca.tipo as 'campos.tipo'
						    ,ca.Longitud as 'campos.Longitud'
						    ,cl.Llave as 'campoLista.Llave'
						    ,cl.Descripcion as 'campoLista.Descripcion'
						    FROM Campo ca
						    LEFT JOIN CampoLista cl ON ca.Id_Campo = cl.CodCampo
						    INNER JOIN CuestionarioCampo cc ON  ca.Id_Campo = cc.CodCampo
						    INNER JOIN Cuestionario AS c ON  c.Id_Cuestionario = cc.CodCuestionario
						    INNER JOIN Paso AS pa ON pa.CodCuestionario = c.Id_Cuestionario AND pa.Id_Paso =p.Id_Paso
						    FOR JSON PATH, ROOT('CuestionarioCampo')
						    ) AS cuestionario
						FROM Paso AS p
						LEFT JOIN Cuestionario AS c ON p.CodCuestionario = c.Id_Cuestionario 
						LEFT JOIN CuestionarioCampo AS cc ON  c.Id_Cuestionario = cc.CodCuestionario
						LEFT JOIN Campo AS ca ON cc.CodCampo = ca.Id_Campo
						LEFT JOIN CampoLista cl ON ca.Id_Campo = cl.CodCampo
						GROUP BY
						 p.Id_Paso
						,p.NomPaso
						,p.Descripcion
						,c.NomCuestionario
						,c.Descripcion
						FOR JSON PATH, ROOT('pasos')`)
			let data:any = result.recordsets
			return  data
			console.log(result)

		}catch(error){
			return error
		}
	}

	 public async getCategoriaFlujoList():Promise<CategoriaFlujoModel> {
        try{
	        let categoriaFlujoModel: CategoriaFlujoModel = Container.get(CategoriaFlujoModel);
            const sqlGetSteps = await this.databaseConnection.getPool();
            const result = await sqlGetSteps.query(`SELECT Id_CategoriaFlujo ,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo where Activo=1`);
            categoriaFlujoModel = Object.assign(categoriaFlujoModel, result.recordset);
        	return categoriaFlujoModel;
        }catch(error){
            return error
        }
    }
}
//const FlujoListDao = new FlujoListDAO()
//export default new FlujoListDAO()