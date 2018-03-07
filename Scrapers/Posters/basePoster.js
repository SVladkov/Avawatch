const fetch = require('node-fetch');
const configurations = require('../configurations');

class BasePoster {
    constructor() {
        if (this.constructor === BasePoster) {
            throw new TypeError("Cannot construct BasePoster instances directly");
        }

        this.postForecastUrl = configurations.postForecastUrl;
    }

    postForecast(forecast) {
        forecast.dataSourceId = this.dataSourceId;

        console.log(forecast)

        fetch(this.postForecastUrl, {
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
}

module.exports = BasePoster;
