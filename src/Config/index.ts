import * as dotenv from "dotenv";

dotenv.config();
let path;
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
    options : {
      encrypt : false,
      enableArithAbort: true
    },
  },

};

/*

npm config set proxy​ http://fevernova.nh.inet:80 

npm config set http-proxy http://fevernova.nh.inet:80 
npm config set https-proxy http://fevernova.nh.inet:80 

*/