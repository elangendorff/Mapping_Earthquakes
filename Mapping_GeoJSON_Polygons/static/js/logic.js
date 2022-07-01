// Create the map object with a center and zoom level.
let map = L.map("mapid", {
        center: [43.7, -79.3],   // Toronto
        zoom: 11
    });

// Create tile layers for map background
// The makeTileLayer function is defined in `tilefunctions.js`.

let streets = makeTileLayer("streets");
let satelliteStreets = makeTileLayer("satellite-streets");

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Add default tile layer to map.
baseMaps["Streets"].addTo(map);

// Pass map layers into layers control.
L.control.layers(baseMaps, undefined, {collapsed: false}).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/elangendorff/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let styleOptions = {
    color: "blue",
    weight: 1,
    fillColor: "yellow"
}

// Grab GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: styleOptions,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>Neighborhood: ${feature.properties.AREA_NAME}`);
        }
    }).addTo(map);
});

