const fetch = require('node-fetch');
const cheerio = require('cheerio');
const BaseScraper = require('./baseScraper');

class PssScraper extends BaseScraper {
    constructor() {
        super();
        this.url = 'http://www.pss-bg.bg/avalanche/';
    }

    getPageHtml() {
        return fetch(this.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        }).then(res => {
            return new Promise((resolve, reject) => {
                res.text().then(html => {
                    resolve(html);
                })
            })
        })
    }

    getDate(rawDate) {
        var date = rawDate.slice(22);
        var dateAsArray = date.split('.');

        return {
            day: parseInt(dateAsArray[0]),
            month: parseInt(dateAsArray[1]),
            year: parseInt(dateAsArray[2])
        }
    }

    scrape() {
        return new Promise((resolve, reject) => {
            this.getPageHtml().then(html => {
                const $ = cheerio.load(html);

                var dates = $('.avalanche_date');
                var vitoshaDate = this.getDate(dates.eq(0).text());
                var rillaDate = this.getDate(dates.eq(1).text());
                var pirinDate = this.getDate(dates.eq(2).text());
                var staraPlaninaDate = this.getDate(dates.eq(3).text());

                console.log(vitoshaDate)

                var danger = $('.aval_level');

                var vitoshaDanger = danger.eq(0).attr('id').slice(-1);
                var rillaDanger = danger.eq(1).attr('id').slice(-1);
                var pirinDanger = danger.eq(2).attr('id').slice(-1);
                var staraPlaninaDanger = danger.eq(3).attr('id').slice(-1);

                resolve({
                    vitoshaDanger: {
                        date: vitoshaDate,
                        danger: vitoshaDanger
                    },
                    rillaDanger: {
                        date: rillaDate,
                        danger: rillaDanger
                    },
                    pirinDanger: {
                        date: pirinDate,
                        danger: pirinDanger
                    },
                    staraPlaninaDanger: {
                        date: staraPlaninaDate,
                        danger: staraPlaninaDanger
                    }
                });
            });
        });
    }
}

module.exports = PssScraper;
