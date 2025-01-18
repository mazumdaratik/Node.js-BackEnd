const handler = (req, res)=> {
    console.log(req.app.get('view engine'));
    //console.log(req.body);
    res.send('Hello with POST');
}
module.exports = handler;