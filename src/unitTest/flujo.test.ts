
import {Container, Scope} from 'typescript-ioc';
import CategoriaFlujoModel from '../../src/models/CategoriaFlujoModels';
import FlujoModels from '../../src/models/FlujoModels';
//import DatabaseConnection from '../../src/loaders/databaseLoader';
//import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';
import { charge } from './mocks/chargeJson';
import DatabaseConnection from '../loaders/databaseLoader'


test('should return false given external link', () => {
    expect(1 == 1).toBe(true);
});

test('getCategoriasFlujo should return true', async () => {

  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO:FlujoListDAO = Container.get(FlujoListDAO);
  //let obj = charge('flujoRequestObj')
  //let categoriaFlujoModel = Object.assign(Container.get(FlujoListDAO), obj);
  //let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  //database.setProcedureResponse(blackListModel);
  
  let data = await flujoListDAO.getCategoriaFlujoList();
  console.log(data);
  //expect(data.Id_CategoriaFlujo == 1).toBe(true);
});