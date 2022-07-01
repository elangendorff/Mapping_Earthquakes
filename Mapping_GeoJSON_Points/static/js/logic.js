// Add console.log to check to see if our code is working.
console.log("working");

// Add GeoJSON data.
let SFAirport = {
    "type":"FeatureCollection",
    "features":[{
        "type":"Feature",
        "properties":{
            "id":"3469",
            "name":"San Francisco International Airport",
            "city":"San Francisco",
            "country":"United States",
            "faa":"SFO",
            "icao":"KSFO",
            "alt":"13",
            "tz-offset":"-8",
            "dst":"A",
            "tz":"America/Los_Angeles"
        },
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]
        }
    }]
};

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
        center: [30, 30],   // roughly Earth map center
        zoom: 2
    });

// Create tile layers for map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        // Mapbox styles. See https://docs.mapbox.com/api/maps/styles/
        id: 'mapbox/streets-v11',
        // id: 'mapbox/outdoors-v11',
        // id: 'mapbox/light-v10',
        // id: 'mapbox/dark-v10',
        // id: 'mapbox/satellite-v9',
        // id: 'mapbox/satellite-streets-v11',
        // id: 'mapbox/navigation-day-v1',
        // id: 'mapbox/navigation-night-v1',
        // tileSize: 512,
        // zoomOffset: -1,
        accessToken: API_KEY
    });

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        // Mapbox styles. See https://docs.mapbox.com/api/maps/styles/
        // id: 'mapbox/streets-v11',
        // id: 'mapbox/outdoors-v11',
        // id: 'mapbox/light-v10',
        id: 'mapbox/dark-v10',
        // id: 'mapbox/satellite-v9',
        // id: 'mapbox/satellite-streets-v11',
        // id: 'mapbox/navigation-day-v1',
        // id: 'mapbox/navigation-night-v1',
        // tileSize: 512,
        // zoomOffset: -1,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Add default tile layer to map.
streets.addTo(map);

// Pass map layers into layers control.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
// NOTE: Due to `airportData`'s size, load it *after* the `tileLayer()`
// method to ensure that the map gets loaded before the data is added to it.
let airportData = "https://raw.githubusercontent.com/elangendorff/Mapping_Earthquakes/main/majorAirports.json";

// Grab GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // We turn each feature into a marker on the map.
        onEachFeature: function(feature, layer) {                                       // `layer` is some kind of monstrous… *thing*. O_o
            console.log(layer);
            layer.bindPopup(`<h2>Airport Code: ${feature.properties.faa}</h2><hr><h3>Airport name: ${feature.properties.name}</h3>`);
        }
    }).addTo(map);
});

