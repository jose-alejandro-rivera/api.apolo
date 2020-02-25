export default class RegistroFotograficoModel {
	
	public Id_RegistroFoto:number
  public CodPaso:number
  public Nombre:string
  public NumOrden:number
  public Fecha:string

	constructor(){
		this.Id_RegistroFoto = 0
		this.CodPaso = 0
		this.Nombre = ''
		this.NumOrden = 0
		this.Fecha = ''

	}
}