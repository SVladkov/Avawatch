const fetch = require('node-fetch');

class ForecastsService {
    constructor() {
        this.url = 'http://localhost:3001/forecasts';
    }

    getForecasts() {
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'GET'
            }).then(forecasts => {
                resolve(forecasts.json());
            });
        });
    }
}

export default ForecastsService;