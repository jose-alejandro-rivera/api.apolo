export default class AtencionProcesoModel {

	public CodProceso:number
	public NumOrden:string
	public CodTecnico:number
	public Request:string
	public Response:string
	public Servicio:string
	public Estado:string
	
	constructor(){

		this.CodProceso = 0
		this.NumOrden = ''
		this.CodTecnico = 0
		this.Request = ''
		this.Response = ''
		this.Servicio = ''
		this.Estado = ''

	}

}