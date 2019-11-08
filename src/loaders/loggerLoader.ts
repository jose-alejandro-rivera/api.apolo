import winston from 'winston';
import config from '../config';
import  appRoot from 'app-root-path'
const transports = [];
if (process.env.NODE_ENV !== 'test') {
  transports.push(
    new winston.transports.File({
      level: 'silly',
      filename: `${appRoot.path}/app.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  )
} else {
    /*transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            )
        })
    )*/
  transports.push(
    new winston.transports.File({
      level: 'silly',
      filename: `${appRoot.path}/app.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  )
}
//console.log('configurado logger', config.logs.level, winston.config.npm.levels);
const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    transports
});
//console.log('configurado logger', LoggerInstance);
export default LoggerInstance;