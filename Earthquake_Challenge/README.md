# Overview

Display a map of recent earthquakes around the world.

## Considerations

Proper display of the map requires a Mapbox API key placed in `static/js/config.js` containing the code:
```
const API_KEY = "KEY GOES HERE";
```

## Challenge Extensions

Deliverable 1 asked for color breakdowns in 1-magnitude increments, topping out at magntude '5+'. Deliverable 2, however, then asked us to distinguish earthquakes of magnitude 6+. An additional bracket was therefore added to the legend to accommodate the new, higher threshold.

Because the two earthquake layers ('all' and 'major') use the same styling functions, those functions were moved outside of the layer-creation functions' code blocks so that the styling functions would be in-scope in both cases.