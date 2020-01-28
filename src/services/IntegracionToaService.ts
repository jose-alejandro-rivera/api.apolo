import axios from 'axios'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import moments  from 'moment'
import ConfigIntegraciones from '../Config/configIntegraciones'

export default class IntegracionToaService {

	constructor(){}

	async serviceIntegrationToa(tipo_orden:string,n_orden:string,fechaFin:string,fechaHasta:string): Promise<Object> {
    const integracionToaModels:IntegracionToaModels = Container.get(IntegracionToaModels)
    const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
    let url = `${configIntegraciones.urlToa}/activities/custom-actions/search?searchInField=${tipo_orden}&searchForValue=${n_orden}&dateFrom=${fechaHasta}&dateTo=${fechaFin}`
  
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })

    if(resp.data.totalResults == 0){
      integracionToaModels.responseToa = {status: null, activityType: null, statusOrden:'no encontrada'}
      return integracionToaModels
    }
    let n_orden_activity:number = resp.data.items[0].activityId
    integracionToaModels.responseToa = { orden : n_orden_activity, statusOrden:'encontrada' }
    return integracionToaModels
	}

  async getActivityOrden(n_orden_activity:number): Promise<Object> {
    let integracionToaResponseModels:IntegracionToaResponseModels = Container.get(IntegracionToaResponseModels)
    let url = `https://api.etadirect.com/rest/ofscCore/v1/activities/${n_orden_activity}`
    console.log(url)
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: 'h7qcmg5eueyozuhlghrfoksj@telefonica-co.test',
        password: '1352b929a56b56ded8976a9dc41727b2b418de8d419ab6ce60f0a71284e05290',
      }
    })
    integracionToaResponseModels.responseToa = {status: resp.data.status, activityType: resp.data.activityType, statusOrden:'encontrada'}
    //integracionToaResponseModels.status = resp.data.status
    //integracionToaResponseModels.activityType = resp.data.activityType

    return integracionToaResponseModels
  }
}