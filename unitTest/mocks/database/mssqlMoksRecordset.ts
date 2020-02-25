export declare class Connection{}
export class ConnectionPool {
    private requestObj = new Request();

    request() {
        return this.requestObj;
    }
}

class Request {
    public resultProcedure: IProcedureResult;

    constructor() {
        this.resultProcedure = new IProcedureResult();
    }

    input(parameter: string, typeData: any, value: any) {
        return this;
    }

    output(parameter: string, typeData: any) {
        return this;
    }

    query() {
        return this.resultProcedure;
    }
}

class IProcedureResult {
    private output: any;
    public recordset: Array<any> = new Array();    
    public rowsAffected: Array<any> = new Array();

    public setOutput(data: any) {
        this.output = {
            output: data
        };
    }

    public setRecordSet(data: any) {
        this.recordset = data;
    }

    public setRowsAffected() {
        this.rowsAffected =[1];
    }

    public setRowsAffecteds() {
        this.rowsAffected =[0];
    }

}