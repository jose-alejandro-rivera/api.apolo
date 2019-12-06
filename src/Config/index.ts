import * as dotenv from "dotenv";

dotenv.config();
let path;
//console.log('directorio raíz de los ambientes', __dirname, process.env.NODE_ENV + "--");
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/environments/test.env`;
    break;
  case "production":
    path = `${__dirname}/environments/prod.env`;
    break;
  default:
    path = `${__dirname}/environments/dev.env`;
}
dotenv.config({ path: path });

export default {
  /**
   * ID de la aplicación
   */
  environment: process.env.ENVIRONMENT || 'production',
  tokenSecret: process.env.SECURITY_SECRET || '',
  jwt: {
    secret: process.env.SECURITY_JWT_SECRET || '',
    time: process.env.SECURITY_JWT_TIME || 20
  },
  appId: process.env.APP_ID,
  logs: {
    level: process.env.LOG_LEVEL,
  },

  database: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    port: Number.parseInt(process.env.DB_PORT || '') || 0,
    parseJSON: true,
  },

  serviceHeader: {
    country: 'co',
    lang: 'es',
    system: 'USSD',
    subsystem: 'USSD',
    originator: 'co:es:TEF: USSD:USSD',
    userId: '22',
    operation: '',
    destination: 'co:es:TEF: USSD:USSD',
    execId: '84f4bb9c-2b61-47bd-98d0-8a2c8ccab306',
    timestamp: '2017-09-03T19:28:50.355-05:00'
  },

  serviceHostData:  {
    host: process.env.SERVICE_HOST_VALIDATE_EMPLOYEE || '',
    port: Number.parseInt(process.env.SERVICE_PORT_VALIDATE_EMPLOYEE || '') || 0
  },

  serviceCCAHostData: {
    host: process.env.SERVICE_HOST_VALIDATE_USER_CCA || '',
    soapAction: 'http://TMC.Servicios.SELU/ClienteSELU/IClienteSELU/EnvioSMS',
    encoding: 'gzip,deflate',
    contentType: 'text/xml;charset=UTF-8'
  },

  serviceSendSMSHostData: {
    host: process.env.SERVICE_HOST_SEND_SMS || '',
    soapAction: 'http://TMC.Servicios.SELU/ClienteSELU/IClienteSELU/EnvioSMS',
    encoding: 'gzip,deflate',
    contentType: 'text/xml;charset=UTF-8'
  },

  validateEmployeUri: '/globalIntegration/services/EmbeddedActions/ValidateEmployee_v1',
  consultarVendedorUri: '/WSCCA/ServiciosEntidadesHost/ServicioCanalVenta.svc',
  sendSMSUri: '/TMC.Servicios.SELU/SELU.svc'

};