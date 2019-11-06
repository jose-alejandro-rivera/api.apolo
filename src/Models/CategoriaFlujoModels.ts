/**
 * @category Models
 */
export default class CategoriaFlujoModel {
    public Id_CategoriaFlujo: number;
    public NomCategoriaFlujo: string;
    public Activo:number;
    public Fecha:string;
    public Usuario:string;

    constructor() {
        this.Id_CategoriaFlujo = 0;
        this.NomCategoriaFlujo = '';
        this.Activo = 0;
        this.Fecha = '';
        this.Usuario = '';
    }
}