import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse } from '../mocks/chargeJson';
import AtencionProcesoDao from '../../src/DAOIntegracion/AtencionProcesoDao';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';
import DatabaseConnectionMockRecordset from '../mocks/database/DatabaseConnectionMockRecordset'

// PRUEBAS unit TEST SELECT

test('RegistroFotograficoDAO select searchIdProcesoToa() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMockRecordset).scope(Scope.Local);
  let database: DatabaseConnectionMockRecordset = Container.get(DatabaseConnectionMockRecordset);
  let atencionProcesoDao: AtencionProcesoDao = Container.get(AtencionProcesoDao);
  let objectModel = chargeJsonResponse('AtencionProcesoResponseIntegracion');
  database.setProcedureResponse(objectModel, true);
  let dataResponse:any = await atencionProcesoDao.searchIdProcesoToa();
  expect(dataResponse.recordset[0].status ==200).toBe(true);
});

test('RegistroFotograficoDAO select validarNumOrden() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionProcesoDao: AtencionProcesoDao = Container.get(AtencionProcesoDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let NumOrden = '834'
  let dataResponse:any = await atencionProcesoDao.validarNumOrden(NumOrden);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO select registerAtencionProceso() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionProcesoDao: AtencionProcesoDao = Container.get(AtencionProcesoDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    CodAtencionPaso : 12,
		CodProceso : 12,
		TipoServicio : 'rest',
		Servicio : 'https://toa/integracion',
		Request : '1234',
		Response : { code: 200, status: 'ok'}
  }
  let dataResponse:any = await atencionProcesoDao.registerAtencionProceso(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO select registerLoguin() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionProcesoDao: AtencionProcesoDao = Container.get(AtencionProcesoDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
    Usuario : 'jonathan pinto',
		ResourceId: '777'
  }
  let dataResponse:any = await atencionProcesoDao.registerLoguin(data);
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

test('RegistroFotograficoDAO select registerLoguin() correct should return true 200 response', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let atencionProcesoDao: AtencionProcesoDao = Container.get(AtencionProcesoDao);
  let objectModel = chargeJsonResponse('responseOKInsert');
  database.setProcedureResponse(objectModel, true);
  let data:Object|any = {
		ResourceId: '777'
  }
  let dataResponse:any = await atencionProcesoDao.consultLoguin(data);
  //console.log(dataResponse,'dataResponse')
  expect(dataResponse.response.recordsets.status ==200).toBe(true);
});

