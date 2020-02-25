
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';
import DatabaseConnectionMockRecordset from '../mocks/database/DatabaseConnectionMockRecordset'
/////// PRUEBA UNITARIA UNO ////////////////
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
/////// PRUEBA UNITARIA DOS ////////////////
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
/////// PRUEBA UNITARIA TRES ////////////////
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

//VALIDA ERROR CATCH
/////// PRUEBA UNITARIA CUATRO ////////////////
test('FlujoListDAOTest select getFlujoList() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 1;
  let dataResponse:any = await flujoListDAO.getFlujoList(idFlujo);
  expect(dataResponse).toEqual("TypeError");
});
/////// PRUEBA UNITARIA CINCO ////////////////
test('FlujoListDAOTest select validateFlujoExist() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMockRecordset).scope(Scope.Local);
  let database: DatabaseConnectionMockRecordset = Container.get(DatabaseConnectionMockRecordset);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('FlujoListRowsAffected');
  database.setProcedureResponses(objectModel);
  let idFlujo = 1;
  let dataResponse:any = await flujoListDAO.validateFlujoExist(idFlujo);
  expect(dataResponse == false).toBe(true);
});

/////// PRUEBA UNITARIA SEIS ////////////////
test('FlujoListDAOTest select validateFlujoExist() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMockRecordset).scope(Scope.Local);
  let database: DatabaseConnectionMockRecordset = Container.get(DatabaseConnectionMockRecordset);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('FlujoListRowsAffected');
  database.setProcedureResponses(objectModel, true);
  let idFlujo = 1;
  let dataResponse:any = await flujoListDAO.validateFlujoExist(idFlujo);
  expect(dataResponse == true).toBe(true);
});

/////// PRUEBA UNITARIA SIETE ////////////////ULTIMO CATCH PARA LA FUNCION
test('FlujoListDAOTest select validateFlujoExist() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnectionCatchMock);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 1;
  let dataResponse:any = await flujoListDAO.validateFlujoExist(idFlujo);
  expect(dataResponse == true).toBe(false);
});
/////// PRUEBA UNITARIA OCHO ////////////////
test('FlujoListDAOTest select getFlujosPorCategoria() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let idFlujo = 1;
  let dataResponse:any = await flujoListDAO.getFlujosPorCategoria(idFlujo);
  expect(dataResponse.response == 'TypeError').toBe(false);
});
/////// PRUEBA UNITARIA NUEVE ////////////////
test('FlujoListDAOTest select getCategoriaFlujoList() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let dataResponse:any = await flujoListDAO.getCategoriaFlujoList();
  expect(dataResponse.response == 'TypeError').toBe(false);
});