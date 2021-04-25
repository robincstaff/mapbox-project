import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxGlCsp from 'mapbox-gl/dist/mapbox-gl-csp';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW5jcyIsImEiOiJja25tNWdtbGcwb3p5MnNuMHlqaTN0emQxIn0.NnfO1gt2sCMYDF_Mag8q6g';

class Mapbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 10.431852,
      lat: 63.409388,
      zoom: 11
    }
    this.mapContainer = React.createRef();
    const data = require("C:\\Users\\robin\\Documents\\Robin Google Location History\\Semantic Location History\\2021\\2021_MARCH.json");
    this.locationData = JSON.parse(data);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.addSource(this.locationData);
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default Mapbox;