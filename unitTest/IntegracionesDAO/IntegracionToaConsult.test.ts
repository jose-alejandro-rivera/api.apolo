import {Container, Scope} from 'typescript-ioc';
import { chargeJsonResponse } from '../mocks/chargeJson';
import IntegracionToaConsult from '../../src/services/IntegracionToaConsult';
import IntegracionToaInterface from '../../src/InterfaceIntegracion/IntegracionToaInterface'
import requests from 'request-promise';
import axios from 'axios'
import ResponseIntegracion from '../../src/ModelsIntegraciones/ResponseIntegracion'
import IntegracionToaResponseModels from '../../src/ModelsIntegraciones/integracionToaResponseModels'


/*
let spyRequest: jest.SpyInstance<Promise<any>>;
    const request = RequestProvider.getInstance();
    const session = 'DuzOuWOc4HY9tMMDbuSf6X-3';
    const serviceTransactional: ITransactional = new CheckWays();
    const dataResponse = objectDataResponse;

    beforeEach(() => {
        process.env.keyEncriptionHeader = 'M33j77EFkujRiZFLy4Mkm6Y40a0feAuXi99552G87ZcuJ4FXmz';
        spyRequest = jest.spyOn( request , 'sendService');
    });
*/

describe('Sent To Confirm Reset Port Transactional Ts', () => {

 let spyRequest: jest.SpyInstance<Promise<any>>;
 jest.mock('axios');
 const integracionToaConsult = Container.get(IntegracionToaConsult);
 const integracionToaResponseModels = Container.get(IntegracionToaResponseModels)
 //const request:IntegracionToaInterface = IntegracionToaConsult();

  beforeEach(() => {
    jest.fn(() => Promise.resolve())
    jest.fn(() => Promise.resolve())
    spyRequest = jest.fn()
    //spyRequest = jest.spyOn(integracionToaConsult , 'serviceIntegrationToa');
    //spyRequest = jest.spyOn(request, 'sendService');
    //authToken = jest.spyOn(AuthToken, 'getHeaderBase64');
  });

  test('Validando SetDocument', () => {
    spyRequest.mockImplementation(() => new Promise((resolve) => {
      resolve({
        data:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1DTDAyX0VudDAxX0luaWNpbyIsImludGVudCI6Ik1DTDAyX1NhbHVkYXIiLCJlbnRpdHkiOiJFbnQwMV9JbmljaW8iLCJ0cmFuc2FjdGlvbmFsIjpmYWxzZSwicHJpb3JpdHkiOjEsImRlc2NyaXB0aW9uIjoiUmVzcHVlcyBkZSBwYXJyaWxsYSBsdmwgMiBwYXJhIGNvbnN1bHRhciBwbGFuZXMgbW92aXN0YXIiLCJyZXNwb25zZSI6W3siY2hhbm5lbCI6IndlYmNoYXQiLCJkYXRhIjp7ImJ1dHRvbiI6W3sidHlwZSI6IkFjdGlvbi5TdWJtaXQiLCJ0aXRsZSI6IkNpZXJyZSBjb250cm9sYWRvIiwiZGF0YSI6eyJpbnRlbnQiOiJNQ0wwNV9Tb2xpY2l0YXJDaWVycmUiLCJlbnRpdHkiOlsiRW50MDJfQ2llcnJlQ29udHJvbGFkbyJdfX0seyJ0eXBlIjoiQWN0aW9uLlN1Ym1pdCIsInRpdGxlIjoiQ29uc3VsdGEgdGlxdWV0ZXMiLCJkYXRhIjp7ImludGVudCI6Ik1DTDA5X0NvbnN1bHRhclRpY2tldHMiLCJlbnRpdHkiOlsiRW50MDFfSGlzdG9yaWFsIl19fSx7InR5cGUiOiJBY3Rpb24uU3VibWl0IiwidGl0bGUiOiJMw61uZWEgcmVzY2F0ZSIsImRhdGEiOnsiaW50ZW50IjoiTUNMMDRfU29saWNpdGFyTFIiLCJlbnRpdHkiOlsiRW50MDJfTGluZWFSZXNjYXRlIl19fSx7InR5cGUiOiJBY3Rpb24uU3VibWl0IiwidGl0bGUiOiJTb3BvcnRlIHTDqWNuaWNvIiwiZGF0YSI6eyJpbnRlbnQiOiJNQ0wwM19Tb2xpY2l0YXJTb3BvcnRlIiwiZW50aXR5IjpbIkVudDAxX1RlY25pY28iXX19XSwiYm9keSI6W3sidHlwZSI6IkNvbnRhaW5lciIsIml0ZW1zIjpbeyJ0eXBlIjoiVGV4dEJsb2NrIiwic2l6ZSI6Ik1lZGl1bSIsIndlaWdodCI6IkxpZ2h0ZXIiLCJ0ZXh0IjoiSG9sYSB7RGV2fSB0ZSBoYWJsYSBCb3RUZWMsIGluZMOtY2FtZSBlbiBxdcOpIHRlIHB1ZWRvIGF5dWRhciIsIndyYXAiOnRydWV9XX1dfX1dLCJvcHRpb25zX21hcHBpbmciOjEsIm9wdGlvbnNfdGVjaG5pY2FsIjp7fSwic3RhdHVzIjp0cnVlLCJfcmlkIjoiQk1sK0FQN3JYeUFaQUFBQUFBQUFBQT09IiwiX3NlbGYiOiJkYnMvQk1sK0FBPT0vY29sbHMvQk1sK0FQN3JYeUE9L2RvY3MvQk1sK0FQN3JYeUFaQUFBQUFBQUFBQT09LyIsIl9ldGFnIjoiXCI1ZDAwNDczMC0wMDAwLTAxMDAtMDAwMC01ZTBiNjQzYjAwMDBcIiIsIl9hdHRhY2htZW50cyI6ImF0dGFjaG1lbnRzLyIsIl90cyI6MTU3NzgwNDg1OSwiaWF0IjoxNTc5MTkyMDEwfQ.UQq7MgLKGEXzvpNPN2SgJ1Ul12L5MAQTby-rbzBh6Mw',
        message: 'data found successfully', status: 200
      });
    }));
    const callback = (response: any) => { 
      console.log(response,'prueba') 
      expect(response).not.toBeNull(); 
    };
    integracionToaConsult.serviceIntegrationToa(13244242424242).then(callback);
  });
});

  /*test('primera prueba de integracion', async() => {
    const toa = [{name: 'Bob'}];
    const resp = {data: toa};
    const resourceId:number = 12
     axios.get.mockImplementationOnce(() => {
      Promise.resolve({
        data: { errors: ['Name is required.', 'Email is required.'] },
        status: 422,
      });
       let integracionToaConsult: IntegracionToaConsult = Container.get(IntegracionToaConsult);
       return integracionToaConsult.serviceIntegrationToa(resourceId).then(data => expect(data).toEqual(resp));


    expect(addStudentForm().instance().state.showModal).toBe(true)
    console.log(addStudentForm().instance().state);*/

      //done(); // <- HERE ->
    //})
    //requests.get.mockResolvedValue(resp);
   // requests.get.mockImplementationOnce(() => Promise.resolve(resp))
   

  //})

//});

/////// PRUEBA UNITARIA UNO ////////////////
/*test('AtencionPasoAtras serviceIntegrationToa() should return true 200 response', async () => {
  let integracionToaConsult: IntegracionToaConsult = Container.get(IntegracionToaConsult);
  let objectModel = chargeJsonResponse('flujosRequestObj');
  let n_orden_activity:any = '8250716'
  let response:any = await integracionToaConsult.serviceIntegrationToa(n_orden_activity);
  //console.log(response)
  expect(response[0].responseToa.statusOrden == 'encontrada').toBe(true);
});

test('AtencionPasoAtras serviceIntegrationToa() should return true 201 response', async () => {
  let integracionToaConsult: IntegracionToaConsult = Container.get(IntegracionToaConsult);
  let objectModel = chargeJsonResponse('flujosRequestObj');
  let n_orden_activity:any = '82507164'
  let response:any = await integracionToaConsult.serviceIntegrationToa(n_orden_activity);
  //console.log(response)
  expect(response[0].responseToa.status == null).toBe(true);
});*/