import axios from 'axios'
import request from 'request'
import requests from 'request-promise'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import moments  from 'moment'
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'

export default class IntegracionToaService {
  integracionToaModels:IntegracionToaModels
  configIntegraciones:ConfigIntegraciones

	constructor(@Inject private responseIntegracion:ResponseIntegracion){
    this.integracionToaModels = Container.get(IntegracionToaModels)
    this.configIntegraciones = Container.get(ConfigIntegraciones)
  }

	async serviceIntegrationToa(tipo_orden:string,n_orden:string,fechaFin:string,fechaHasta:string): Promise<Object> {
    try{
      this.responseIntegracion = Container.get(ResponseIntegracion)
      let url = `${this.configIntegraciones.urlToa}/activities/custom-actions/search?searchInField=${tipo_orden}&searchForValue=${n_orden}&dateFrom=${fechaHasta}&dateTo=${fechaFin}`
      let resp:any = await requests.get(url,{
        //proxy: 'http://10.200.105.145:80/',
        json: true,
        method: 'GET',
        auth: {
          'user': this.configIntegraciones.usuarioToa,
          'pass': this.configIntegraciones.contrasena
        }
      })
      //console.log('***',resp,'*****')
      this.responseIntegracion.setResponseIntegracion(resp) 
      if(resp.totalResults == 0){
        this.integracionToaModels.responseToa = {status: null, activityType: null, statusOrden:'no encontrada'}
        return [this.integracionToaModels,this.responseIntegracion]
      }
      let n_orden_activity:number = resp.items[0].activityId
      this.integracionToaModels.responseToa = { orden : n_orden_activity, statusOrden:'encontrada' }
      return [this.integracionToaModels,this.responseIntegracion]
    }catch(error){
      this.responseIntegracion.setResponseIntegracion(error) 
      this.integracionToaModels.responseToa = { 
        status: null, 
        activityType: null, 
        statusOrden:'error_request'
      }
      return [this.integracionToaModels,this.responseIntegracion]
    }
   
	}
}