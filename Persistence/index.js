const Db = require('./db');
const DataAccess = require('./dataAccess');
const serverApp = require('./serverApp');
const configurations = require('./configurations');

var db = new Db(configurations.databaseConnection);
var dataAccess = new DataAccess(db);
serverApp.init().listen(3000);