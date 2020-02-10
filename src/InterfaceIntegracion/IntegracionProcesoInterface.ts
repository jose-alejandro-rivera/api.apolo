import ResponseTable from '../ResponseTable/ResponseTable'
export default interface IntegracionProcesoInterface {

	registerAtencionProceso(request:ResponseTable):Promise<ResponseTable>
	
}