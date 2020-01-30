import axios from 'axios'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/responseIntegracion'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionToaConsul implements IntegracionToaInterface {

	constructor(@Inject private responseIntegracion:ResponseIntegracion){}

	async serviceIntegrationToa(n_orden_activity:number): Promise<Object> {
    const integracionToaResponseModels:IntegracionToaResponseModels = Container.get(IntegracionToaResponseModels)
    const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
    this.responseIntegracion = Container.get(ResponseIntegracion)
    //https://api.etadirect.com/rest/ofscCore/v1/activities/
    let url = `${configIntegraciones.urlToa}/activities/${n_orden_activity}`
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    this.responseIntegracion.setResponseIntegracion(resp.data) 
    integracionToaResponseModels.responseToa = {status: resp.data.status, activityType: resp.data.activityType, statusOrden:'encontrada'}
    return [integracionToaResponseModels,this.responseIntegracion]
  }

}