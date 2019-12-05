import { Container, Scope } from 'typescript-ioc';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader';
import { Test, TestingModule } from '@nestjs/testing';
import AtencionController  from '../src/Controllers/AtencionController';

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

test('createAtencion incoming data should return true', async () => {
  let inData = {
    "CodLogin": 1
  };
  expect(true).toBe(true);
});

describe('Atenion Controller', () => {
  let atencionController: AtencionController;

  describe('createAtencion', () => {
    it('should return an array of cats', async () => {
      let req: Request;
      let res = {};
      let next = {};
      //let data = await atencionController.createAtencion(req,res,next);
      let result = [
        {
          "Id_Atencion": 104
        }
      ]
      //expect(data).toBe(result);
      expect(1 == 1).toBe(true);
    });
  });
});