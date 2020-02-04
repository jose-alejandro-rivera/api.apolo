import AtencionProcesoModel from '../ModelTableIntegration/AtencionProcesoModel'
import LoguinModel from '../ModelTableIntegration/LoguinModel'

export default interface AtencionProcesoInterface {

	registerAtencionProceso(request:AtencionProcesoModel):Promise<Object>

	registerLoguin(request:LoguinModel):Promise<Object>

	consultLoguin(request:LoguinModel):Promise<Object>
	
}