const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'AvawatchForecast'
});

createAllTables(connection);
insertSourceTypes(connection);
insertDataSources(connection);
//insertRegions(connection);

function createAllTables(connection) {
    connection.connect((err) => {
        if (err) {
            throw err;
        }

        var createRegionsTable = "CREATE TABLE regions (" +
            "id INT NOT NULL AUTO_INCREMENT, " +
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
            "dangerLevel INT, " +
            "regionId INT NOT NULL, " +
            "dataSourceId INT NOT NULL, " +
            "PRIMARY KEY (id), " +
            "FOREIGN KEY (regionId) REFERENCES regions(id), " +
            "FOREIGN KEY (dataSourceId) REFERENCES dataSources(id)" +
        ")";

        createTable(connection, createRegionsTable);
        createTable(connection, createSourceTypesTable);
        createTable(connection, createDataSourcesTable);
        createTable(connection, createForecastsTable);
    });
}

function createTable(connection, query) {
    connection.query(query, (err, result) => {
        if (err) {
            if (err.code === "ER_TABLE_EXISTS_ERROR") {
                console.log('Table already created');
            } else {
                throw err;
            }
        }
    })
}

function insertSourceTypes(connection) {
    var insertSourceTypes =  "INSERT INTO sourceTypes (id, type) VALUES (0, 'scraper'), (1, 'user'), (2, 'sensor')";
    
    connection.query(insertSourceTypes, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                console.log('Source types already created');
            } else {
                throw err;
            }
        }
    })
}

function insertDataSources(connection) {
    var insertForecast = "INSERT INTO dataSources (name, sourceTypeId) VALUES (" +
        "'PSS', " +
        "2" +
    ")";

    connection.query(insertForecast, (err, result) => {
        if (err) {
            throw err;
        }
    })
}

function insertRegions(connection) {
    var insertRegions = "INSERT INTO regions () VALUES ()";

    connection.query(insertRegions, (err, result) => {
        if (err) {
            throw err;
        }
    })
}