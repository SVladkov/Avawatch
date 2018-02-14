const attach = (serverApp) => {
    serverApp.app.get('/forecasts', (req, res) => {
        serverApp.dataAccess.getAllForecasts()
            .then(forecasts => {
                res.send(forecasts);
            });
    });

    serverApp.app.post('/forecasts', (req, res) => {
        serverApp.dataAccess.insertForecast(req.body)
            .then(id => {
                res.send({id: id});
            });
    })
}

module.exports = { attach };
