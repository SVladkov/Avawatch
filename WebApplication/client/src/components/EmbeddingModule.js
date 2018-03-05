import React, { Component } from 'react';
import AvalancheMap from './AvalancheMap';
import './EmbeddingModule.css';

class EmbeddingModule extends Component {
    render() {
        return (
            <div className="map-container">
                <AvalancheMap />
            </div>
        );
    }
}

export default EmbeddingModule;
