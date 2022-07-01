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
            return 'mapbox/outdoors-v11';
        case "light":
            return 'mapbox/light-v10';
        case "dark":
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
