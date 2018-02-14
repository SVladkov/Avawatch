const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');

class ServerApp {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;

        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        router.attach(this);
    }

    listen(port) {
        this.app.listen(port);
    }
}

module.exports = ServerApp;
