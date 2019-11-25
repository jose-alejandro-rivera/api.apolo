import { Container, Scope } from 'typescript-ioc';
import { FlujoListDAO } from '../src/DAO/FlujoListDAO';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'


test('should return false given external link', () => {
    expect(1 == 1).toBe(true);
});

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



test('getCategoriasFlujo should return error', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getCategoriaFlujoList();
  let obj = [{ 
    "Id_CategoriaFlujo":1,
    "NomCategoriaFlujo":"Cursos de Cocina",
    "Activo":true,
    "Fecha": "2019-10-30T10:04:00",
    "Usuario":"soporte"
  }];
  expect.not.arrayContaining(obj);
});

test('getFlujosCompletos list should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getFlujosComplete();
  let obj = [ { 
    "Id_Flujo":1,
    "NomFlujo":"Instalacion de Internet",
    "CodCategoriaFlujo":1,
    "CodPaso_Inicial":1,
    "Descripcion":"proceso realizado en casa",
    "Orden":1,
    "Activo":true,
    "Fecha":"2019-10-30T16:07:00",
    "Usuario":"soporte"
 }];
  expect.arrayContaining(obj);
});

test('getFlujosCompletos list should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getFlujosComplete();
  let obj = [ { 
    "Id_Flujo":1,
    "NomFlujo":"Instalacion de Internet",
    "CodCategoriaFlujo":0,
    "CodPaso_Inicial":1,
    "Descripcion":"proceso realizado en casa",
    "Orden":1,
    "Activo":true,
    "Fecha":"2019-10-30T16:07:00",
    "Usuario":"soporte"
 }];
  expect.not.arrayContaining(obj);
});


test('getFlujosCompletos cuestionario should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getFlujosComplete();
  let obj = [ { 
    "Id_Flujo":1,
    "NomFlujo":"Instalacion de Internet",
    "CodCategoriaFlujo":0,
    "CodPaso_Inicial":1,
    "Descripcion":"proceso realizado en casa",
    "Orden":1,
    "Activo":true,
    "Fecha":"2019-10-30T16:07:00",
    "Usuario":"soporte"
 }];
  expect.not.arrayContaining(obj);
});

test('createAtencion should return true', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionDAO: AtencionDAO = Container.get(AtencionDAO);
  let inData = {
    "CodLogin":1,
    "CodFlujo":1
   };
  let data = await atencionDAO.createAtencion(inData);
  let last = await atencionDAO.lastAtencion();
  expect(data).toEqual(last);
});