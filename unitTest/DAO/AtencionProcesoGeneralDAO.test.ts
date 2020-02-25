import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import AtencionProcesoGeneralDAO from '../../src/DAOIntegracion/AtencionProcesoGeneralDAO';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';

// PRUEBAS unit TEST SELECT

test('RegistroFotograficoDAO select retomaChatFlujos() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionProcesoGeneralDAO: AtencionProcesoGeneralDAO = Container.get(AtencionProcesoGeneralDAO);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodAtencionPaso : 12,
		CodProceso : 12,
		TipoServicio : 'rest',
		Servicio : 'https://toa/integracion',
		Request : '1234',
		Response : { code: 200, status: 'ok'}
  }
  let dataResponse:any = await atencionProcesoGeneralDAO.registerAtencionProceso(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});