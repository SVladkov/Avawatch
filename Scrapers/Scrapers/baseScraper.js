class BaseScraper {
    constructor() {
        if (this.constructor === BaseScraper) {
            throw new TypeError("Cannot construct BaseScraper instances directly");
        }
    }

    scrape() {

    }
}

module.exports = BaseScraper;
