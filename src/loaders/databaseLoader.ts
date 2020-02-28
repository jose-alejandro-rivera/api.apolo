import * as sql from 'mssql';
import LoggerInstance from './loggerLoader';
import { Singleton } from 'typescript-ioc';
import config from '../Config';
/**
 * @category Database
 */
@Singleton
export default class DatabaseConnection {
    private pool: Promise<sql.ConnectionPool>;
    constructor() {
        LoggerInstance.info('configuración base de datos' + JSON.stringify(config.database));
        this.pool = new sql.ConnectionPool(config.database).connect().then(pool => {
            LoggerInstance.info('Connected to MSSQL');
            return pool;
        }).catch(err => {
            LoggerInstance.error('Database Connection Failed! Bad Config: ', err);
            throw 'No hay conexión a la BD!!';
        });
    }
    public getPool() {
        return this.pool;
    }
}