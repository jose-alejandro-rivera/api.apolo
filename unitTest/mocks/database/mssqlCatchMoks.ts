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

    queryy() {
        return this.resultProcedure;
    }
}

class IProcedureResult {
    private output: any;
    public recordsets: Array<any> = new Array();    

    public setOutput(data: any) {
        this.output = {
            output: data
        };
    }

    public setRecordSet(data: any) {
        this.recordsets = data;
    }

}