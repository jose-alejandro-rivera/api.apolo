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
	private  atencionPostModels:AtencionProcesoModel

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
		let toaInfo:any = await this.toaFactory.factoryIntegracionToa('orden',n_orden_activity)
		/*if(toaInfo.responseToa) {

		}*/
		let insertData:Object|any = await this.setModelSave(request,toaInfo)

		parametroValue = (parametro_config == 'BA') ? toaInfo[1].responseIntegracion.A_ACS_RESULT_CODE : toaInfo[1].responseIntegracion.A_HC_RESULT_CODE
		parametroKey = (parametro_config == 'BA') ? 'A_ACS_RESULT_CODE' : 'A_HC_RESULT_CODE'
		this.integracionToaResponse.responseToa = {
			activityId : toaInfo[1].responseIntegracion.activityId,
			propiedad_key  : parametroKey,
			propiedad_value : parametroValue,
			response : insertData.Response, 
			request : insertData.Request,
			Servicio : insertData.Servicio,
			TipoServicio : insertData.TipoServicio
		}

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

}