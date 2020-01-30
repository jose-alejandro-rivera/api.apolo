import axios from 'axios'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import IntegracionResponseToaTecnico from '../ModelsIntegraciones/IntegracionResponseToaTecnico'
import ResponseIntegracion from '../ModelsIntegraciones/responseIntegracion'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionToaTecnico implements IntegracionToaInterface {
	constructor(@Inject private responseIntegracion:ResponseIntegracion){}

	async serviceIntegrationToa(resourceId:number):Promise<any> {
    const integracionResponseToaTecnico:IntegracionResponseToaTecnico = Container.get(IntegracionResponseToaTecnico)
    const responseIntegracion:ResponseIntegracion = Container.get(ResponseIntegracion)
    const configIntegraciones = Container.get(ConfigIntegraciones)
		let url = `${configIntegraciones.urlToa}/resources/${resourceId}`
  
    let resp:any = await axios({
      method:'get',
      url,
      auth: {
        username: configIntegraciones.usuarioToa,
        password: configIntegraciones.contrasena
      }
    })
    responseIntegracion.setResponseIntegracion(resp.data)
    integracionResponseToaTecnico.responseToa = {resourceId: resp.data.resourceId, status: resp.data.status, name : resp.data.name}
    
    return [integracionResponseToaTecnico,responseIntegracion]
	}
}