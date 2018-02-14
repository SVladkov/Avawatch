class BasePoster {
    constructor() {
        if (this.constructor === BasePoster) {
            throw new TypeError("Cannot construct BasePoster instances directly");
        }
    }

    postForecasts() {

    }
}

module.exports = BasePoster;
