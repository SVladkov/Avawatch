import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './AvalancheMap.css'

class AvalancheMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 42.5,
            lng: 23.5,
            zoom: 5
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
            </Map>
        )
    }
}

export default AvalancheMap;
