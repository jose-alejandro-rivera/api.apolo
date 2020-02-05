import axios from "axios"
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'

export default class IntegracionAutoconfiguracionBATV {
	//@Inject private responseIntegracion:ResponseIntegracion
	constructor(){}

	async obtenerAutoconfiguracionBATV(activityId:any|number):Promise<Object> {
	/*	const integracionToaModels:IntegracionToaModels = Container.get(IntegracionToaModels)
		const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
		let url = `${configIntegraciones.urlToa}/activities/${activityId}`
		let response: any|Object = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    this.responseIntegracion.setResponseIntegracion(response) 
    if(response.data.totalResults == 0){
      integracionToaModels.responseToa = {status: null, activityType: null, statusOrden:'no encontrada'}
      return [integracionToaModels,this.responseIntegracion]
    }
    let n_orden_activity:number = response.data.items[0].activityId
    integracionToaModels.responseToa = { orden : n_orden_activity, statusOrden:'encontrada' }
    return [integracionToaModels,this.responseIntegracion]*/
    return {}
	}
}