import React, { Component } from 'react';
import './App.css';
import AvalancheMap from './AvalancheMap';

class App extends Component {
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
