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
 let spyRequest: jest.SpyInstance<Promise<any>>;
 jest.mock('axios');
 let mockedAxios:any 
 let integracionToaConsult = Container.get(IntegracionToaConsult);
 let integracionToaResponseModels:IntegracionToaResponseModels
 const integracionToaModels = Container.get(IntegracionToaModels)

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    integracionToaResponseModels = Container.get(IntegracionToaResponseModels)
    integracionToaModels.responseIntegracion = {
      status: 200
    }

    spyRequest = jest.spyOn(integracionToaConsult , 'serviceIntegrationToa');
  });

   test('Validando SetDocument', async() => {
    const expectedResult:object|any = { data : 'some data' };
    const mock = jest.spyOn(axios, 'get');
    mock.mockResolvedValue(expectedResult);
    expect( integracionToaConsult.serviceIntegrationToa(55555555)).toBeDefined()
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
