
import {Container, Scope} from 'typescript-ioc';
import AtencionPasoCampoModels from '../../src/Models/atencionPasoCampoModels';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DataBaseConnectionMock from '../mocks/database/DataBaseConnectionMock';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';

var idAtnPaso: any;

test('test para consultar el Id de una atencion consultaAtencionPaso, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaAtencionPaso(obj1);
  expect(data.recordsets.rowsAffected[0] == 1).toBe(true);
});
test('test para consultar el Id de una atencion consultaAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaAtencionPaso(obj1);
  expect(data.recordsets.rowsAffected[0] == 0).toBe(true);
});

test('test para createAtencionPaso, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPaso(obj1);
  expect(data.recordsets.rowsAffected[0] == 1).toBe(true);
});
test('test para createAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPaso(obj1);
  expect(data.recordsets.rowsAffected[0] == 0).toBe(true);
});
test('test para consultar el Id de una atencion consultaIdAtencionPaso, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  let idAtn_Paso = 1;
  database.setProcedureResponse(obj, true);
  //let data = await atencionDAO.createAtencionCampo(atencionPasoCampoModels[0].atencionCampo, idAtn_Paso);
  //console.log('consultaIdAtencionPaso -----------++', data)
 // expect(data.recordsets.rowsAffected[0] == 1).toBe(true);
});

 /*
test('test erroneo para crear una atención en su metodo createAtencionPasoCampo debería devolver un valor false', async () => {
    Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
    let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
    let obj = chargeJsonRequest('BackAtencionPasoVacio');
    let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);
    let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
    database.setProcedureResponse(atencionPasoCampoModels);
    let data = await atencionDAO.createAtencionPasoCampo(atencionPasoCampoModels[0].atencionPaso);
    expect(data.rowsAffected[0] == 1).toBe(false);
  });
 
  test('test para crear una atención en su metodo createAtencionCampo debería devolver un valor verdadero +++++', async () => {
    Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
    let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
    let obj = chargeJsonRequest('BackAtencionPaso');
    let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);
    let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
    database.setProcedureResponse(atencionPasoCampoModels);
    let idAtn_Paso = idAtnPaso.recordset[0].Id_AtencionPaso;
    let data = await atencionDAO.createAtencionCampo(atencionPasoCampoModels[0].atencionCampo, idAtn_Paso);
    console.log('data  ---->>> ', data)
    expect(data.rowsAffected[0] == 1).toBe(true);
  }); */
