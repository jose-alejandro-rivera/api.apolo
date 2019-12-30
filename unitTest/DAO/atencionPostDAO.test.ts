
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';

test('AtencionCreateDAO validate Id_Atencion should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let objectModel = chargeJsonResponse('atencionResponseObj');
  database.setProcedureResponse(objectModel, true);
  let InObjectModel = {
        "CodLogin":1,
        "CodFlujo":1
    };
  let dataResponse:any = await atencionDAO.createAtencion(InObjectModel);
  expect(dataResponse.recordsets[0].Id_Atencion == 146).toBe(true);
});

test('AtencionCreateDAO data Incomplete should return false', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let objectModel = chargeJsonResponse('atencionResponseInvalid');
  database.setProcedureResponse(objectModel, true);
  let InObjectModel = {
        "CodLogin":1
    };
  let dataResponse:any = await atencionDAO.createAtencion(InObjectModel);
  expect(dataResponse.recordsets.status == 201).toBe(true);
});

test('AtencionCreateDAO Wrong data should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let objectModel = chargeJsonResponse('atencionResponseError');
  database.setProcedureResponse(objectModel, true);
  let InObjectModel = {
        "CodLogin": 1,
        "CodFlujo":"bhu"
    };
  let dataResponse:any = await atencionDAO.createAtencion(InObjectModel);
  expect(dataResponse.recordsets).toEqual("RequestError");
});