import { Container, Scope } from 'typescript-ioc';
import { AtencionPasoCampoDAO } from '../src/DAO/AtencionPasoCampoDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'

test('consultaAtencionPaso debe devolver true', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
    let codPaso = 1;
    let data = await atencionPasoCampoDAO.consultaAtencionPaso(codPaso);
    let obj = [{ 
      "Id_Paso":"1"
    }];
    expect.arrayContaining(obj);
  });
  /*
  test('getCategoriasFlujo should return true', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
    let codPaso = 1;
    let data = await atencionPasoCampoDAO.consultaAtencionPaso(codPaso);
    let obj = [{ 
      "Id_CategoriaFlujo":1,
      "NomCategoriaFlujo":"Instalacion",
      "Activo":true,
      "Fecha": "2019-10-30T10:04:00",
      "Usuario":"soporte"
    }];
    expect.arrayContaining(obj);
  });
*/