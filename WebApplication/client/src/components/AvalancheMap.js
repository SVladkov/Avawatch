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

    getDangerColor(dangerCode) {
        const codeToColor = {
            '1': 'green',
            '2': 'yellow',
            '3': 'orange',
            '4': 'red',
            '5': 'black'
        }

        return codeToColor[dangerCode];
    }

    getDangerText(dangerCode) {
        const codeToText = {
            '1': 'Low',
            '2': 'Moderate',
            '3': 'Considerable',
            '4': 'High',
            '5': 'Very high'
        }

        return codeToText[dangerCode];
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        var regions = [];

        if (this.state.forecasts !== undefined) {
            for (var forecast of this.state.forecasts) {
                if (forecast.region !== undefined) {
                    var dangerColor = this.getDangerColor(forecast.dangerLevel);
                    var dangerText = this.getDangerText(forecast.dangerLevel);

                    regions.push(<Polygon color={dangerColor} positions={forecast.region.coordinates} ><Popup>
                            <span>
                                Place: {forecast.region.name}
                                <br />
                                Danger: {dangerText}
                                <br />
                                Date: {forecast.date.slice(0, 10)}
                                <br />
                                <a href={forecast.sourceUrl} target="_blank">{forecast.sourceUrl}</a>
                            </span>
                        </Popup></Polygon>
                    );
                }
            }

            return (
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <div>{regions}</div>
                </Map>
            )
        } else {
            return (
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </Map>
            )
        }
    }
}

export default AvalancheMap;
