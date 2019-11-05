//const mssql = require('mssql')
import mssql  from 'mssql'

class Conection {
	private connectDB:any
	public request:any
	constructor(){
		this.getConnection()
	}
	async getConnection() {
		try{
		this.connectDB = await  new mssql.ConnectionPool({
			user: process.env.USER,
      password: process.env.PASSWORD,
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