import axios from 'axios'
import ConfigIntegraciones from '../Config/configIntegraciones'
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import { Inject, Container } from "typescript-ioc"

export default class IntegracionActualizarPropiedadToa {

	constructor (@Inject private responseIntegracion:ResponseIntegracion){}

	async actualizarPropiedadToa(activityId:string): Promise<Object> {
    //console.log('activityId',activityId,'activityId')
		const configIntegraciones:ConfigIntegraciones = Container.get(ConfigIntegraciones)
		this.responseIntegracion = Container.get(ResponseIntegracion)
    let url = `${configIntegraciones.urlToa}/activities/${activityId}`  
    /*body:Object|any = {
      "XA_LINEAMIENTO_ACT" : 1
    }*/
    let resp:any|Object = await axios({
      method:'PATCH',
      url,
      data:{"XA_LINEAMIENTO_ACT" : 1},
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    console.log(resp.data.links)
		return {}
	}


} 


 /* The following are all incorrect
      const express = await axios.post(url, stringify(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        })
        const express = await axios({
            url, method: 'post', data: stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }) */