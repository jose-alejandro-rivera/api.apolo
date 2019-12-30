
import {Container, Scope} from 'typescript-ioc';
import AtencionPasoCampoModels from '../../src/Models/atencionPasoCampoModels';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DataBaseConnectionMock from '../mocks/database/DataBaseConnectionMock';
import DatabaseConnectionCatchMock from '../mocks/database/DatabaseConnectionCatchMock';

import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';

var idAtnPaso: any;

test('test para consultar createAtencionPasoCampo, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionPasoResponse');
  let obj1 =  { CodPaso: 2 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPasoCampo(obj1);
  expect(data.recordsets[0][0].CodPaso == 2).toBe(true);
});



test('test para consultar createAtencionPasoCampo, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionPasoResponse');
  let obj1 =  { CodPaso: 2 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPasoCampo(obj1);
  expect(data.rowsAffected == 1).toBe(false);
});

//Prueba para que se ejecute el try catch
test('test para consultar createAtencionPasoCampo, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionPasoResponse');
  let obj1 =  { CodPaso: 2 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPasoCampo(obj1);
  expect(data.rowsAffected == 1).toBe(false);
});
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
//Prueba para que se ejecute el try catch
test('test para consultar el Id de una atencion consultaAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaAtencionPaso(obj1);
 // expect(data.recordsets.rowsAffected[0] == 0).toBe(true);
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
//Prueba para que se ejecute el try catch
/*test('test para createAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  let obj1 = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionPaso(obj1);
 // expect(data.recordsets.rowsAffected[0] == 0).toBe(true);
});
test('test para consultaIdAtencionPaso, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaIdAtencionPaso();
  expect(data != 'undefined').toBe(true);
});
test('test para consultaIdAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaIdAtencionPaso();
  expect(data == 12).toBe(false);
});
//Prueba para que se ejecute el try catch
test('test para consultaIdAtencionPaso, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse');
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.consultaIdAtencionPaso();
  expect(data == 12).toBe(false);
});*/
test('test para createAtencionCampo, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdResponse'); //Duda
  database.setProcedureResponse(obj, true);
  let idAtn_Paso = 1;
  let campo = [ { CodCuestionarioCampo: '1', ValorCampo: '1' } ]
  let data = await atencionDAO.createAtencionCampo(campo,idAtn_Paso);
  expect(data.recordsets.rowsAffected[0] == 1).toBe(true);
});
test('test para createAtencionCampo, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  database.setProcedureResponse(obj, true);
  let idAtn_Paso = '';
  let campo = [ { CodCuestionarioCampo: '', ValorCampo: '' } ]
  let data = await atencionDAO.createAtencionCampo(campo,idAtn_Paso);
  expect(data.recordsets.rowsAffected[0] == 1).toBe(false);
}); 
//Prueba para que se ejecute el try catch
test('test para createAtencionCampo, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionIdVacioResponse');
  database.setProcedureResponse(obj, true);
  let idAtn_Paso = '';
  let campo = [ { CodCuestionarioCampo: '', ValorCampo: '' } ]
  let data = await atencionDAO.createAtencionCampo(campo,idAtn_Paso);
  //expect(data.recordsets.rowsAffected[0] == 1).toBe(false);
}); 
test('test para createAtencionProceso, deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoResponse');
  let atencionProceso = [ { CodAtencionPaso : 1,  CodProceso:1, TipoServicio:"rest|get", Servicio:"http://www.google.com", Request:"rest|get", Response:"proceso ejecutado exitosamente" } ];
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProceso(idAtnPaso, atencionProceso, atencionProcesoSalida);
  expect(data.recordsets[0].CodAtencionPaso == 1).toBe(true);
}); 
test('test para createAtencionProceso, deberia devolver un valor false', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  
  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoVacioResponse');
  let atencionProceso = [ { CodAtencionPaso : 1,  CodProceso:1, TipoServicio:"rest|get", Servicio:"http://www.google.com", Request:"rest|get", Response:"proceso ejecutado exitosamente" } ];
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProceso(idAtnPaso, atencionProceso, atencionProcesoSalida);
  expect(data.recordsets[0].CodAtencionPaso == 'Codigo').toBe(false);
});
//Prueba para que se ejecute el try catch
test('test para createAtencionProceso, deberia devolver un valor false', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
    let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoVacioResponse');
  let atencionProceso = [ { CodAtencionPaso : 1,  CodProceso:1, TipoServicio:"rest|get", Servicio:"http://www.google.com", Request:"rest|get", Response:"proceso ejecutado exitosamente" } ];
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso = 1;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProceso(idAtnPaso, atencionProceso, atencionProcesoSalida);
 // expect(data.recordsets[0].CodAtencionPaso == 'Codigo').toBe(false);
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
//Prueba para que se ejecute el try catch
test('test para createAtencionProcesoSalida, deberia devolver un valor falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionCatchMock).scope(Scope.Local);
  let database: DatabaseConnectionCatchMock = Container.get(DatabaseConnection);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let obj = chargeJsonResponse('AtencionProcesoSalidaVacioResponse');
  let atencionProcesoSalida = [ { CodAtencionProceso : 1,  CodProcesoSalida:1, Valor:"proceso ejecutado exitosamente" } ];
  let idAtnPaso =   { Id_AtencionProceso: 1 } ;
  database.setProcedureResponse(obj, true);
  let data = await atencionDAO.createAtencionProcesoSalida(atencionProcesoSalida, idAtnPaso);
 // expect(data.recordsets[0].CodAtencionProceso != "").toBe(false);
}); 