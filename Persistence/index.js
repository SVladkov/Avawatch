const Db = require('./db');
const DataAccess = require('./dataAccess');
const ServerApp = require('./serverApp');
const configurations = require('./configurations');

var db = new Db(configurations.databaseConnection);
var dataAccess = new DataAccess(db);
var serverApp = new ServerApp(dataAccess);
serverApp.listen(3000);
