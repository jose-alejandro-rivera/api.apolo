
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';

test('FlujoListDAOTest Id_Flujo correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('flujosRequestObj');
  
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 1;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.recordsets.status ==200).toBe(true);
});


test('FlujoListDAOTest Id_Flujo Error should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');

  database.setProcedureResponse(objectModel, true);
  let idFlujo = 2;
  
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse.recordsets.status ==201).toBe(true);
});

test('FlujoDAOTest FlujoList depending category should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('flujoListaRequestObj');
  database.setProcedureResponse(objectModel, true);
  let Id_Categoria = 1;
  let dataResponse:any = await flujoListDAO.getFlujosPorCategoria(Id_Categoria);
  expect(dataResponse.recordsets[0].Id_Flujo == 1).toBe(true);
});