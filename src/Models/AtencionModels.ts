/**
 * @category Models
 */
export default class AtencionFlujo {
    public Id_Atencion: number;
    public CodLogin: number;
    public CodFlujo: number;
    public Fecha:string;

    constructor() {
        this.Id_Atencion = 0;
        this.CodLogin = 0;
        this.CodFlujo = 0;
        this.Fecha = '';
    }
}