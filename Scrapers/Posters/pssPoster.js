const BasePoster = require('./basePoster');

class PssPoster extends BasePoster {
    constructor() {
        super();

        this.dataSourceId = 1;
    }

    postForecasts(forecasts) {
        this.postVitoshaForecast(forecasts.vitoshaDanger);
        this.postRillaForecast(forecasts.rillaDanger);
        this.postPirinForecast(forecasts.pirinDanger);
        this.postStaraPlaninaForecast(forecasts.staraPlaninaDanger);
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
