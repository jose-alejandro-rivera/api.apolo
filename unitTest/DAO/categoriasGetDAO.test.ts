
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/Loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { chargeJsonResponse, chargeJsonRequest } from '../mocks/chargeJson';
import { FlujoListDAO } from '../../src/DAO/FlujoListDAO';

test('CategoriaGetDAOList should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);

  let objectModel = chargeJsonResponse('categoriasResponseObj');
  database.setProcedureResponse(objectModel, true);
  
  let dataResponse:any = await flujoListDAO.getCategoriaFlujoList();
  expect(dataResponse.recordsets[0].Id_CategoriaFlujo == 1).toBe(true);
});

test('CategoriaGetDAOList should return false', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
    let database: DatabaseConnectionMock = Container.get(DatabaseConnection);
    let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  
    let objectModel = chargeJsonResponse('categoriasResponseObj');
    database.setProcedureResponse(objectModel, true);
    
    let dataResponse:any = await flujoListDAO.getCategoriaFlujoList();
    expect(dataResponse.recordsets[0].NomCategoriaFlujo == 'Fibra').toBe(false);
  });

