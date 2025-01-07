const fs = require('fs');
const ourReadStream = fs.createReadStream(`${__dirname}/bigData.txt`);
const ourWriteStram = fs.createWriteStream(`${__dirname}/output.txt`);

// ourReadStram.on('data', (chunk) => {
//     ourWriteStram.write(chunk);
// });

ourReadStream.pipe(ourWriteStram);