const attach = (app) => {
    app.get('/forecast', (req, res) => {
        console.log(req)
        res.send('This is the forecast');
    });

    app.post('/forecast', (req, res) => {
        console.log('request');
        console.log(req.body)
    })
}

module.exports = { attach };
