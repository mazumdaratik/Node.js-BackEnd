// use middleware in router level
const express = require('express');
const app = express();
const adminRoute = express.Router();


const logger = (req, res, next) => {
    console.log('I am logging');
    //next();
    throw new Error ('this is an error!');
};
adminRoute.use(logger);

adminRoute.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

app.use('/admin', adminRoute);


app.get('/about', (req, res) =>  {
    res.send('About page');
})

const errorMiddleware = (err, req, res, next) => {
console.log(err.message);
//console.log(err);
res.status(500).send('There was an server side error');
}

adminRoute.use(errorMiddleware);

app.listen(3000, () => {
    console.log('listenning to port 3000');
});