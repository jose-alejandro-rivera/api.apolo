import { Container, Scope } from 'typescript-ioc';
import { AtencionPasoCampoDAO } from '../src/DAO/AtencionPasoCampoDAO';
import DatabaseConnection from '../src/loaders/databaseLoader'
//test correcto para consultaAtencionPaso para verificar que el id del paso existe
test('test consultaAtencionPaso debe ejecutarse de forma correcta', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionPaso = { CodPaso: 2 };
  let data = await atencionPasoCampoDAO.consultaAtencionPaso(atencionPaso);
  let obj = [{
    "CodPaso": 2
  }];
  expect.arrayContaining(obj);
});
//test erroneo para consultaAtencionPaso para verificar que el id del paso existe
test('test consultaAtencionPaso debe devolver error: codPas Invalid number.', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionPaso = { CodPaso: "" };
  let data = await atencionPasoCampoDAO.consultaAtencionPaso(atencionPaso);
  let obj = [{
    "CodPaso": ""
  }];
  expect.arrayContaining(obj);
});
//test correcto para createAtencionPaso, realiza el insert de los datos enviados en la bd
test('test createAtencionPaso debe realizar el insert de manera correcta', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionPaso = { CodAtencion: "3", CodPaso: "2", Secuencia: 1, Soluciona: 1 };
  let data = await atencionPasoCampoDAO.createAtencionPaso(atencionPaso);
  if (data != '') {
    console.log('Se ha realizado el insert createAtencionPaso()')
  }
  let obj = [{
    "CodAtencion": "3",
    "CodPaso": "2",
    "Secuencia": 1,
    "Soluciona": 1
  }];
  expect.arrayContaining(obj);
});
//test erroneo para createAtencionPaso, no debe realizar el insert a la bd
test('test createAtencionPaso debe dar error al realizar el insert: Datos erroneos ', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionPaso = { CodAtencion: "mmmm", CodPaso: "", Secuencia: 1, Soluciona: 1 };
  let data = await atencionPasoCampoDAO.createAtencionPaso(atencionPaso);
  if (data = 'undefined' || data == '') {
    console.log('Los datos ingresados son erroneos createAtencionPaso()')
  }
  let obj = [{
    "CodAtencion": "mmmm",
    "CodPaso": "",
    "Secuencia": 1,
    "Soluciona": 1
  }];
  expect.arrayContaining(obj);
});
//test correcto para consultaIdAtencionPaso, realiza la consulta de Secuencia y el Id_AtencionPaso
test('test consultaIdAtencionPaso debe realizar la consulta de manera correcta de la Secuencia', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let data = await atencionPasoCampoDAO.consultaIdAtencionPaso();
  if (data != '') {
    console.log('La consulta se ejecuto de manera correcta el metodo consultaIdAtencionPaso()')
  }
});
//test correcto para createAtencionCampo, debe realizar el insert a la bd
test('test createAtencionCampo debe realizar el insert: Datos correctos ', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionCampo = { CodCuestionarioCampo: 1, ValorCampo: 1 };
  let idAtnPaso = 1;
  let data = await atencionPasoCampoDAO.createAtencionCampo(atencionCampo, idAtnPaso);
  if (data != '') {
    console.log('Se ha creado la AtencionCampo createAtencionCampo() ')
  }
  let obj = [{
    "CodCuestionarioCampo": 1,
    "ValorCampo": 1
  }];
  expect.arrayContaining(obj);
});
//test erroneo para createAtencionCampo, no debe realizar el insert a la bd
test('test createAtencionCampo debe realizar el insert: Datos correctos ', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionCampo = { CodCuestionarioCampo: "Colombia es bella", ValorCampo: "Vass Latam" };
  let idAtnPaso = 1;
  let data = await atencionPasoCampoDAO.createAtencionCampo(atencionCampo, idAtnPaso);
  if (data = 'undefined' || data == '') {
    console.log('No se ha creado la AtencionCampo createAtencionCampo() ')
  }
  let obj = [{
    "CodCuestionarioCampo": "Colombia es bella",
    "ValorCampo": "Vass Latam"
  }];
  expect.arrayContaining(obj);
});
//test correcto para createAtencionCampo, debe realizar el insert a la bd
test('test createAtencionProceso debe realizar el insert: Datos correctos ', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnection).scope(Scope.Local);
  let atencionPasoCampoDAO: AtencionPasoCampoDAO = Container.get(AtencionPasoCampoDAO);
  let atencionProceso = { CodAtencionPaso: 1, CodProceso: 1,  TipoServicio: "rest|get", Servicio: "http://www.google.com",  Request: "rest|get", Response: "proceso ejecutado exitosamente" };
  let atencionProcesoSalida = { CodAtencionProceso : 1, CodProcesoSalida :1, Valor:"proceso ejecutado exitosamente" }
  let idAtnPaso = 1;
  let data = await atencionPasoCampoDAO.createAtencionProceso(idAtnPaso, atencionProceso, atencionProcesoSalida);
  if (data != '') {
    console.log('Se ha creado la AtencionCampo createAtencionCampo() ')
  }
  let obj = [ {
    "atencionProceso": {
    "CodAtencionPaso" : 1,
    "CodProceso":1,
    "TipoServicio":"rest|get",
    "Servicio":"http://www.google.com",
    "Request":"rest|get",
    "Response":"proceso ejecutado exitosamente"
  },    
  "atencionProcesoSalida":{
    "CodAtencionProceso" : 1,
    "CodProcesoSalida":1,
    "Valor":"proceso ejecutado exitosamente"
 }
} ];
  expect.arrayContaining(obj);
});



