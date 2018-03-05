import React, { Component } from 'react';
import { 
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import './App.css';
import App from './App';
import EmbeddingModule from './EmbeddingModule';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/home" component={App} />
                    <Route path="/embedding-module" component={EmbeddingModule} />
                </div>
            </Router>
        );
    }
}

export default AppRouter;
