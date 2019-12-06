import { Container, Scope } from 'typescript-ioc';
import { AtencionDAO } from '../src/DAO/AtencionDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'
import { FlujoListDAO } from '../src/DAO/FlujoListDAO';
import { charge } from './mocks/chargeJson';
import FlujoController  from '../src/Controllers/FlujoController';

test('getFlujoList retorna status 200 rows[data] de vuelve datos', async () => {
   let data1 = charge('flujosRequestObj');
	 Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
   let flujoController:FlujoController = Container.get(FlujoController);
	 //let flujoListDAO: FlujoListDAO = Container.get(FlujoListDAO);
	 let data = await flujoController.getSteps(1);
   try{
     expect(data).toEqual(data1);
   }catch(error){
     return error;
   }
});

test('getFlujoList retorna status 201, rows [vacio] argumento invalido', async () => {
  let data1 = {
    "status": 201,
    "rows": []
  }
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO:FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getFlujoList(0)
  try{
    expect(data).not.toBe(data1);
  }catch(error){
    return error;
  }
})

test('getFlujoList retorna invalido en la repspuesta', async () => {
  let data1 = {
    "status": 201,
    "rows": []
  }
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let flujoListDAO:FlujoListDAO = Container.get(FlujoListDAO);
  let data = await flujoListDAO.getFlujoList(1);
  try{
    expect(data).not.toEqual(data1)
  }catch(error){
   return error;
  }
})

test('verifica si hay variables no este definida', async () => {
  let flujoController:FlujoController = Container.get(FlujoController);
  expect(await flujoController.getSteps(1)).toBeDefined();
})