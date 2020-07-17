mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vbmtzIiwiYSI6ImNrY25tejNieDBjcnQyeG9hYXVpaDJ0bTEifQ.MtLUnEF6o2dfQFUk1AIilw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-75.500175, 43.7265323],
});

// Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [store.location.coordinates[1], store.location.coordinates[0]],
      },
      properties: {
        storeId: store.storeId,
        icon: "farm",
        // icon: "shop",
      },
    };
  });

  // console.log(stores);
  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  console.log(stores);
  map.on("load", function () {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getStores();
