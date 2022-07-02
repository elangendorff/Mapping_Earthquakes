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
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}

function colorByMagnitude(magnitude, nonZeroColor, zeroColor) {
    if (magnitude == 0) {
        return zeroColor;
    }
    return nonZeroColor;
}

function fillColorByMagnitude(magnitude) {
    // Color names from https://www.color-name.com/
    // They range from green to red
    switch (Math.ceil(magnitude)) {
        case 0:
            return "dimgray";
        case 1:
            return "#98ee00";   // Mango Green
        case 2:
            return "#d4ee00";   // Volt
        case 3:
            return "#eecc00";   // Yellow (Munsell)
        case 4:
            return "#ee9c00";   // Orange (RYB)
        case 5:
            return "#ea822c";   // Cadmium Orange
        default:
            return "#ea2c2c";   // Permanent Geranium Lake
    }
}

function styleOptions2(feature) {
    return {
        radius: getRadius(feature.properties.mag),
        // stroke: true,
        opacity: 1,
        weight: 0.5,
        // color: "#000000",
        // color: "black",
        color: colorByMagnitude(feature.properties.mag, "black", "red"),
        // fillColor: "#ffae42",
        fillOpacity: 1,
        fillColorByMagnitude: colorByMagnitude(feature.properties.mag, "#ffae42", "red")
    };
}

function styleOptions3(feature) {
    return {
        radius: getRadius(feature.properties.mag),
        // stroke: true,
        opacity: 1,
        weight: 0.5,
        // color: "#000000",
        // color: "black",
        color: colorByMagnitude(feature.properties.mag, "black", "red"),
        // fillColor: "#ffae42",
        fillOpacity: 1,
        fillColor: fillColorByMagnitude(feature.properties.mag)
    };
}
