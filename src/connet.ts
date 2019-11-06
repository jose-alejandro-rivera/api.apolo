//const mssql = require('mssql')
import mssql  from 'mssql';
import { Singleton } from 'typescript-ioc';

/**
 * @category Database
 */
@Singleton
export default class Conection {
	private connectDB:any
	public request:any
	constructor(){
		this.getConnection()
	}
	async getConnection() {
		try{
		this.connectDB = await  new mssql.ConnectionPool({
			user: 'sa',
      password: 'admin',
			server: 'localhost', 
			database: 'Apolo',
			parseJSON: true,
		}).connect()
		
		this.request = await this.connectDB.request()
		return this.request
		
	}catch(error){
		console.log(error,)
	}
	}

}