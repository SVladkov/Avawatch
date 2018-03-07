const fetch = require('node-fetch');
const PssScraper = require('./Scrapers/pssScraper');
const PssPoster = require('./Posters/pssPoster');
const CronJob = require('cron').CronJob;

var pssScraper = new PssScraper();
var pssPoster = new PssPoster();

new CronJob('0 */3 * * * *', () => {
    pssScraper.scrape()
        .then(forecasts => {
            pssPoster.postForecasts(forecasts);
        });
}, null, true);
