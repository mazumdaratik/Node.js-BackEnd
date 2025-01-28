const express = require('express');
const app = express();

app.get('/' , (req, res) => {
    res.send(a); // a is not defined
});

//404 error Handle
app.use((req, res, next) =>{
    next('Requested url is not found');
    // res.status(404).send('Requested url is not found');
    //res.send('Requested url is not found');
})

app.use((err, req, res, next) =>{

    if(err.message){
        res.status(500).send(err.message);
    } else{
        res.status(500).send(' Error: a is not defined');
    }

    // console.log(err);
    // res.status(500).send("there is a error");
})

app.listen(3000, () => {
console.log('app listening on port 3000');
});