import axios from 'axios'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc";

export default class IntegracionToaConsul {
	constructor(){}

	async getValidateOrden(n_orden_activity:number): Promise<Object> {
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
    integracionToaResponseModels.status = resp.data.status
    integracionToaResponseModels.activityType = resp.data.activityType

    return integracionToaResponseModels
  }

}