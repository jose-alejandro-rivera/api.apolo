import axios from 'axios'
import requests from 'request-promise'
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
      let resp:any = await requests.get(url,{
        //proxy: 'http://10.200.105.145:80/',
        json: true,
        method: 'GET',
        auth: {
          'user': this.configIntegraciones.usuarioToa,
          'pass': this.configIntegraciones.contrasena
        }
      })
      console.log('--',resp,'--')
      this.responseIntegracion.setResponseIntegracion(resp) 
      this.integracionToaResponseModels.responseToa = {
        status: resp.status, 
        activityType: resp.activityType, 
        statusOrden:'encontrada'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }catch(error){
      this.responseIntegracion.setResponseIntegracion(error) 
      this.integracionToaResponseModels.responseToa = { 
        status: null, 
        activityType: null, 
        statusOrden:'error_request'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }
  }

}