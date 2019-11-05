import { Request, Response, NextFunction } from 'express'
import FlujoModels  from '../models/FlujoModels'
import { Conections } from '../connet'

class FlujoController {
	private flujos:FlujoModels[]
	constructor(){
		this.flujos =[]
	}

	async getFlujo(req:Request, res:Response, next:NextFunction):Promise<void>{
		try{
			const getFlujo = await Conections.getConnection()
			const result = await getFlujo
													.query(`SELECT 
																	p.Id_Paso
																	,p.NomPaso
																	,p.Descripcion
																	,c.NomCuestionario
																	,cc.Orden
																	,case when cc.Obligatorio = 1 then 'true' else 'false' end Obligatorio
																	,ca.NomCampo
																	,ca.tipo
																	,ca.Longitud
																	,cl.Llave
																FROM [dbo].[Paso] AS p
																LEFT JOIN [dbo].[Cuestionario] AS c ON p.CodCuestionario = c.Id_Cuestionario 
																LEFT JOIN  [dbo].[CuestionarioCampo] AS cc ON  c.Id_Cuestionario = cc.CodCuestionario
																LEFT JOIN  [dbo].[Campo] AS ca ON cc.CodCampo = ca.Id_Campo
																LEFT JOIN [dbo].[CampoLista] cl ON ca.Id_Campo = cl.CodCampo`)
			const data:any[] = result.recordset
			console.log(data)
			console.log(result)
			res.send('hello world')
		}catch(error){
			console.log(error)
		}
	}

	getFlujoId(req:Request, res:Response, next:NextFunction):void{

		console.log(req.params.id)
		res.send('hello world ' + req.params.id)
	}

	validate() {
		console.log('ingreso')
    return [ ]
  }

	async createFlujo(req:Request, res:Response, next: NextFunction):Promise<void>{
		try{
			req.checkParams('id', 'el tipo de dato no es valido').notEmpty().isNumeric()
			req.checkBody('NomFlujo', 'campos vacios').notEmpty()
			req.checkBody('CodCategoriaFlujo', 'campos vacios, tipo numerico').notEmpty().isNumeric()
			req.checkBody('CodPaso_Inicial', 'campos vacios, tipo numerico').notEmpty().isNumeric()
      req.checkBody('Descripcion', 'campos vacios').notEmpty().isAlpha()
      req.checkBody('Orden', 'campos vacios, tipo numerico').notEmpty().isNumeric()
      req.checkBody('Activo', 'campos vacios, tipo numerico').notEmpty().isNumeric()
      req.checkBody('Fecha', 'campos vacios').notEmpty().isAlpha()
      req.checkBody('Usuario', 'campos vacios').notEmpty().isAlpha()
			let errors = req.validationErrors();
			if(errors) {
				console.log(errors)
        res.status(422).json({ errors: errors });
        return;
      }
      const { id } = req.params
      const sqlValidate = await Conections.getConnection()
      const result = await sqlValidate.input('Id_Flujo',id)
      										 .query(`SELECT 
      										 					[Id_Flujo]
															      ,[NomFlujo]
															      ,[CodCategoriaFlujo]
															      ,[CodPaso_Inicial]
															      ,[Descripcion]
															      ,[Orden]
															      ,[Activo]
															      ,[Fecha]
															      ,[Usuario]
															     FROM [dbo].[Flujo] WHERE Id_Flujo = @Id_Flujo`)
      console.log(result)
			const { NomFlujo, CodCategoriaFlujo, CodPaso_Inicial, Descripcion, Orden, Activo, Fecha, Usuario } = req.body

			let flujo:FlujoModels = {
				NomFlujo: NomFlujo,
				CodCategoriaFlujo: CodCategoriaFlujo,
				CodPaso_Inicial : CodPaso_Inicial,
				Descripcion : Descripcion,
				Orden : Orden,
				Activo : Activo,
				Fecha : Fecha,
				Usuario : Usuario
			}
			console.log(flujo)
			res.status(201).json({'msg' : 'exitoso'})
			//res.send('flujo guardar')
		}catch(error){
			console.log(error)
		}
	}

	async getSteps(req:Request, res:Response, next:NextFunction):Promise<void>{
		try{
			const sqlGetSteps = await Conections.getConnection()
			const result = await sqlGetSteps
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
			res.status(200).json({data : result.recordset})
		}catch(error){
			console.log(error)
			res.status(500).json({msg : 'hola'})
		}
	}

}

export const flujoController = new FlujoController()
