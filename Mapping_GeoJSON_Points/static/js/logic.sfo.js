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
        center: SFAirport.features[0].geometry.coordinates.slice().reverse(),   // `.reverse()` alters an array in-place. We don't want to alter the original,
                                                                                // so `.slice()` is present to create a copy that is safe to reverse.
        zoom: 10
    });

// Create tile layer for map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        // Mapbox styles. See https://docs.mapbox.com/api/maps/styles/
        // id: 'mapbox/streets-v11',
        id: 'mapbox/outdoors-v11',
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

// Add 'graymap' tile layer to map.
streets.addTo(map);

// // Grabbing our GeoJSON data.
// L.geoJSON(SFAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {                                   // `pointToLayer` passes each element of `SFAirport`'s `features`
//                                                                                 // array into the anonymous `function` as `feature`. It also
//                                                                                 // extracts that `feature`'s `feature.geometry.coordinates` array
//                                                                                 // and parses it into a {lat: coordinates[0], lng: coordinates[1]}
//                                                                                 // object, which it then passes into the anonymous function as `latlng`.
//         console.log(feature);
//         // console.log(feature.geometry.coordinates);
//         // console.log(latlng);
//         return L.marker(latlng)
//         .bindPopup(`<h2>${feature.properties.name}</h2><hr><h3>${feature.properties.city}, ${feature.properties.country}</h3>`);
//     }
// }).addTo(map);

// Grabbing our GeoJSON data.
L.geoJSON(SFAirport, {
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) {                                       // `layer` is some kind of monstrous… *thing*. O_o
        console.log(layer);
        layer.bindPopup(`<h2>Airport Code: ${feature.properties.faa}</h2><hr><h3>Airport name: ${feature.properties.name}</h3>`);
    }
}).addTo(map);

