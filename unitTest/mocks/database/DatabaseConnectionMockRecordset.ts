import * as sql from './mssqlMoksRecordset';
import config from '../../../src/Config';
import { Singleton } from 'typescript-ioc';
import LoggerInstance from '../../../src/Loaders/loggerLoader';

@Singleton

export default class DatabaseConnectionMock {

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

    public async setProcedureResponses(data: any, isRowsAffected: boolean = false) {
        if(!isRowsAffected) {
            (await this.pool).request().resultProcedure.setRecordSet(data);
            (await this.pool).request().resultProcedure.setRowsAffecteds();
        } else {
            (await this.pool).request().resultProcedure.setRecordSet(data);
            (await this.pool).request().resultProcedure.setRowsAffected();
        } 
    }
}