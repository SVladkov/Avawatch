const { MongoClient } = require('mongodb');

const init = (databaseConnectionString) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(databaseConnectionString).then(db => {
            resolve(db);
        });
    });
}

module.exports = { init };
