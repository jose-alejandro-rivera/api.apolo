import axios from 'axios'
import requests from 'request-promise'
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionActualizarPropiedadToa implements IntegracionToaInterface{
  private configIntegraciones:ConfigIntegraciones 
  private integracionToaResponseModels:IntegracionToaResponseModels
	constructor (@Inject private responseIntegracion:ResponseIntegracion){
    this.configIntegraciones = Container.get(ConfigIntegraciones)
    this.responseIntegracion = Container.get(ResponseIntegracion)
    this.integracionToaResponseModels = Container.get(IntegracionToaResponseModels)

  }

	async serviceIntegrationToa(activityId:string): Promise<Object> {
		try{
      let url = `${this.configIntegraciones.urlToa}/activities/${activityId}`  
      let resp:any = await requests.patch(url,{
        //proxy: 'http://10.200.105.145:80/',
        body:{
          "XA_LINEAMIENTO_ACT" : 1
        },
        json: true,
        method: 'PATCH',
        auth: {
          'user': this.configIntegraciones.usuarioToa,
          'pass': this.configIntegraciones.contrasena
        }
      })
      this.responseIntegracion.responseIntegracion = resp 
      if(!resp.XA_LINEAMIENTO_ACT || resp.XA_LINEAMIENTO_ACT!=1){ //|| 
        //TENER EN CUNETA LA PROPIEDDAD AUN NO EXISTE EN ALGUNAS ORDENES
        this.integracionToaResponseModels.responseToa = {status: 300, XA_LINEAMIENTO_ACT: null, statusOrden:'error_request'}
        return [this.integracionToaResponseModels,this.responseIntegracion]
      }
      this.integracionToaResponseModels.responseToa = {
        status: 200, 
        XA_LINEAMIENTO_ACT: resp.XA_LINEAMIENTO_ACT, 
        statusOrden:'actulizada'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }catch(error){
      this.responseIntegracion.responseIntegracion = error 
      this.integracionToaResponseModels.responseToa = { 
        status: 404, 
        activityType: null, 
        statusOrden:'error_request'
      }
      return [this.integracionToaResponseModels,this.responseIntegracion]
    }
	}
} 