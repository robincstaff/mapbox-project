import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxGlCsp from 'mapbox-gl/dist/mapbox-gl-csp';

import data from './LocationHistory/SemanticLocationHistory/2019/2019_MARCH.json';
import data2 from './LocationHistory/SemanticLocationHistory/2019/2019_APRIL.json';
import Slider from './SliderComponent';

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

    this.locationData = data;
    
    data2.timelineObjects.forEach((o) => {
      this.locationData.timelineObjects.push(o)
    });
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
    let marker = new mapboxgl.Marker()
    .setLngLat([10.40316447660307, 63.44198412217757])
    .addTo(map);
    this.addMarkers(map);
  }

  addMarkers(map) {
      this.locationData.timelineObjects.forEach((location) => {
        if(location.placeVisit) {
          new mapboxgl.Marker()
          .setLngLat([this.convertCoordinates(location.placeVisit.location.longitudeE7), this.convertCoordinates(location.placeVisit.location.latitudeE7)])
          .addTo(map)
        }
        //Handle activity segments for future work
      });
  }

  convertCoordinates(coordinate) {
    let stringCor = String(coordinate);
    let converted = parseFloat(stringCor.substring(0, stringCor.length - 7).concat(".", stringCor.substring(stringCor.length - 7)));
    return converted;
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          <Slider/>
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default Mapbox;