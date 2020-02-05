import{ Inject, Container } from "typescript-ioc"
import ToaFactory from '../FactoryApolo/ToaFactory'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import AtencionProcesoDao from '../DAOIntegracion/AtencionProcesoDao'
import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import RegistrarToaFactory from '../FactoryApolo/RegistrarToaFactory'

export default class AutoconfiguracionBATVController {
	private atencionProcesoDao:AtencionProcesoDao
	private toaFactory:ToaFactory
	private registrarToaFactory:RegistrarToaFactory

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
		this.atencionProcesoDao = Container.get(AtencionProcesoDao)
		this.toaFactory = Container.get(ToaFactory)
		this.registrarToaFactory = Container.get(RegistrarToaFactory)
	}

	async obtenerConfiguracion(n_orden_activity:number|any):Promise<void> {
		let resulIdToa:any = await this.atencionProcesoDao.searchIdProcesoToa()
		console.log(resulIdToa)
		let toaInfo:any = await this.toaFactory.factoryIntegracionToa('orden',n_orden_activity)
		console.log(toaInfo)
		let insertData = await this.setModelSave(n_orden_activity,resulIdToa.recordset[0].Id_Proceso,toaInfo)
		let reponseSql:any = await this.registrarToaFactory.registraIntegracion('servicioStatus',insertData)

	}

	async setModelSave(n_orden:string,idIntegracionToa:number,response:any): Promise<Object> {
		const atencionPostModels:AtencionProcesoModel = Container.get(AtencionProcesoModel)

		atencionPostModels.CodProceso = idIntegracionToa
		atencionPostModels.NumOrden = n_orden
		atencionPostModels.Request = response[1].responseIntegracion.activityId
		atencionPostModels.Servicio = response[1].responseIntegracion.links[0].href
		atencionPostModels.Estado = 'orden_encontrada' 
		delete response[1].responseIntegracion.XA_REPAIR_INFO
		delete response[1].responseIntegracion.XA_TELEPHONE_DATA
		delete response[1].responseIntegracion.XA_BROADBAND_DATA
		delete response[1].responseIntegracion.XA_TV_DATA
		delete response[1].responseIntegracion.XA_EQUIPMENT
		atencionPostModels.Response = JSON.stringify(response[1].responseIntegracion)

		return atencionPostModels

	}

}