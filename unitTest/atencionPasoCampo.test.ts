import { Container, Scope } from 'typescript-ioc';
import { AtencionPasoCampoDAO } from '../src/DAO/AtencionPasoCampoDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'

test('test consultaAtencionPaso debe devolver true', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
    let codPaso = 1;
    let data = await atencionPasoCampoDAO.consultaAtencionPaso(codPaso);
    console.log('data --->', data)
    let obj = [{ 
      "Id_Paso":1
    }];
    expect.arrayContaining(obj);
  });

  test('test consultaAtencionPaso debe devolver falso', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
    let codPaso = 0;
    let data = await atencionPasoCampoDAO.consultaAtencionPaso(codPaso);
    let obj = [{ 
      "Id_Paso":1
    }];
    expect.arrayContaining(obj);
  });