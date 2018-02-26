import React, { Component } from 'react';
import './App.css';
import ForecastsService from '../services/forecastsService';
import AvalancheMap from './AvalancheMap';

class App extends Component {
    constructor(props) {
        super(props);
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
