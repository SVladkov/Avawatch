const mysql = require('mysql');

class Db {
    constructor(databaseConfiguration) {
        this.connection = mysql.createConnection(databaseConfiguration);
    }
}

module.exports = Db;
