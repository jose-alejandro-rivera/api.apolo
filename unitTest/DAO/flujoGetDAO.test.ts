
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';
import  FlujoGetModels from '../../src/Models/FlujoGetModels'

test('Listado de flujos pasos, procesos retorna true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestObj');
 
  let flujoGetModels = Object.assign(Container.get(FlujoGetModels), objectModel);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  
  database.setProcedureResponse(flujoGetModels, true);
  let idFlujo = 1;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.rowsAffected == 1).toBe(true);
});

/*

test('Listado de flujos pasos, procesos retorna false', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestObj');
  
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 0;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.rowsAffected == 1).toBe(false);
});*/