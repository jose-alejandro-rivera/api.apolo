import axios from 'axios'
import requests from 'request-promise'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import IntegracionResponseToaTecnico from '../ModelsIntegraciones/IntegracionResponseToaTecnico'
import ResponseIntegracion from '../ModelsIntegraciones/responseIntegracion'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionToaTecnico implements IntegracionToaInterface {
  private integracionResponseToaTecnico:IntegracionResponseToaTecnico
  private configIntegraciones:ConfigIntegraciones
	constructor(@Inject private responseIntegracion:ResponseIntegracion){
    this.integracionResponseToaTecnico = Container.get(IntegracionResponseToaTecnico)
    this.responseIntegracion = Container.get(ResponseIntegracion)
    this.configIntegraciones = Container.get(ConfigIntegraciones)
  }

	async serviceIntegrationToa(resourceId:number):Promise<any> {
    try{
      let url = `${this.configIntegraciones.urlToa}/resources/${resourceId}`
      let resp:any = await requests.get(url,{
        //proxy: 'http://10.200.105.145:80/',
        json: true,
        method: 'GET',
        auth: {
          'user': this.configIntegraciones.usuarioToa,
          'pass': this.configIntegraciones.contrasena
        }
      })
      //console.log(',,',resp,',,')
      this.responseIntegracion.setResponseIntegracion(resp)
      this.integracionResponseToaTecnico.responseToa = {resourceId: resp.resourceId, status: resp.status, name : resp.name}
    
      return [this.integracionResponseToaTecnico,this.responseIntegracion]
    }catch(error){
      this.responseIntegracion.setResponseIntegracion(error) 
      this.integracionResponseToaTecnico.responseToa = { 
        status: null, 
        activityType: null, 
        statusOrden:'error_request'
      }
      return [this.integracionResponseToaTecnico,this.responseIntegracion]
    }
	}
}