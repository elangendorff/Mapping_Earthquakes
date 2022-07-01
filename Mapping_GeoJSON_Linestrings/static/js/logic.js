// Create the map object with a center and zoom level.
let map = L.map("mapid", {
        center: [43.6772003174, -79.63059997559999],   // Toronto
        zoom: 2
    });

// Create tile layers for map background
// The makeTileLayer function is defined in `tilefunctions.js`.

let day = makeTileLayer("day");
let night = makeTileLayer("night");

// Create a base layer that holds both maps.
let baseMaps = {
    Day: day,
    Night: night
};

// Add default tile layer to map.
Object.values(baseMaps)[1].addTo(map);

// Pass map layers into layers control.
L.control.layers(baseMaps, undefined, {collapsed: false}).addTo(map);

// Accessing the airport GeoJSON URL
// NOTE: Due to `airportData`'s size, load it *after* the `tileLayer()`
// method to ensure that the map gets loaded before the data is added to it.
let airportData = "https://raw.githubusercontent.com/elangendorff/Mapping_Earthquakes/main/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/elangendorff/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let lineStyle = {
    color: "lightyellow",
    weight: 2
}

// Grab GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: lineStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>Airline: ${feature.properties.airline}</h2><hr><h3>Destination: ${feature.properties.dst}</h3>`);
        }
    }).addTo(map);
});

