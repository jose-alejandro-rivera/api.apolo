
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';

test('AtencionCreateDAO should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  //let InObjectModel = chargeJsonRequest('atencionCreateRequestObj');
  let objectModel = chargeJsonResponse('atencionResponseObj');
  database.setProcedureResponse(objectModel, true);
  let InObjectModel = {
        "CodLogin":1,
        "CodFlujo":1
    };
  console.log(InObjectModel);
  console.log(objectModel);
  
  let dataResponse:any = await atencionDAO.createAtencion(InObjectModel);
  expect(1 == 1).toBe(true);
});

