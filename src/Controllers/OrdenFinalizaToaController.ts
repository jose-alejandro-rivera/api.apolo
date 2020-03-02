import{ Inject, Container } from "typescript-ioc"
import ResponseIntegracion from '../ModelsIntegraciones/ResponseIntegracion'
import IntegracionToaResponse from '../ResponseTable/IntegracionToaResponse'
import ToaFactory from '../FactoryApolo/ToaFactory'

export default class OrdenFinalizaToaController {
	private integracionToaResponse:IntegracionToaResponse
	private toaFinaliza:Object|any
	private toaFactory:ToaFactory
	constructor(@Inject private responseIntegracion:ResponseIntegracion) {
		this.integracionToaResponse = Container.get(IntegracionToaResponse)
		this.toaFactory = Container.get(ToaFactory)
	}
	
	async ordenFinalizaToa( request:Object|any ):Promise<Object|any>{
		const { num_orden, tipo_servicio } = request.params 
		this.toaFinaliza = await this.toaFactory.factoryIntegracionToa('finaliza',num_orden)
		if(this.toaFinaliza[0].responseToa.statusOrden =='error_request'){
			let response:Object|any = 
			{ response : { 
					status: null, 
					activityType: null,  
					statusOrden: 'no encontrada', 
					error: 'Bad Request'
				}
			}
			return response
		}
		delete this.toaFinaliza[1].responseIntegracion.XA_REPAIR_INFO
		delete this.toaFinaliza[1].responseIntegracion.XA_TELEPHONE_DATA
		delete this.toaFinaliza[1].responseIntegracion.XA_BROADBAND_DATA
		delete this.toaFinaliza[1].responseIntegracion.XA_TV_DATA
		delete this.toaFinaliza[1].responseIntegracion.XA_EQUIPMENT
		this.integracionToaResponse.response = {
			"activityId": this.toaFinaliza[1].responseIntegracion.activityId,
			"status": this.toaFinaliza[0].responseToa.status,
    	"XA_LINEAMIENTO_ACT": this.toaFinaliza[0].responseToa.XA_LINEAMIENTO_ACT,
    	"statusOrden": this.toaFinaliza[0].responseToa.statusOrden,
    	"response" : JSON.stringify(this.toaFinaliza[1].responseIntegracion),
    	"TipoServicio" : (tipo_servicio == 'rest') ? `rest|${request.method.toLowerCase()}` :'soap',
    	"request": num_orden
		}
		return this.integracionToaResponse
		//Action on past date is not allowed
	}
}