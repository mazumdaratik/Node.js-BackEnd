const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');
const app = express();

app.use(express.json());

//database conncetion with mongoose
mongoose
    .connect('mongodb://localhost:27017/todos', {useNewUrlParser: true, useUnifiedTopology: true,})
    .then( () => console.log('connection Succesfull'))
    .catch((err) => console.log(err))

//application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

//default error handling
function errorHandler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    };
    res.status(500).json({error: err});
}

app.listen(4000, () => {
    console.log('app listening on port 4000');
});