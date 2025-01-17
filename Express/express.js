const express = require('express');
const app = express();

app.use(express.raw());
//app.use(express.static());
//app.use(express.json());
//app.use(express.urlencoded));
//app.use(express.text());


app.get('/', (req, res) => {
    res.send('This is home page.');
});

app.post('/', (req, res) => {
    console.log(req.body.toString()); //console.log(req.body.name);
    res.send('This is home page with post request');
});

app.listen(3000, () => {
    console.log('listening to port 300...');
});