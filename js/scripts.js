mapboxgl.accessToken = 'pk.eyJ1Ijoid3NoZW55YyIsImEiOiJja2w3YjNvd3YxZnc1Mm5wZWp1MnVqZGh2In0.-wG4LWFGN76Nf-AEigxu2A';


var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [6.788837657629339, 39.828117667000484], // starting position [lng, lat]
  zoom: 0.5 // starting zoom
});


//Displaying country names with code from: https://docs.mapbox.com/mapbox-gl-js/example/display-and-style-rich-text-labels/
map.on('load', function () {
  map.setLayoutProperty('country-label', 'text-field', [
    'format',
    ['get', 'name_en'],
    { 'font-scale': 1.2 },
    '\n',
    {},
    ['get', 'name'],
    {
      'font-scale': 0.8,
      'text-font': [
        'literal',
        ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
      ]
    }
  ]);
});


// add a navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

$.getJSON('./data/astraeagrantees.json', function(grantees) {

  grantees.forEach(function(granteePartner) {

    var html = `
      <div>
        <h3>${granteePartner.name}</h3>
        <p>${granteePartner.description}</p>
        <h3><a href="${granteePartner.contact}" target="_blank">Organization Website</a></h3>
      </div>
    `

    new mapboxgl.Marker({
      color: 'steelblue'
    })
      .setLngLat([granteePartner.longitude, granteePartner.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(html)) // add popup
      .addTo(map);
  })
});
