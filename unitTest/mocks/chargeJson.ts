import fs from 'fs';

export function chargeJsonRequest(nameJson: string) {
	console.log(`${__dirname}/request/${nameJson}.json`, 'json ---->>>>');
	try{
		let obj = fs.readFileSync(`${__dirname}/request/${nameJson}.json`).toString();
		obj = JSON.parse(obj);
		return obj;
	}catch(error){
console.log('error ------------->>> ', error)
	}

}

export function chargeJsonResponse(nameJson: string) {
    let obj = fs.readFileSync(`${__dirname}/responses/${nameJson}.json`).toString();
    obj = JSON.parse(obj);
    return obj;
}