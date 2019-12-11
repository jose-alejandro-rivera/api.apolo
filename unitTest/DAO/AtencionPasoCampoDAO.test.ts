
import {Container, Scope} from 'typescript-ioc';
import AtencionPasoCampoModels from '../../src/Models/atencionPasoCampoModels';
import DatabaseConnection from '../../src/loaders/databaseLoader';
import DataBaseConnectionMocks from '../mocks/database/DataBaseConnectionMocks';
import { AtencionDAO } from '../../src/DAO/AtencionDAO';
import { chargeJsonRequest } from '../mocks/chargeJson';

test('getBlackListTest should return true', async () => {
console.log('Entra al test ----->')
  Container.bind(DatabaseConnection).to(DataBaseConnectionMocks).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);

  let obj = chargeJsonRequest('BackAtencionPaso');
  console.log('obj ------> <<< ', obj);
  let atencionPasoCampoModels = Object.assign(Container.get(AtencionPasoCampoModels), obj);

  let database: DataBaseConnectionMocks = Container.get(DatabaseConnection);
  database.setProcedureResponse(atencionPasoCampoModels);
  
 // let data = await atencionDAO.createAtencionPasoCampo(atencionPasoCampoModels);
//  expect(data.CodAtencion == 3).toBe(true);
  console.log('Ejecuta todo el test +++++ ----->')
});
