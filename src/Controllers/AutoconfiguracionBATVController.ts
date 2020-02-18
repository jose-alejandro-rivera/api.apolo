import{ Inject, Container } from "typescript-ioc"
import ToaFactory from '../FactoryApolo/ToaFactory'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import AtencionProcesoGeneralDAO from '../DAOIntegracion/AtencionProcesoGeneralDAO'
import AtencionProcesoModel from '../Models/AtencionProcesoModel'
import IntegracionesFactory from '../FactoryApolo/IntegracionesFactory'
import IntegracionToaResponse from '../ResponseTable/IntegracionToaResponse'

export default class AutoconfiguracionBATVController {
	private atencionProcesoDao:AtencionProcesoGeneralDAO
	private toaFactory:ToaFactory
	private registrarToaFactory:IntegracionesFactory
	private integracionToaResponse:IntegracionToaResponse
	private atencionPostModels:AtencionProcesoModel
	private toaInfo:Object|any

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
		this.atencionProcesoDao = Container.get(AtencionProcesoGeneralDAO)
		this.toaFactory = Container.get(ToaFactory)
		this.registrarToaFactory = Container.get(IntegracionesFactory)
		this.integracionToaResponse = Container.get(IntegracionToaResponse)
		this.atencionPostModels = Container.get(AtencionProcesoModel)
	}

	async obtenerConfiguracion(request:Object|any):Promise<Object> {
		const { n_orden_activity, parametro_config } = request.params
		let parametroValue:Object|string
		let parametroKey:Object|string
		let label:string

		this.toaInfo = await this.toaFactory.factoryIntegracionToa('orden',n_orden_activity)
		label = (parametro_config == 'BA') ? 'Autoconfiguración BA' : 'Activación TV'
		if(this.toaInfo[0].responseToa.statusOrden == 'error_request') {
			await this.setResponse('','',label)
			return this.integracionToaResponse
		}
		if(this.toaInfo[0].responseToa.statusOrden == 'no_encontrada') {
			await this.setResponse('','',label)
			return this.integracionToaResponse
		}
		let insertData:Object|any = await this.setModelSave(request,this.toaInfo)

		parametroValue = (parametro_config == 'BA') ? this.toaInfo[1].responseIntegracion.A_ACS_RESULT_CODE : this.toaInfo[1].responseIntegracion.A_HC_RESULT_CODE
		parametroKey = (parametro_config == 'BA') ? 'A_ACS_RESULT_CODE' : 'A_HC_RESULT_CODE'
		await this.setResponse(parametroValue,parametroKey,label)
		return this.integracionToaResponse
	}
	/**
		Respuesta servio Toa autoconfiguración TV BA
	**/
	async setModelSave(request:Object|any,response:any): Promise<Object> {
		const { rest, n_orden_activity, parametro_config } = request.params
		this.atencionPostModels.TipoServicio = (rest == 'rest') ? `rest|${request.method.toLowerCase()}` :'soap'
		this.atencionPostModels.Request = n_orden_activity + '|' + parametro_config
		this.atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		delete response[1].responseIntegracion.XA_REPAIR_INFO
		delete response[1].responseIntegracion.XA_TELEPHONE_DATA
		delete response[1].responseIntegracion.XA_BROADBAND_DATA
		delete response[1].responseIntegracion.XA_TV_DATA
		delete response[1].responseIntegracion.XA_EQUIPMENT
		this.atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return this.atencionPostModels
	}

	async setResponse(parametroKey:string|any = '', parametroValue:string|any = '', label:string|any = ''): Promise<void>{
		this.integracionToaResponse.response = {
			statusOrden : (this.toaInfo[0].responseToa.statusOrden=='encontrada') ? 'encontrada' : 'no encontrada',
			//statusOrden : this.toaInfo[0].responseToa.statusOrden,
			activityId : this.toaInfo[0].responseToa.activityId,
			propiedad_key  : (parametroKey=='') ? 'NULL' : parametroKey,
			propiedad_value : (parametroValue=='') ? 'NULL' : parametroValue,
			label: (label=='') ? 'NULL' : label, 
			response : (this.atencionPostModels.Response) ? this.atencionPostModels.Response : 'NULL', 
			request : (this.atencionPostModels.Request) ? this.atencionPostModels.Request : 'NULL',
			Servicio : (this.atencionPostModels.Servicio) ? this.atencionPostModels.Servicio : 'NULL',
			TipoServicio : (this.atencionPostModels.TipoServicio) ? this.atencionPostModels.TipoServicio : 'NULL',
			error : (this.atencionPostModels.Response) ? 'NULL' : 'Bad Request'
		}
	}

}