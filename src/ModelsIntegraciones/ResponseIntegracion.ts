
export default class ResponseIntegracion {
	
	private responseIntegracion:Object = {}

	constructor() {
	}

	setResponseIntegracion(response:Object){
		this.responseIntegracion = response
	}

	getResponseIntegracion() {
		return this.responseIntegracion
	}
}