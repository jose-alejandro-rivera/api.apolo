
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';

test('AtencionValidationDAO should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let objectModel = chargeJsonResponse('atencionResponseValidationTrue');
  database.setProcedureResponse(objectModel, true);
  let CodLogin = 1;
  let CodFlujo = 1;
  let dataResponse:any = await atencionDAO.validateAtencion(CodLogin,CodFlujo);
  expect(dataResponse).toBe(true);
});
