const express = require('express');
const router = require('./router');

const init = () => {
    const app = express();

    router.attach(app);

    return app;
}

module.exports = { init };
