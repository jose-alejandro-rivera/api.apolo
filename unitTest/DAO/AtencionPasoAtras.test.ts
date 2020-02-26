import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';
import DatabaseConnectionMockRecordset from '../mocks/database/DatabaseConnectionMockRecordset'

/////// PRUEBA UNITARIA UNO ////////////////
test('AtencionPasoAtras select atencionPasoAtras() should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let objectModel = chargeJsonResponse('flujosRequestObj');
  database.setProcedureResponse(objectModel, true);
  let idAtencion:any = 1 
  let idPaso:any = 2
  let dataResponse:any = await atencionDAO.atencionPasoAtras(idAtencion,idPaso);
  expect(dataResponse.recordsets.status ==200).toBe(true);
});
/////// PRUEBA UNITARIA UNO ////////////////
test('AtencionPasoAtras select atencionPasoAtras() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let idAtencion:any = 1 
  let idPaso:any = 2
  let dataResponse:any = await atencionDAO.atencionPasoAtras(idAtencion,idPaso);
  expect(dataResponse == 'TypeError').toBe(false);
});

/////// PRUEBA UNITARIA UNO ////////////////
test('AtencionPasoAtras select ultimoAtencionPaso() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, true);
  let CodAtencion:number = 1 
  let dataResponse:any = await atencionDAO.ultimoAtencionPaso(CodAtencion);
  expect(dataResponse == 'TypeError').toBe(false);
});

/////// PRUEBA UNITARIA UNO ////////////////
test('AtencionPasoAtras select createAtencionProcesoSalida() should return true 201 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let objectModel = chargeJsonResponse('flujosRequestInvalid');
  database.setProcedureResponse(objectModel, false);
  let atencionProcesoSalida:any = 12
	let result: any = 2
  let dataResponse:any = await atencionDAO.createAtencionProcesoSalida(atencionProcesoSalida,result);
  expect(dataResponse == 'TypeError').toBe(false);
});
