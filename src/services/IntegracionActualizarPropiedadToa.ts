import axios from 'axios'
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import { Inject, Container } from "typescript-ioc"

export default class IntegracionActualizarPropiedadToa {
  private configIntegraciones:ConfigIntegraciones 
	constructor (@Inject private responseIntegracion:ResponseIntegracion){
    this.configIntegraciones = Container.get(ConfigIntegraciones)
  }

	async actualizarPropiedadToa(activityId:string): Promise<Object> {
		this.responseIntegracion = Container.get(ResponseIntegracion)
    let url = `${this.configIntegraciones.urlToa}/activities/${activityId}`  
    let resp:any|Object = await axios({
      method:'PATCH',
      url,
      data:{"XA_LINEAMIENTO_ACT" : 1},
      auth: {
        username: this.configIntegraciones.usuarioToa,
        password: this.configIntegraciones.contrasena
      }
    })
    this.responseIntegracion.setResponseIntegracion(resp) 
    console.log(resp)
    //console.log(resp.data.links)
		return {}
	}
} 