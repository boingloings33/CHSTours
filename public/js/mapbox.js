/* eslint-disable*/
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVwdHIzMyIsImEiOiJjbHMydXk1YjcwcHlhMmtsZGxjcjIyc296In0.V7wsjCmjN2D76L2ywzVByw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/neptr33/cls2vj0nl01u501o87wdv8dw5', // style URL
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 150,
    right: 100,
  },
});
