import React, { Component } from 'react';
import logo from './logo.svg';
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
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <AvalancheMap />
                </header>
            </div>
        );
    }
}

export default App;
