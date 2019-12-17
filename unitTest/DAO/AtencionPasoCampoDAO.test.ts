
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

test('test para createAtencionCampo, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse'); //Duda
  database.setProcedureResponse(obj, true);
  let idAtn_Paso = 1;
  database.setProcedureResponse(obj, true);
  //let data = await atencionDAO.createAtencionCampo(atencionPasoCampoModels[0].atencionCampo, idAtn_Paso);
  //console.log('consultaIdAtencionPaso -----------++', data)
 // expect(data.recordsets.rowsAffected[0] == 1).toBe(true);
});


test('test para createAtencionProcesoSalida, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoSalidaResponse');
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso =   { Id_AtencionProceso: 1 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProcesoSalida(atencionProcesoSalida, idAtnPaso);
  expect(data.recordsets[0].CodAtencionProceso == 1).toBe(true);
}); 


test('test para createAtencionProcesoSalida, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoSalidaVacioResponse');
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso =   { Id_AtencionProceso: 1 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProcesoSalida(atencionProcesoSalida, idAtnPaso);
  expect(data.recordsets[0].CodAtencionProceso != "").toBe(false);
}); 