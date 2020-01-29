import axios from 'axios'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import moments  from 'moment'
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../Models/ResponseIntegracion'

export default class IntegracionToaService {

	constructor(){
  }

	async serviceIntegrationToa(tipo_orden:string,n_orden:string,fechaFin:string,fechaHasta:string): Promise<Object> {
    const integracionToaModels:IntegracionToaModels = Container.get(IntegracionToaModels)
    const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)

    const responseIntegracion:ResponseIntegracion = Container.get(ResponseIntegracion)
    let url = `${configIntegraciones.urlToa}/activities/custom-actions/search?searchInField=${tipo_orden}&searchForValue=${n_orden}&dateFrom=${fechaHasta}&dateTo=${fechaFin}`
  
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    responseIntegracion.responseIntegracion = resp 
    return resp
    /*if(resp.data.totalResults == 0){
      integracionToaModels.responseToa = {status: null, activityType: null, statusOrden:'no encontrada'}
      return integracionToaModels
    }
    let n_orden_activity:number = resp.data.items[0].activityId
    integracionToaModels.responseToa = { orden : n_orden_activity, statusOrden:'encontrada' }
    return integracionToaModels*/
	}
}