import {Container, Scope} from 'typescript-ioc';
import { chargeJsonResponse } from '../mocks/chargeJson';
import IntegracionToaConsult from '../../src/services/IntegracionToaConsult';
import IntegracionToaInterface from '../../src/InterfaceIntegracion/IntegracionToaInterface'
import requests from 'request-promise';
import axios from 'axios'
import ResponseIntegracion from '../../src/ModelsIntegraciones/ResponseIntegracion'
import IntegracionToaResponseModels from '../../src/ModelsIntegraciones/integracionToaResponseModels'
import IntegracionToaModels from '../../src/ModelsIntegraciones/integracionToaModels'

describe('Sent To Confirm Reset Port Transactional Ts', () => {
  //const mockedAxios = mocked(axios, true)
 let spyRequest: jest.SpyInstance<Promise<any>>;
 jest.mock('axios');
 const mockedAxios = axios as jest.Mocked<typeof axios>;
 let spyDerivateIntegracionToaConsult: jest.SpyInstance<Promise<any>>;
 const integracionToaConsult = Container.get(IntegracionToaConsult);
 const integracionToaResponseModels = Container.get(IntegracionToaResponseModels)
 const integracionToaModels = Container.get(IntegracionToaModels)
 //const request:IntegracionToaInterface = IntegracionToaConsult();

  beforeEach(() => {
    integracionToaModels.responseIntegracion = {
      status: 200
    }

    spyRequest = jest.spyOn(integracionToaConsult , 'serviceIntegrationToa');
    //jest.fn(() => Promise.resolve())
    //jest.fn(() => Promise.resolve())
    //spyRequest = jest.fn()
    //spyDerivateIntegracionToaConsult = jest.spyOn(integracionToaModels, 'serviceIntegrationToa');
    //spyRequest = jest.spyOn(integracionToaConsult , 'serviceIntegrationToa');
    //spyRequest = jest.spyOn(integracionToaConsult, 'serviceIntegrationToa');
    //authToken = jest.spyOn(AuthToken, 'getHeaderBase64');
  });

   test('Validando SetDocument', async() => {




    const expectedResult:object|any = { data : 'some data' };

    // set up mock for axios.get
    const mock = jest.spyOn(axios, 'get');
    mock.mockResolvedValue(expectedResult);
    //mock.mockReturnValueOnce(expectedResult);

  

    //const result = await integracionToaConsult.serviceIntegrationToa(55555555)
    expect( integracionToaConsult.serviceIntegrationToa(55555555)).toBeDefined()
  });
  /*  test('Validando SetDocument', async () => {
       const expectedResult:object|any = {data : 'result'};

        // set up mock for axios.get
        const mock = jest.spyOn(axios, 'get');
        mock.mockReturnValueOnce(expectedResult);

        const result = await integracionToaConsult.serviceIntegrationToa(555555555555);
        console.log(result,'ooooooooooooooooooo')
        expect(mock).toHaveBeenCalled();
        expect(result).toBe(expectedResult);
  });

     test('Validando SetDocument', () => {
    const expectedResult:object|any = { data : 'result' };

    // set up mock for axios.get
    const mock = jest.spyOn(axios, 'get');
    //mock.mockReturnValueOnce(expectedResult);

    mock.mockImplementation(() => Promise.resolve(expectedResult));

    /*spyRequest.mockImplementationOnce(() => new Promise((resolve) => {
      resolve({
          data:'result',
          message: 'data found successfully',
          status: 200,
      });
    }));

    return integracionToaConsult.serviceIntegrationToa(55555555).then((data:any) =>{
      console.log(data)
       expect(data.data).toEqual(expectedResult.data)
     });
  });*/
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
