import fs from 'fs';

export function charge(nameJson: string) {
    let obj = fs.readFileSync(`${__dirname}/requests/${nameJson}.json`).toString();
    obj = JSON.parse(obj);
    return obj;
}