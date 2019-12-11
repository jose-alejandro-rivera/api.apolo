import { thisExpression } from "@babel/types";

export declare class Connection{}
export class ConnectionPool {
    request() {
        return new Request();
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

    execute() {
        return this.resultProcedure;
    }

    query(s: string){
        return this.resultProcedure.recordset;
    }
}

class IProcedureResult {
    private output: any;
    public recordset:Array<any> = new Array();

    public setOutput(data: any) {
        this.output = {
            output: data
        };
    }

    public setRecordSet(data:any){
        this.recordset = data;
    }

}