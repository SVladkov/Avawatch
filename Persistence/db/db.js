const mysql = require('mysql');

class Db {
    constructor(databaseConfiguration) {
        this.connection = mysql.createConnection(databaseConfiguration);

        this.connection.connect((err) => {
            if (err) {
                throw err;
            }

            var createRegionsTable = "CREATE TABLE regions (" +
                "id INT NOT NULL AUTO_INCREMENT, " + 
                "mountain VARCHAR(63), "+
                "region VARCHAR(255), " + 
                "PRIMARY KEY (id)" + 
            ")";

            var createSourceTypesTable = "CREATE TABLE sourceTypes (" +
                "id INT NOT NULL, " +
                "type VARCHAR(63), " +
                "PRIMARY KEY (id)" +
            ")";

            var createDataSourcesTable = "CREATE TABLE dataSources (" +
                "id INT NOT NULL AUTO_INCREMENT, " +
                "name VARCHAR(127), " +
                "sourceTypeId INT NOT NULL, " +
                "PRIMARY KEY (id), " +
                "FOREIGN KEY (sourceTypeId) REFERENCES sourceTypes(id)" +
            ")";
            
            var createForecastsTable = "CREATE TABLE forecasts (" + 
                "id INT NOT NULL AUTO_INCREMENT, " +
                "date DATETIME, " +
                "forecast VARCHAR(255), " +
                "regionId INT NOT NULL, " +
                "PRIMARY KEY (id), " +
                "FOREIGN KEY (regionId) REFERENCES regions(id)" +
            ")";

            this.createTable(createRegionsTable);
            this.createTable(createSourceTypesTable);
            this.createTable(createDataSourcesTable);
            this.createTable(createForecastsTable);
        });
    }

    createTable(query) {
        this.connection.query(query, (err, result) => {
            if (err) {
                if (err.code === "ER_TABLE_EXISTS_ERROR") {
                    console.log('Table already created');
                } else {
                    throw err;
                }
            }
        })
    }
}

module.exports = Db;