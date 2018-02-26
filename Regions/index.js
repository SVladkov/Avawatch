const db = require('./db');
const DataAccess = require('./dataAccess');
const ServerApp = require('./serverApp');

db.init('mongodb://localhost/avawatch-regions')
    .then(db => {
        var dataAccess = new DataAccess(db);
        var serverApp = new ServerApp(dataAccess);
        serverApp.listen(3003);
    });
