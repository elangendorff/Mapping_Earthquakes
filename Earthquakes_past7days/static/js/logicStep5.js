// Constants and custom functions are defined in `resources.js`.

// Create tile layers for map background
let streets = makeTileLayer("streets");
let satelliteStreets = makeTileLayer("satellite-streets");

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create earthquake layer
let earthquakes = new L.layerGroup();   // `new` ?!?

// Object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};

// Create map object
let map = L.map("mapid", {
    center: [39.5, -98.5],  // Approximate US geographic center
    zoom: 3,
    layers: [streets]       // Default layer(s)
});

// Pass map layers into layers control.
L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(map);

// Grab GeoJSON data.
d3.json(quakeData["all"]).then(function(data) {
    // console.log(data);
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            // console.log(feature);
            return L.circleMarker(latlng);
        },
        style: styleOptions3,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        }
    }).addTo(earthquakes);
    
    earthquakes.addTo(map);
    
    // Create legend control object
    let legend = L.control({
        position: 'bottomright'
    });
    
    // Add details for the legend
    legend.onAdd = function () {
        
        let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0, 1, 2, 3, 4, 5];
        // `colors` is defined in `functions.js`
        
        // Loop through magnitude intervals to generate a label with a colored square for each interval.
        for (let i = 0; i < magnitudes.length; ++i) {
            div.innerHTML +=
                '<i style="background:' + magColors[i+1] + '"></i>' +
                magnitudes[i] + ( magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+' );
        }
        
        return div;
    };
    
    legend.addTo(map);
});
