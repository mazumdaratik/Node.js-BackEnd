const express = require('express');

const app = express();
const admin = express();



//app.locals.title = 'my app ojcet';

admin.get('/dashboard', (req, res) => {
//    console.log(req.app.locals.title);
    res.send('This is home page with dashboard.');
} );

app.get('/', (req, res) => {
    res.send('this is normalpage');
})
app.use('/admin', admin);

app.post('/', (req, res) => {
    console.log(req.body.toString()); //console.log(req.body.name);
    res.send('This is home page with post request');
});

app.listen(3000, () => {
    console.log('listening to port 300...');
});