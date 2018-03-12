class dataAccess {
    constructor(db) {
        this.db = db;
    }

    formatDate(date) {
        return date.year + "-" + date.month + "-" + date.day;
    }

    updateExistingForecast(forecastId, newForecast) {
        var updateExistingForecastQuery = "UPDATE forecasts SET " +
            "dangerLevel=" + newForecast +
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
        var insertForecastQuery = "INSERT INTO forecasts (date, dangerLevel, regionId, dataSourceId) VALUES (" +
            "'" + this.formatDate(forecast.date) + "', " +
            "'" + forecast.dangerLevel + "', " +
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
                        if (forecastWithSameSource.dangerLevel !== forecast.dangerLevel) {
                            this.updateExistingForecast(forecastWithSameSource.id, forecast.dangerLevel).then(() => {
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

        var getAllForecasts = "SELECT date, dangerLevel, regionId, name AS sourceName, url AS sourceUrl " +
            "FROM dataSources " +
            "JOIN " +
                "(SELECT * " +
                "FROM forecasts as data " +
                "WHERE date = " +
                    "(SELECT MAX(date) " +
                    "FROM forecasts " +
                    "WHERE regionId=data.regionId)) as LatestDates;";

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
