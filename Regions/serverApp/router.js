const attach = (serverApp) => {
    serverApp.app.get('/regions', (req, res) => {
        serverApp.dataAccess.getRegions()
            .then(forecasts => {
                res.send(forecasts);
            });
    });
}

module.exports = { attach };
