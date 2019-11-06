/**
 * @category Models
 */
export default class CategoriaFlujoModel {
    public Id_CategoriaFlujo: number;
    public NomCategoriaFlujo: string;
    public Activo:Boolean;
    public Fecha:string;
    public Usuario:string;

    constructor() {
        this.Id_CategoriaFlujo = 0;
        this.NomCategoriaFlujo = '';
        this.Activo = true;
        this.Fecha = '';
        this.Usuario = '';
    }
}