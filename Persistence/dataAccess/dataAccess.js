class dataAccess {
    constructor(db) {
        this.db = db;

        this.createAllTables();
        this.insertSourceTypes();
        //this.insertDataSources();
    }

    createAllTables() {
        this.db.connection.connect((err) => {
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
                "dataSourceId INT NOT NULL, " +
                "PRIMARY KEY (id), " +
                "FOREIGN KEY (regionId) REFERENCES regions(id), " +
                "FOREIGN KEY (dataSourceId) REFERENCES dataSources(id)" +
            ")";

            this.createTable(createRegionsTable);
            this.createTable(createSourceTypesTable);
            this.createTable(createDataSourcesTable);
            this.createTable(createForecastsTable);
        });
    }

    createTable(query) {
        this.db.connection.query(query, (err, result) => {
            if (err) {
                if (err.code === "ER_TABLE_EXISTS_ERROR") {
                    console.log('Table already created');
                } else {
                    throw err;
                }
            }
        })
    }

    insertSourceTypes() {
        var insertSourceTypes =  "INSERT INTO sourceTypes (id, type) VALUES (0, 'scraper'), (1, 'user'), (2, 'sensor')";
        this.db.connection.query(insertSourceTypes, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.log('Source types already created');
                } else {
                    throw err;
                }
            }
        })
    }

    insertDataSources() {
        var insertForecast = "INSERT INTO dataSources (name, sourceTypeId) VALUES (" +
            "'PSS', " +
            "2" +
        ")";

        this.db.connection.query(insertForecast, (err, result) => {
            if (err) {
                throw err;
            }
        })
    }

    formatDate(date) {
        return date.year + "-" + date.month + "-" + date.day;
    }

    updateExistingForecast(forecastId, newForecast) {
        var updateExistingForecastQuery = "UPDATE forecasts SET " +
            "forecast=" + newForecast +
            " WHERE " +
            "id=" + forecastId;

        console.log(updateExistingForecastQuery);

        return new Promise((resolve, reject) => {this.db.connection.query(updateExistingForecastQuery, (err, result) => {
                if (err) {
                    throw err;
                }

                resolve(result);
            });
        });
    }

    insertNewForecast(forecast) {
        var insertForecastQuery = "INSERT INTO forecasts (date, forecast, regionId, dataSourceId) VALUES (" +
            "'" + this.formatDate(forecast.date) + "', " +
            "'" + forecast.forecast + "', " +
            forecast.regionId + ", " +
            forecast.dataSourceId +
        ")";

        return new Promise((resolve, reject) => {
            this.db.connection.query(insertForecastQuery, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    insertForecast(forecast) {
        var findExistingForecast = "SELECT * FROM forecasts WHERE " +
            "date='" + this.formatDate(forecast.date) + "' and " +
            "regionId=" + forecast.regionId;

        function findForecastWithSource(forecasts, dataSourceId) {
            for (var forecast of forecasts) {
                if (forecast.dataSourceId === dataSourceId) {
                    return forecast;
                }
            }
        }

        return new Promise((resolve, reject) => {
            this.db.connection.query(findExistingForecast, (err, existingForecasts) => {
                if (err) {
                    throw err;
                }

                if (existingForecasts.length > 0) {
                    var forecastWithSameSource = findForecastWithSource(existingForecasts, forecast.dataSourceId);

                    if (forecastWithSameSource !== undefined) {
                        if (forecastWithSameSource.forecast !== forecast.forecast) {
                            this.updateExistingForecast(forecastWithSameSource.id, forecast.forecast).then(() => {
                                resolve();
                            });
                        }
                    } else {
                        this.insertNewForecast(forecast).then(id => {
                            resolve(id);
                        });
                    }
                } else {
                    this.insertNewForecast(forecast).then(id => {
                        resolve(id);
                    })
                }

                resolve();
            });
        });
    }

    getAllForecasts() {
        var getAllForecasts = "SELECT date, forecast, regionId, dataSourceId FROM forecasts";

        return new Promise((resolve, reject) => {
            this.db.connection.query(getAllForecasts, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = dataAccess;
