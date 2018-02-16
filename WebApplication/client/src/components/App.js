import React, { Component } from 'react';
import './App.css';
import ForecastsService from '../services/forecastsService';
import AvalancheMap from './AvalancheMap';

class App extends Component {
    constructor(props) {
        super(props);
        this.forecastService = new ForecastsService();

        this.forecastService.getForecasts()
            .then(forecasts => {
                console.log(forecasts);
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Avawatch</h1>
                    <AvalancheMap />
                </header>
            </div>
        );
    }
}

export default App;
