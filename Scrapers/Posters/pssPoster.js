const fetch = require('node-fetch');

class PssPoster {
    postForecasts(forecasts) {
        this.postVitoshaForecast(forecasts.vitoshaDanger);
        this.postRillaForecast(forecasts.rillaDanger);
        this.postPirinForecast(forecasts.pirinDanger);
        this.postStaraPlaninaForecast(forecasts.staraPlaninaDanger);
    }

    postForecast(forecast) {
        forecast.dataSourceId = 2;

        fetch('http://localhost:3000/forecast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forecast)
        }).then(res => {
            res.json().then(id => {
                console.log(id);
            });
        })
    }

    postVitoshaForecast(forecast) {
        this.postForecast({ 
            date: forecast.date,
            forecast: forecast.danger,
            regionId: 1
        });
    }

    postRillaForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            forecast: forecast.danger,
            regionId: 2
        });
    }

    postPirinForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            forecast: forecast.danger,
            regionId: 3
        });
    }

    postStaraPlaninaForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            forecast: forecast.danger,
            regionId: 4
        });
    }
}

module.exports = PssPoster;
