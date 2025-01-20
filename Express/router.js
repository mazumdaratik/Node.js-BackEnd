const express = require('express');

const adminRouter = require('./adminRoute');
const publicRouter = require('./publicRouter');

const app = express();

app.use('/', publicRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
    console.log('listening to port 3000')
})