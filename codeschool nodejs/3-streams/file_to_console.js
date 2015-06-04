var fs = require('fs');

var file = fs.createReadStream('read.txt');

file.pipe(process.stdout);  
