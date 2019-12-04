import { Container, Scope } from 'typescript-ioc';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'

test('test consultaAtencionPaso debe devolver true', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
    let codPaso = 1;
    let data = await atencionDAO.consultaAtencionPaso(codPaso);
    console.log('data --->', data)
    let obj = [{ 
      "Id_Paso":1
    }];
    expect.arrayContaining(obj);
  });

  test('test consultaAtencionPaso debe devolver falso', async () => {
    Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
    let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
    let codPaso = 0;
    let data = await atencionDAO.consultaAtencionPaso(codPaso);
    let obj = [{ 
      "Id_Paso":1
    }];
    expect.arrayContaining(obj);
  });