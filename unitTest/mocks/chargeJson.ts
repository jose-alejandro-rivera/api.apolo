import fs from 'fs';

/*export function charge(nameJson: string) {
		try{
    	let obj = fs.readFileSync(`${__dirname}/request/${nameJson}.json`).toString();
    	obj = JSON.parse(obj);
    	return obj;
		}catch(error){
			console.log(error,'error')
		}
	
}
*/

export function chargeJsonRequest(nameJson: string) {
    let obj = fs.readFileSync(`${__dirname}/requests/${nameJson}.json`).toString();
    obj = JSON.parse(obj);
    return obj;
}

export function chargeJsonResponse(nameJson: string) {
    let obj = fs.readFileSync(`${__dirname}/responses/${nameJson}.json`).toString();
    obj = JSON.parse(obj);
    return obj;
}