const express = require('express');
const handler = require('./req-handler');

const app = express();
app.use(express.json());
const adminRoute = express.Router();

adminRoute.get('/dashboard', (req,res) => {
    //console.log(req.hostname);
    // console.log(req.path);
    //console.log(req.baseUrl);
    //console.log(req.path);
    //console.log(req.originalUrl);
res.send('Admin Dashboard');
});

app.use('/admin', adminRoute);

app.get('/user/:id', (req, res) => {
    //console.log(req.route);
    //console.log(req.secure);
    //console.log(req.cookies);
    //console.log(req.query);
    //console.log(req.params);
    //console.log(req.path);
    //console.log(req.originalUrl);
    res.send('Hello');
})
app.post('/user', handler)

app.listen(3000, () => {
    console.log('listening to port 3000');
})