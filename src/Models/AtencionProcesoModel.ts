
export default class AtencionProcesoModel {

	public CodAtencionPaso:number
  public CodProceso:number
  public TipoServicio:string
  public Servicio:string
  public Request:string
  public Response:string

	constructor(){
		this.CodAtencionPaso = 0
		this.CodProceso = 0
		this.TipoServicio = ''
		this.Servicio = ''
		this.Request = ''
		this.Response = ''

	}
}