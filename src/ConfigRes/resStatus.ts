import { Inject } from "typescript-ioc";
/** 
 * @category Status
 */
export class ResponseStatus{
  
  private status:any;
  private arrStatus:Array<{ status: number, msg: string}>
  private arrMessage:any

	constructor(){
		this.setResponse()
		this.arrStatus = []
	}

	stateInsert(status:number = 200, rows:any[] = []){
		this.status =	this.arrMessage.find((e:any) => {return e.status == status})
		if(this.status == undefined) {
			throw `{ Invalid: status, status: ${status} }`;
		}
		if(rows.length > 0){
			let key = Object.keys(rows[0])[0]
			this.status[key]= rows[0][key] 
		}
		this.arrStatus.push(this.status)
		return this.arrStatus
	}

	stateSelect(status:number = 200, rows:any[] = []){
		this.status =	this.arrMessage.find((e:any) => {return e.status == status})
		if(this.status == undefined) {
			throw `{ Invalid: status, status: ${status} }`;
		}
		if(rows.length > 0){
			let key = Object.keys(rows[0])
			this.status.rows = rows
		}else{
			this.status.rows = []
		}
		return this.status
	}

	private setResponse() {
		this.arrMessage = [
			{ status : 200, msg :'Exitoso' },
			{ status : 500, msg :'Error en base de datos' },
			{ status : 201, msg : 'Error de parametros' }
		]
	}

}