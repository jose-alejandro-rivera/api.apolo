
import {Container, Scope} from 'typescript-ioc';
import AtencionPasoCampoModels from '../../src/Models/atencionPasoCampoModels';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DataBaseConnectionMock from '../mocks/database/DataBaseConnectionMock';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import { chargeJsonRequest } from '../mocks/chargeJson';

test('test para crear una atención en su metodo createAtencionPasoCampo deberia devolver un valor verdadero', async () => {
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let obj = chargeJsonRequest('BackAtencionPaso');
  let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);

  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  database.setProcedureResponse(atencionPasoCampoModels);
  //console.log('atencionPasoCampoModels ---> ', atencionPasoCampoModels[0].atencionPaso, atencionPasoCampoModels[0].atencionProceso);
  let data = await atencionDAO.createAtencionPasoCampo(atencionPasoCampoModels[0].atencionPaso);
 /* let data = await atencionDAO.createAtencionPasoCampo(
    atencionPasoCampoModels[0].atencionPaso, 
    atencionPasoCampoModels[0].atencionProceso, 
    atencionPasoCampoModels[0].atencionProcesoSalida, 
    atencionPasoCampoModels[0].atencionCampo
  ); */
  expect(data.rowsAffected[0] == 1).toBe(true);
});

test('test erroneo para crear una atención en su metodo createAtencionPasoCampo debería devolver un valor true', async () => {
    Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
    let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
    let obj = chargeJsonRequest('BackAtencionPasoVacio');
    let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);
    let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
    database.setProcedureResponse(atencionPasoCampoModels);
    //console.log('atencionPasoCampoModels ---> ', atencionPasoCampoModels[0].atencionPaso, atencionPasoCampoModels[0].atencionProceso);
    let data = await atencionDAO.createAtencionPasoCampo(atencionPasoCampoModels[0].atencionPaso);
    console.log(data)
    expect(data.rowsAffected == 'TypeError').toBe(true);
  });