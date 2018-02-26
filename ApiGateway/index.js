const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const PERSISTENCE_HOST = 'http://localhost:3001';
const REGIONS_HOST = 'http://localhost:3003';

app = express();
app.use(cors());

app.use('/forecasts', (req, res) => {
    fetch(PERSISTENCE_HOST + '/forecasts', {
        method: 'GET'
    }).then(forecasts => {
        fetch(REGIONS_HOST + '/regions', {
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
                            forecast: forecast.forecast,
                            region: regions_json[forecast.regionId],
                            dataSourceId: forecast.dataSourceId
                        });
                    }

                    res.send(forecasts_of_regions);
                });
            });
        });
    });
})

app.listen(3002);

