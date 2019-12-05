import fs from 'fs';

export function charge(nameJson: string) {
		try{
    	let obj = fs.readFileSync(`${__dirname}/request/${nameJson}.json`).toString();
    	obj = JSON.parse(obj);
    	return obj;
		}catch(error){
			console.log(error,'error')
		}
	
}