import axios from 'axios'
import IntegracionToaModels from '../ModelsIntegraciones/integracionToaModels'
import IntegracionToaResponseModels from '../ModelsIntegraciones/integracionToaResponseModels'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'

export default class IntegracionToaConsul {

	constructor(){}

	async getValidateOrden(n_orden_activity:number): Promise<Object> {
    const integracionToaResponseModels:IntegracionToaResponseModels = Container.get(IntegracionToaResponseModels)
    const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
    let url = `${configIntegraciones.urlToa}/activities/${n_orden_activity}`
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    integracionToaResponseModels.responseToa = {status: resp.data.status, activityType: resp.data.activityType, statusOrden:'encontrada'}
    return integracionToaResponseModels
  }

}