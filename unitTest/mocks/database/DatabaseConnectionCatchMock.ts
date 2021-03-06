import * as sql from './mssqlCatchMoks';
import config from '../../../src/Config';
import { Singleton } from 'typescript-ioc';
import LoggerInstance from '../../../src/Loaders/loggerLoader';

@Singleton

export default class DatabaseConnectionCatchMock {

    private pool: Promise<sql.ConnectionPool>;

    constructor() {
        //LoggerInstance.info('configuración base de datos' + JSON.stringify(config.database));
        this.pool = new Promise(resolve => {
            resolve(new sql.ConnectionPool());
        });
    }

    public getPool() {
        return this.pool;
    }

    public async setProcedureResponse(data: any, isRecorset: boolean = false) {
        if(!isRecorset) {
            (await this.pool).request().resultProcedure.setOutput(data);
        } else {
            (await this.pool).request().resultProcedure.setRecordSet(data);
        }
    }
}