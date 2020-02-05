import{ Inject, Container } from "typescript-ioc"
import ToaFactory from '../FactoryApolo/ToaFactory'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'
import IntegracionToaResponse from '../ResponseTable/IntegracionToaResponse'

export default class AutoconfiguracionBATVController {
	private atencionProcesoDao:AtencionProcesoDao
	private toaFactory:ToaFactory
	private registrarToaFactory:RegistrarToaFactory
	private integracionToaResponse:IntegracionToaResponse
	private  atencionPostModels:AtencionProcesoModel

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
		this.atencionProcesoDao = Container.get(AtencionProcesoDao)
		this.toaFactory = Container.get(ToaFactory)
		this.registrarToaFactory = Container.get(RegistrarToaFactory)
		this.integracionToaResponse = Container.get(IntegracionToaResponse)
		this.atencionPostModels = Container.get(AtencionProcesoModel)
	}

	async obtenerConfiguracion(n_orden_activity:number|any, parametroAutoconf:string|any):Promise<Object> {
		let parametroValue:Object|string
		let parametroKey:Object|string
		let resulIdToa:any = await this.atencionProcesoDao.searchIdProcesoToa()
		let toaInfo:any = await this.toaFactory.factoryIntegracionToa('orden',n_orden_activity)
		let insertData = await this.setModelSave(n_orden_activity,parametroAutoconf,resulIdToa.recordset[0].Id_Proceso,toaInfo)
		let reponseSql:any = await this.registrarToaFactory.registraIntegracion('servicioStatus',insertData)

		parametroValue = (parametroAutoconf == 'BA') ? toaInfo[1].responseIntegracion.A_ACS_RESULT_CODE : toaInfo[1].responseIntegracion.A_HC_RESULT_CODE
		parametroKey = (parametroAutoconf == 'BA') ? 'A_ACS_RESULT_CODE' : 'A_HC_RESULT_CODE'

		this.integracionToaResponse.responseToa = {
			activityId : toaInfo[1].responseIntegracion.activityId,
			propiedad_key  : parametroKey,
			propiedad_value : parametroValue
		}

		return this.integracionToaResponse

	}

	async setModelSave(n_orden:string,parametroAutoconf:string,idIntegracionToa:number,response:any): Promise<Object> {
		this.atencionPostModels.CodProceso = idIntegracionToa
		this.atencionPostModels.NumOrden = n_orden 
		this.atencionPostModels.Request = n_orden + '-' + parametroAutoconf
		this.atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		this.atencionPostModels.Estado = 'encontrada' 
		delete response[1].responseIntegracion.XA_REPAIR_INFO
		delete response[1].responseIntegracion.XA_TELEPHONE_DATA
		delete response[1].responseIntegracion.XA_BROADBAND_DATA
		delete response[1].responseIntegracion.XA_TV_DATA
		delete response[1].responseIntegracion.XA_EQUIPMENT
		this.atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return this.atencionPostModels
	}

}