// Past-7-days earthquake data.
const quakeData = {
    "all":          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
    "m1.0plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson",
    "m2.5plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
    "m4.5plus":     "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
    "significant":  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
}

function mapStyle(style) {
    // Mapbox styles. See https://docs.mapbox.com/api/maps/styles/
    switch (style) {
        case "streets":
        case "str":
            return 'mapbox/streets-v11';
        case "outdoors":
        case "outd":
        case "out":
            return 'mapbox/outdoors-v11';
        case "light":
        case "lt":
            return 'mapbox/light-v10';
        case "dark":
        case "dk":
            return 'mapbox/dark-v10';
        case "satellite":
        case "sat":
            return 'mapbox/satellite-v9';
        case "satellite-streets":
        case "sat-str":
            return 'mapbox/satellite-streets-v11';
        case "navigation-day":
        case "nav-day":
        case "day":
            return 'mapbox/navigation-day-v1';
        case "navigation-night":
        case "nav-night":
        case "night":
            return 'mapbox/navigation-night-v1';
        default:
            return 'mapbox/streets-v11';
    }
}

// // Generic tile layer
// let generic = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     // Mapbox styles. See https://docs.mapbox.com/api/maps/styles/
//     id: 'mapbox/streets-v11',
//     // id: 'mapbox/outdoors-v11',
//     // id: 'mapbox/light-v10',
//     // id: 'mapbox/dark-v10',
//     // id: 'mapbox/satellite-v9',
//     // id: 'mapbox/satellite-streets-v11',
//     // id: 'mapbox/navigation-day-v1',
//     // id: 'mapbox/navigation-night-v1',
//     // tileSize: 512,
//     // zoomOffset: -1,
//     accessToken: API_KEY
// });

function makeTileLayer(style) {
    return L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: mapStyle(style),
        // tileSize: 512,
        // zoomOffset: -1,
        accessToken: API_KEY
    });
}

// Determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    return magnitude == 0 ? 1 : magnitude * 4;
}

function colorByMagnitude(magnitude, nonZeroColor, zeroColor) {
    return magnitude == 0 ? zeroColor : nonZeroColor;
}

// Array to hold color values based on earthquake magnitude
const magColors = [
    // Color names from https://www.color-name.com/
    // They range from green(ish) to (mostly) red
    "dimgray",
    "#98ee00", // Mango Green
    "#d4ee00", // Volt
    "#eecc00", // Yellow (Munsell)
    "#ee9c00", // Orange (RYB)
    "#ea822c", // Cadmium Orange
    "#ea2c2c"  // Permanent Geranium Lake
]

function styleOptions2(feature) {
    let magnitude = feature.properties.mag
    return {
        radius: getRadius(magnitude),
        // stroke: true,
        opacity: 1,
        weight: 0.5,
        // color: "#000000",
        // color: "black",
        color: colorByMagnitude(magnitude, "black", "red"),
        // fillColor: "#ffae42",
        fillOpacity: 1,
        fillColor: colorByMagnitude(magnitude, "#ffae42", "red")
    };
}

function styleOptions3(feature) {
    let magnitude = feature.properties.mag
    return {
        radius: getRadius(magnitude),
        // stroke: true,
        opacity: 1,
        weight: 0.5,
        // color: "#000000",
        // color: "black",
        color: colorByMagnitude(magnitude, "black", "red"),
        // fillColor: "#ffae42",
        fillOpacity: 1,
        fillColor: magColors[ magnitude > 6 ? 6 : Math.ceil(magnitude) ]
    };
}
