import axios from 'axios'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/responseIntegracion'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionToaConsul implements IntegracionToaInterface {
    private integracionToaResponseModels:IntegracionToaResponseModels
    private configIntegraciones:ConfigIntegraciones

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
    this.integracionToaResponseModels = Container.get(IntegracionToaResponseModels)
    this.configIntegraciones = Container.get(ConfigIntegraciones)
  }

	async serviceIntegrationToa(n_orden_activity:number): Promise<Object> {
    try{
      this.responseIntegracion = Container.get(ResponseIntegracion)
      let url = `${this.configIntegraciones.urlToa}/activities/${n_orden_activity}`
      let resp:any = await axios({
        method:'get',
        url,
        auth: {
          username: this.configIntegraciones.usuarioToa,
          password: this.configIntegraciones.contrasena
        }
      })
      this.responseIntegracion.setResponseIntegracion(resp.data) 
      this.integracionToaResponseModels.responseToa = {
        status: resp.data.status, 
        activityType: resp.data.activityType, 
        statusOrden:'encontrada'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }catch(error){
      this.responseIntegracion.setResponseIntegracion(error) 
      this.integracionToaResponseModels.responseToa = { 
        status: null, 
        activityType: null, 
        statusOrden:'no_encontrada'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }
  }

}