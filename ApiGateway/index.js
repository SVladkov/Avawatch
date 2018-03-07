const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const configurations = require('./configurations');

app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/forecasts', (req, res) => {
    fetch(configurations.persistenceUrl, {
        method: 'GET'
    }).then(forecasts => {
        fetch(configurations.regionsUrl, {
            method: 'GET'
        }).then(regions => {
            forecasts.json().then(forecasts => {
                regions.json().then(regions => {
                    var regions_json = {}
                    for (var region of regions) {
                        regions_json[region.id] = {
                            name: region.name,
                            coordinates: region.coordinates
                        }
                    }

                    var forecasts_of_regions = []
                    for (var forecast of forecasts) {
                        forecasts_of_regions.push({
                            date: forecast.date,
                            dangerLevel: forecast.dangerLevel,
                            region: regions_json[forecast.regionId],
                            sourceName: forecast.sourceName,
                            sourceUrl: forecast.sourceUrl
                        });
                    }

                    res.send(forecasts_of_regions);
                });
            });
        });
    });
});

app.post('/forecasts', (req, res) => {
    fetch(configurations.persistenceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(req.body)
    }).then((response) => {
        res.send(response);
    });
});

app.listen(3002);

