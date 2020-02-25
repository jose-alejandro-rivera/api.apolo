import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import RegistroFotograficoDAO  from '../../src/DAO/RegistroFotograficoDAO';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';

// PRUEBAS unit TEST SELECT

test('RegistroFotograficoDAO select correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO: RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodPaso : 8,
    NumOrden : '12342662'
  }
  let dataResponse:any = await registroFotograficoDAO.validarRegistroFotografico(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});


test('RegistroFotograficoDAO  select Error should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO: RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodPaso : 20,
    NumOrden : '1111'
  }
  let dataResponse:any = await registroFotograficoDAO.validarRegistroFotografico(data);
  expect(dataResponse.response == 'TypeError').toBe(true);
})

// PRUEBAS unit TEST INSERT

test('RegistroFotograficoDAO Insert should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:DatabaseConnectionMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO:RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);

  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodPaso: 8,
    Nombre: 'imagen',
    NumOrden: '234558'
  };
  let dataResponse:any = await registroFotograficoDAO.insertarRegistroFotografico(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO Insert correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:DatabaseConnectionMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO:RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);

  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodPaso: 8,
    Nombre: 'imagen',
    NumOrden: '234558'
  };
  let dataResponse:any = await registroFotograficoDAO.insertarRegistroFotografico(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO Insert correct should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO:RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodPaso: 8,
    Nombre: '',
    NumOrden: '234558'
  };
  let dataResponse:any = await registroFotograficoDAO.insertarRegistroFotografico(data);
  expect(dataResponse.response == 'TypeError').toBe(true);
});

// PRUEBAS unit TEST UPDATE

test('RegistroFotograficoDAO update correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:DatabaseConnectionMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO:RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);

  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    Id_RegistroFoto : 1,
    CodPaso: 8,
    Nombre :'imagen',
    NumOrden: '234558'
  };
  let dataResponse:any = await registroFotograficoDAO.actualizarRegistroFotografico(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO update correct should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let registroFotograficoDAO:RegistroFotograficoDAO = Container.get(RegistroFotograficoDAO);

  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    Id_RegistroFoto : 2,
    CodPaso: 8,
    Nombre : 'imagen',
    NumOrden: ''
  };
  let dataResponse:any = await registroFotograficoDAO.actualizarRegistroFotografico(data);
  expect(dataResponse.response == 'TypeError').toBe(true);
});