const fetch = require('node-fetch');

class PssPoster {
    postForecasts(forecasts) {
        this.postVitoshaForecast(forecasts.vitoshaDanger);
        this.postRillaForecast(forecasts.rillaDanger);
        this.postPirinForecast(forecasts.pirinDanger);
        this.postStaraPlaninaForecast(forecasts.staraPlaninaDanger);
    }

    postForecast(forecast) {
        forecast.dataSourceId = 1;

        fetch('http://localhost:3001/forecasts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forecast)
        }).then(res => {
            console.log(res)
            res.json().then(id => {
                console.log(id);
            });
        })
    }

    postVitoshaForecast(forecast) {
        this.postForecast({ 
            date: forecast.date,
            dangerLevel: parseInt(forecast.danger),
            regionId: 1
        });
    }

    postRillaForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            dangerLevel: parseInt(forecast.danger),
            regionId: 2
        });
    }

    postPirinForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            dangerLevel: parseInt(forecast.danger),
            regionId: 3
        });
    }

    postStaraPlaninaForecast(forecast) {
        this.postForecast({
            date: forecast.date,
            dangerLevel: parseInt(forecast.danger),
            regionId: 4
        });
    }
}

module.exports = PssPoster;
