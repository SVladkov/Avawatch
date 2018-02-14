const fetch = require('node-fetch');
const PssScraper = require('./Scrapers/pssScraper');
const PssPoster = require('./Posters/pssPoster');

var pssScraper = new PssScraper();
var pssPoster = new PssPoster();

var forecasts = pssScraper.scrape()
    .then(forecasts => {
        pssPoster.postForecasts(forecasts);
    });
