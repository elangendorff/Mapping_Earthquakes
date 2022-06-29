// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView(   // `.setview()` is the "simple" method; a more flexible version is used below.
//         [40.7, -94.5],              // map center, latitude and longitude
//         4                           // zoom level (0–18)
//     );

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
        center: [
            40.7, -94.5
        ],
        zoom: 4
    });

// Create tile layer for map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
// Add 'graymap' tile layer to map.
streets.addTo(map);

//  Add marker to map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);     // Basic pin-style marker
// let marker = L.circle([34.0522, -118.2437], {    // radius for `circle()` is in meters
//         // radius: 100,
//         radius: 300,
//         color: "black",
//         fillColor: "lightyellow",
//     }).addTo(map);

// let marker = L.circleMarker([34.0522, -118.2437], { // radius for `circleMarker` is in pixels
//         radius: 300,
//         color: "black",
//         // fillColor: "lightyellow",
//         fillColor: "#FFFFA1",
//     }).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
        console.log(city);
        // L.marker(city.location)
        L.circleMarker(city.location, { // radius for `circleMarker` is in pixels
            radius: city.population / 200000,
            color: "orange",
            weight: 4,
            // dashArray: "5,7"  // gap-length, dash-length
        })
        .bindPopup(`<h2>${city.city}, ${city.state}</h2> <hr> <h3>Population ${city.population.toLocaleString()}</h3>`)
        .addTo(map);
    });

