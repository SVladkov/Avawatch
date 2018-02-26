import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import './AvalancheMap.css';
import ForecastsService from '../services/forecastsService';

class AvalancheMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 42.5,
            lng: 23.5,
            zoom: 9
        }
    }

    getForecasts() {
        var forecastsService = new ForecastsService();

        forecastsService.getForecasts().then(forecasts => {
            this.setState(() => ({
                forecasts: forecasts
            }))
        });
    }

    componentDidMount() {
        this.getForecasts();
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        
        var map = [];

        if (this.state.forecasts !== undefined) {
            for (var forecast of this.state.forecasts) {
                if (forecast.region !== undefined) {
                    map.push(<Polygon color="red" positions={forecast.region.coordinates} />);
                }
            }

            console.log(map);

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
                    <div>{map}</div>
                        
                </Map>
            )
        } else {
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
    

        //var co = [[42.64, 23.21], [42.64, 23.26]]
        //console.log(co)
    }
}

export default AvalancheMap;
