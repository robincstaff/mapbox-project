var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW5jcyIsImEiOiJja25tNWdtbGcwb3p5MnNuMHlqaTN0emQxIn0.NnfO1gt2sCMYDF_Mag8q6g';
var map = new mapboxgl.Map({
  container: 'YOUR_CONTAINER_ELEMENT_ID',
  style: 'mapbox://styles/mapbox/streets-v11'
});
