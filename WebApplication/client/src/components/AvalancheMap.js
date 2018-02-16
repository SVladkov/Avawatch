import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import './AvalancheMap.css';
import coordinates from '../coordinates/coordinates.js';

class AvalancheMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 42.5,
            lng: 23.5,
            zoom: 9
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <span>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                    </Popup>
                </Marker>
                <Polygon color="purple" positions={coordinates} />
            </Map>
        )
    }
}

export default AvalancheMap;
