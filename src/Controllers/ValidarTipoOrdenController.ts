import { Container, Inject } from "typescript-ioc"
import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'
import ToaFactory from '../FactoryApolo/ToaFactory'

export default class ValidarTipoOrdenController {
	private toaFactory:ToaFactory
	private responseInsertar:any
	private reponseSql:any
	private reponseSqlTecnico:any
	private n_orden_activity:any

	constructor(){
		this.toaFactory = Container.get(ToaFactory)
	}

	async validarTipoOrdenParametros( request:any|number ):Promise<Object|any> {
		let resultadoEsperado:any|Object
		this.n_orden_activity = request.params.n_orden_activity
		this.reponseSqlTecnico = await this.toaFactory.factoryIntegracionToa('orden', this.n_orden_activity)
		//console.log(this.reponseSqlTecnico[1].responseIntegracion.XA_WORK_TYPE,'???----------->>><<<<<<<<<<<< LBBATV')
		//console.log(this.reponseSqlTecnico)
		if( this.reponseSqlTecnico[1].responseIntegracion.XA_ACCESS_TECHNOLOGY == 'COBRE' ) {
			resultadoEsperado = await this.PropiedadEvaluarCerificacionServicio()
		}else if(this.reponseSqlTecnico[0].responseToa.statusOrden == 'error_request'){
			resultadoEsperado = {
				status : 404,
				result : 'Not_Found',
				A_TOOLBOX_RESULT_VOZ_COD : 'NULL',
				A_ASISTEC_RESULT_CODE : 'NULL',
				A_TOOLBOX_RESULT_TV_COD : 'NULL'
			}
		}else{
			//console.log('------------------reponseSqlTecnico[1].responseIntegracion')
			delete this.reponseSqlTecnico[1].responseIntegracion.XA_REPAIR_INFO
			delete this.reponseSqlTecnico[1].responseIntegracion.XA_TELEPHONE_DATA
			delete this.reponseSqlTecnico[1].responseIntegracion.XA_BROADBAND_DATA
			delete this.reponseSqlTecnico[1].responseIntegracion.XA_TV_DATA
			delete this.reponseSqlTecnico[1].responseIntegracion.XA_EQUIPMENT
			//console.log(this.reponseSqlTecnico[1].responseIntegracion,'reponseSqlTecnico[1].responseIntegracion')
			resultadoEsperado = {
				status : 200,
				result : 'no_encontrada',
				A_TOOLBOX_RESULT_VOZ_COD : 'NULL',
				A_ASISTEC_RESULT_CODE : 'NULL',
				A_TOOLBOX_RESULT_TV_COD : 'NULL',
				request : this.n_orden_activity,
				servicio : this.reponseSqlTecnico[1].responseIntegracion.links[0].href,
				response : JSON.stringify(this.reponseSqlTecnico[1].responseIntegracion)
			}
		}
		return resultadoEsperado
	}

	PropiedadEvaluarCerificacionServicio():Object|any {
		let XA_WORK_TYPE:any|string
		let PropiedadEvaluar:any|string
		let resultado:any|Object
		XA_WORK_TYPE = this.reponseSqlTecnico[1].responseIntegracion.XA_WORK_TYPE
		PropiedadEvaluar = this.reponseSqlTecnico[1].responseIntegracion
		delete PropiedadEvaluar.XA_REPAIR_INFO
		delete PropiedadEvaluar.XA_TELEPHONE_DATA
		delete PropiedadEvaluar.XA_BROADBAND_DATA
		delete PropiedadEvaluar.XA_TV_DATA
		delete PropiedadEvaluar.XA_EQUIPMENT
		//console.log(PropiedadEvaluar,'PropiedadEvaluar')
		//JSON.stringify(response[1].responseIntegracion)
		if( XA_WORK_TYPE.indexOf("LBBATV") > -1 ) {
			//console.log('LBBATV---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LBTV") > -1 ) {
			//console.log('LBTV---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LBBA") > -1 ) {
			//console.log('LBBA---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("BATV") > -1 ) {
			//console.log('BATV---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LB") > -1 ) {
			//console.log('LB---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("BA") > -1 ) {
			//console.log('LB---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("TV") > -1 ) {
			//console.log('TV---><')
			resultado = {
				status : 200,
				result : 'encontrada',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar),
				TipoServicio : 'rest|GET'
			}
			return resultado
		}
	}

}