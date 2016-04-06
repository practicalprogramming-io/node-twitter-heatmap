(function () {

  var basemap
    , cartoDB
    , dataLayer
    , map
    , socket
  ;

  layer = L.layerGroup();

  map = L.map('map', {layers: [layer]}).fitWorld().zoomIn();

  cartoDB = 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png';

  base = L.tileLayer(cartoDB, {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Op'
      + 'enStreetMap</a> contributors, &copy; <a href="http://cartodb.com/at'
      + 'tributions">CartoDB</a>'
  });

  map.addLayer(base);

  socket = io('http://localhost:3000');

  socket.on('tweet', function (data) {

    var icon = new L.divIcon({
      className: 'tweet-marker',
      iconSize: [5, 5]
    });

    layer.addLayer(
      L.marker([data.coordinates[1], data.coordinates[0]], {icon: icon})
    );

  });

})();
