
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';
import FlujoGetModels from '../../src/models/FlujoGetModels';

test('FlujoListDAOTest should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('flujosRequestObj');
  
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 1;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.recordsets.status ==200).toBe(true);
});


test('FlujoListDAOTest should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');

  database.setProcedureResponse(objectModel, true);
  let idFlujo = 2;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.recordsets.status ==201).toBe(true);
});