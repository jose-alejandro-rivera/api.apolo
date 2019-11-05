//const mssql = require('mssql')
import mssql  from 'mssql';

class Conection {
	private connectDB:any
	public request:any
	constructor(){
		this.getConnection()
	}
	async getConnection() {
		try{
		this.connectDB = await  new mssql.ConnectionPool({
			user: 'sa',
            password: 'admin1234*',
			server: 'localhost', 
			database: 'Apolo',
		}).connect()
		
		this.request = await this.connectDB.request()
		return this.request
		
	}catch(error){
		console.log(error,)
	}
	}

}

export const Conections = new Conection()