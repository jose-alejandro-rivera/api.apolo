import * as sql from './mssqlMock';
import config from '../../../src/config';
import { Singleton } from 'typescript-ioc';
import LoggerInstance from '../../../src/loaders/loggerLoader';

@Singleton
export default class DatabaseConnectionMock {
    private pool: Promise<sql.ConnectionPool>;

    constructor() {
        LoggerInstance.info('configuración base de datos' + JSON.stringify(config.database));
        this.pool = new Promise(resolve => {
            resolve(new sql.ConnectionPool());
        });
    }

    public getPool() {
        return this.pool;
    }

    public async setProcedureResponse(data: any) {
        (await this.pool).request().resultProcedure.setOutput(data);
    }

    public async setSelect(data: any) {
        (await this.pool).request().resultProcedure.setRecordSet(data);
    }
}