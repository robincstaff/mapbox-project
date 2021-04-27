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
    this.updateMarkers = this.updateMarkers.bind(this)
    this.activeMarkers = []
    this.mapContainer = React.createRef();
    this.locationData = data;
    data2.timelineObjects.forEach((o) => {
      this.locationData.timelineObjects.push(o)
    });
    this.locationData.timelineObjects = this.locationData.timelineObjects.filter(this.validPlacevisit)
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
    let marker = new mapboxgl.Marker()
    .setLngLat([10.40316447660307, 63.44198412217757])
    .addTo(this.map);
    this.addMarkers();
  }

  createMarker(location){
    return new mapboxgl.Marker()
    .setLngLat([this.convertCoordinates(location.placeVisit.location.longitudeE7), this.convertCoordinates(location.placeVisit.location.latitudeE7)])
    .addTo(this.map)
  }

  addMarkers() {
      this.locationData.timelineObjects.forEach((location) => {
          const marker = this.createMarker(location);
          this.activeMarkers.push(marker);
        //Handle activity segments for future work
      });
  }

  withinInterval(selectedInterval, timestamp){
   if((selectedInterval[0].getTime() < timestamp) && (timestamp < selectedInterval[1].getTime())){
     return true;
   }
  return false;
  }

  validPlacevisit(location){
    if(location.placeVisit){
        return true;
    }    
    return false;
  }
  
  updateMarkers(selectedInterval){
    if(this.map == null) {
      return
    }
    this.activeMarkers.forEach((marker) => marker.remove());
    this.locationData.timelineObjects.forEach((location) => {
        if(this.withinInterval(selectedInterval, location.placeVisit.duration.startTimestampMs)){
          const marker = this.createMarker(location);
          this.activeMarkers.push(marker);
        }
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
          <Slider markerUpdate={this.updateMarkers}/>
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default Mapbox;