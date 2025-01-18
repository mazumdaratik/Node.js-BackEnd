const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/about', (req, res) => { //res.locals

    res.format({
        'text/plain': () => {
            res.send('hi');
        },
        'text/html': () => {
            res.render('pages/about', {
                country: 'Bangladesh',
            });
        },
        'application/json': () => {
            res.json({
                message: 'This is json()'
            });
        },
        default: () => {
            res.status(406).send('Not Acceptable')
        },
        
    })
    //res.redirect(/test, (req, res) => {
    // res.end()
    //})
    //res.cookie('name', 'bangladesh');
    //resend();

    // res.sendStatus(200);
    // res.json({
    //     country: 'bangladsh';
    // })
    // res.send('About');
    // res.end();
   // console.log(res.headersSent); //false
    // res.render('pages/about', {
    // name: 'Bangladesh',
 });
    // console.log(res.headersSent); //true
//});
// app.get('/about', (req, res) => {
// res.send('Welcome');
// });

app.listen(3000, () => {
    console.log('listening on port 3000');
})