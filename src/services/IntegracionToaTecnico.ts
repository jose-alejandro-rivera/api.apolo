import axios from 'axios'
import { Inject, Container } from "typescript-ioc"
import ConfigIntegraciones from '../Config/configIntegraciones'
import IntegracionResponseToaTecnico from '../ModelsIntegraciones/IntegracionResponseToaTecnico'
import ResponseIntegracion from '../ModelsIntegraciones/responseIntegracion'
import IntegracionToaInterface from '../InterfaceIntegracion/IntegracionToaInterface'

export default class IntegracionToaTecnico implements IntegracionToaInterface {
  private integracionResponseToaTecnico:IntegracionResponseToaTecnico
	constructor(@Inject private responseIntegracion:ResponseIntegracion){
    this.integracionResponseToaTecnico = Container.get(IntegracionResponseToaTecnico)
    this.responseIntegracion = Container.get(ResponseIntegracion)
  }

	async serviceIntegrationToa(resourceId:number):Promise<any> {
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
    this.responseIntegracion.setResponseIntegracion(resp.data)
    this.integracionResponseToaTecnico.responseToa = {resourceId: resp.data.resourceId, status: resp.data.status, name : resp.data.name}
    
    return [this.integracionResponseToaTecnico,this.responseIntegracion]
	}
}