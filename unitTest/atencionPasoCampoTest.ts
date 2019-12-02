import { Container, Scope } from 'typescript-ioc';
import { FlujoListDAO } from '../src/DAO/FlujoListDAO';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'

test('getCategoriasFlujo should return true', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
    let data = await flujoListDAO.getCategoriaFlujoList();
    let obj = [{ 
      "Id_CategoriaFlujo":1,
      "NomCategoriaFlujo":"Instalacion",
      "Activo":true,
      "Fecha": "2019-10-30T10:04:00",
      "Usuario":"soporte"
    }];
    expect.arrayContaining(obj);
  });
