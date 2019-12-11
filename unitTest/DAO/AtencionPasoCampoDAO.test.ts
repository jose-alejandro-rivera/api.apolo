
import {Container, Scope} from 'typescript-ioc';
import AtencionPasoCampoModels from '../../src/Models/atencionPasoCampoModels';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DataBaseConnectionMock from '../mocks/database/DataBaseConnectionMock';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import { chargeJsonRequest } from '../mocks/chargeJson';

test('createAtencionPasoCampo should return true', async () => {
console.log('Entra al test ----->')
  Container.bind(DatabaseConnection).to(DataBaseConnectionMock).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let obj = chargeJsonRequest('BackAtencionPaso');
 // console.log('obj ------> <<< ', obj);
  let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);

  let database: DataBaseConnectionMock = Container.get(DatabaseConnection);
  database.setProcedureResponse(atencionPasoCampoModels);
  console.log('atencionPasoCampoModels ---> ', atencionPasoCampoModels[0].atencionPaso, atencionPasoCampoModels[0].atencionProceso);
  let data = await atencionDAO.createAtencionPasoCampo(
    atencionPasoCampoModels[0].atencionPaso
  );
 /* let data = await atencionDAO.createAtencionPasoCampo(
    atencionPasoCampoModels[0].atencionPaso, 
    atencionPasoCampoModels[0].atencionProceso, 
    atencionPasoCampoModels[0].atencionProcesoSalida, 
    atencionPasoCampoModels[0].atencionCampo
  ); */
  console.log('----->>>> data ',data)
  expect(data.CodAtencion == 3).toBe(true);
  console.log('Ejecuta todo el test +++++ ----->')
});
