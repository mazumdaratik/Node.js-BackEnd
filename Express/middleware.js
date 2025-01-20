const express = require('express');

const app = express();

const logger = (req, res, next) => {
    console.log(`
        ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} -${req.ip}
        `);
        next();
        //res.end();
}

app.use(logger);
/* const myMiddleware = (req, res, next){
    console.log('I am logging..')
    next();
};

app.use(myMiddleware); */

app.get('/', (req, res) =>{
    res.send('about page');
});

app.listen(3000, () => {
    console.log('listening to port 3000');
})