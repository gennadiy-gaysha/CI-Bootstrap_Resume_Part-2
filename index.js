// The initMap function is defined. This function serves as the entry
// point for initializing the Google Map and marker clustering.
function initMap() {
  // Inside the initMap function, a new instance of the google.maps.Map
  // class is created. It selects the HTML element with the ID "map" and
  // sets the initial zoom level and center coordinates of the map.
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: {
      // lat: 46.619261,
      // lng: -33.134766,
      lat: 40.785091,
      lng: -73.968285,
    },
  });

  // An array named locations is declared, which contains objects representing
  // the latitude and longitude coordinates of different locations on the map.
  // In this example, there are three locations specified.
  const locations = [
    { lat: 40.785091, lng: -73.968285 },
    { lat: 41.084045, lng: -73.874245 },
    { lat: 40.754932, lng: -73.948016 },
  ];

  // The map array is created using the map method on the locations array. It creates
  // an array of markers based on the provided locations array. For each location, a new
  // google.maps.Marker object is created with the corresponding latitude and longitude.
  // The label property of the marker is set to an alphabetical character based on the
  // index of the location in the locations array.
  const markers = locations.map(function (location, i) {
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });

  // A new instance of the MarkerClusterer class is created. It takes two arguments:
  // the map object and the markers array. This will cluster the markers on the map
  // according to their proximity.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

window.initMap = initMap;
