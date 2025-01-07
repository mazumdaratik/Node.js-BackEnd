const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write('<html> <head><title>Form</title></head>');
        res.write('<body><form method="post" action="/process"><input name="message" /><button type="submit">Submit</button></form></body>');
        res.end();
    }  
    else if (req.url == '/process' && req.method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => { 
            console.log('Stream finished');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            res.write('Thank you for Submitting.');
            res.end();
        });
    } else {
        res.write('404 Not Found');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

    
    /* else if(req.url == '/process' && req.method == 'POST'){
        req.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        res.write('Thank you for submitting.');
        res.end();
//     }  else {
//         res.write('Not Found');
//         res.end();
//     }
    
// })

// server.listen(3000);

// console.log('listening on port 300');

/* const fs = require('fs');

const readStream = fs.createReadStream(`${__dirname}/bigData.txt`, 'utf8');

readStream.on('data', (data) => {
    console.log(data);
// can use toSting to encode chunked data    
}); */