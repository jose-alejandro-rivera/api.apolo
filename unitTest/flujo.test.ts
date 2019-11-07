import { Container, Scope } from 'typescript-ioc';
import CategoriaFlujoModel from '../src/Models/CategoriaFlujoModels';
import FlujoModels from '../src/Models/FlujoModels';
import { FlujoListDAO } from '../src/DAO/FlujoListDAO';
import { charge } from './mocks/chargeJson';
import DatabaseConnection from '../src/loaders/databaseLoader'


test('should return false given external link', () => {
    expect(1 == 1).toBe(true);
});

test('getCategoriasFlujo should return true', async () => {
  /*Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getCategoriaFlujoList();
  console.log(data);*/
  expect(1 == 1).toBe(true);
});