import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'

export default interface AtencionProcesoInterface {

	registerAtencionProceso(request:AtencionProcesoModel):Promise<Object>
}