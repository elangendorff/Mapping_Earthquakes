// Create tile layers for map background
// The makeTileLayer function is defined in `tilefunctions.js`.

let streets = makeTileLayer("streets");
let satelliteStreets = makeTileLayer("satellite-streets");

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Add default tile layer to map.
// streets.addTo(map);

// Create map object
let map = L.map("mapid", {
    center: [39.5, -98.5],   // Approximate US geographic center
    zoom: 3,
    layers: [streets]
});

// Pass map layers into layers control.
L.control.layers(baseMaps, undefined, {collapsed: false}).addTo(map);

// Accessing past-7-days earthquake data.
const quakeData = {
    "all":          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
    "m1.0plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson",
    "m2.5plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
    "m4.5plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
    "significant":  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
}

// Grab GeoJSON data.
d3.json(quakeData["all"]).then(function(data) {
    // console.log(data);
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            // console.log(feature);
            return L.circleMarker(latlng);
        },
        style: styleOptions2,
        // onEachFeature: function(feature, layer) {
        //     layer.bindPopup(`<h2>Neighborhood: ${feature.properties.AREA_NAME}`);
        // }
    }).addTo(map);
});

