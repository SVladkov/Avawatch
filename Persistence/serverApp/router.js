const attach = (serverApp) => {
    serverApp.app.get('/forecast', (req, res) => {
        console.log(req)
        res.send('This is the forecast');
    });

    serverApp.app.post('/forecast', (req, res) => {
        console.log('request');
        console.log(req.body)
        serverApp.dataAccess.insertForecast(req.body)
            .then((id) => {
                res.send({id: id});
            });
    })
}

module.exports = { attach };
