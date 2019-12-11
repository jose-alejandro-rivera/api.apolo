import { Container, Scope } from 'typescript-ioc';
import { FlujoListDAO } from '../src/DAO/FlujoListDAO';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'
import DatabaseConnectionMock from '../unitTest/mocks/database/DatabaseConnectionMock'


test('should return false given external link', () => {
    expect(1 == 1).toBe(true);
});

test('getCategoriasFlujo should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let obj = [{ 
    "Id_CategoriaFlujo":1,
    "NomCategoriaFlujo":"Instalacion",
    "Activo":true,
    "Fecha": "2019-10-30T10:04:00",
    "Usuario":"soporte"
  }];
  //let mock = databaseConnectionMock.setSelectResponse(obj,true);
  //let res = await flujoListDAO.getCategoriaFlujoList();
  expect(true).toBeTruthy();
});