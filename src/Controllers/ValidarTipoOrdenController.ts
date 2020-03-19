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
		console.log(this.reponseSqlTecnico[1].responseIntegracion.XA_WORK_TYPE,'???----------->>><<<<<<<<<<<< LBBATV')
		console.log(this.reponseSqlTecnico[1])
		if( this.reponseSqlTecnico[1].responseIntegracion.XA_ACCESS_TECHNOLOGY == 'COBRE' ) {
			resultadoEsperado = await this.PropiedadEvaluarCerificacionServicio()
		}else{
			resultadoEsperado = {
				A_TOOLBOX_RESULT_VOZ_COD : 'NULL',
				A_ASISTEC_RESULT_CODE : 'NULL',
				A_TOOLBOX_RESULT_TV_COD : 'NULL'
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
		console.log(PropiedadEvaluar,'PropiedadEvaluar')
		//JSON.stringify(response[1].responseIntegracion)
		if( XA_WORK_TYPE.indexOf("LBBATV") > -1 ) {
			console.log('LBBATV---><')
			resultado = {
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LBTV") > -1 ) {
			console.log('LBTV---><')
			resultado = {
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LBBA") > -1 ) {
			console.log('LBBA---><')
			resultado = {
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("BATV") > -1 ) {
			console.log('BATV---><')
			resultado = {
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				response : JSON.stringify(PropiedadEvaluar),
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("LB") > -1 ) {
			console.log('LB---><')
			resultado = {
				A_TOOLBOX_RESULT_VOZ_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_VOZ_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("BA") > -1 ) {
			console.log('LB---><')
			resultado = {
				A_ASISTEC_RESULT_CODE : (PropiedadEvaluar.A_ASISTEC_RESULT_CODE == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
		if( XA_WORK_TYPE.indexOf("TV") > -1 ) {
			console.log('TV---><')
			resultado = {
				A_TOOLBOX_RESULT_TV_COD : (PropiedadEvaluar.A_TOOLBOX_RESULT_TV_COD == 'OK') ? 'OK' : 'NOK',
				request : this.n_orden_activity,
				servicio : PropiedadEvaluar.links[0].href,
				response : JSON.stringify(PropiedadEvaluar)
			}
			return resultado
		}
	}

}