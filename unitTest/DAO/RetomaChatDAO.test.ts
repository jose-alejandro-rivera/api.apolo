import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { RetomaChatDao }  from '../../src/DAO/RetomaChatDao';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';


// PRUEBAS unit TEST SELECT

test('RegistroFotograficoDAO select retomaChatFlujos() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let retomaChatDao: RetomaChatDao = Container.get(RetomaChatDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    NumOrden : '12342662'
  }
  let dataResponse:any = await retomaChatDao.retomaChatFlujos(data);
  expect(dataResponse.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO select retomachatAtencionPaso() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let retomaChatDao: RetomaChatDao = Container.get(RetomaChatDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodAtencion : '100'
  }
  let dataResponse:any = await retomaChatDao.retomachatAtencionPaso(data);
  expect(dataResponse.recordsets.status ==200).toBe(true);
});

//VALIDA ERROR CATCH

test('RegistroFotograficoDAO select retomaChatFlujos() correct should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let retomaChatDao:RetomaChatDao = Container.get(RetomaChatDao);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    NumOrden : '12342662'
  }
  let dataResponse:any = await retomaChatDao.retomaChatFlujos(data);
  expect(dataResponse.response == 'TypeError').toBe(false);
});

test('RegistroFotograficoDAO select retomaChatFlujos() correct should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let retomaChatDao:RetomaChatDao = Container.get(RetomaChatDao);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    NumOrden : '3435'
  }
  let dataResponse:any = await retomaChatDao.retomachatAtencionPaso(data);
  console.log(dataResponse,'dataResponse')
  expect(dataResponse.response == 'TypeError').toBe(false);
});