const fs = require('fs');
const readline = require('readline');
const AWS = require('aws-sdk');

const myArgs = process.argv.slice(1);
let infile = myArgs[1]; 

(async function processLineByLine() {

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream(infile),
            crlfDelay: Infinity
        });

        
        rl.on('line', (line) => {   
            let item = JSON.parse(line);
            item = AWS.DynamoDB.Converter.unmarshall(item.Item);
            console.log(item);
        });

    } catch (err) {
        console.error(err);
    }
})();
