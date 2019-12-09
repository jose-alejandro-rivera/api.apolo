import { Container, Scope } from 'typescript-ioc';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader';

test('test consultaAtencionPaso debe devolver true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let codPaso = 1;
  let data = await atencionDAO.consultaAtencionPaso(codPaso);
  let obj = [{
    "Id_Paso": 1
  }];
  expect.arrayContaining(obj);
});

test('test consultaAtencionPaso debe devolver falso', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let codPaso = 0;
  let data = await atencionDAO.consultaAtencionPaso(codPaso);
  let obj = [{
    "Id_Paso": 1
  }];
  expect.arrayContaining(obj);
});

test('createAtencion should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let inData = {
    "CodLogin": 1,
    "CodFlujo": 1
  };
  let data = await atencionDAO.createAtencion(inData);
  let last = await atencionDAO.lastAtencion();
  expect(data).toEqual(last);
});

test('ValidateAtencion should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let data = await atencionDAO.validateAtencion(1,1);
  expect(data).toEqual(true);
});

/*test('createAtencion validate response with Id_Atencion should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let inData = {
    "CodLogin": 1,
    "CodFlujo": 1
  };
  let data = await atencionDAO.createAtencion(inData);
  expect(data).toContainEqual(expect.objectContaining({ Id_Atencion: expect.anything() }))
});*/
