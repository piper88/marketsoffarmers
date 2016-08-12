(function(module) {
  var myMap = {};

  var stylesArray = [
    {
      featureType: "all",
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },
    {
      // turns off road labels
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

//properties that will live on map object when initialized
  var mapOptions = {
    zoom: 12,
    styles: stylesArray,
    center: new google.maps.LatLng(47.618217, -122.351832),
    mapTypeId: google.maps.MapTypeId.STREET,
    zoomControl: true,
    zoomControlOptions: {
      //specifies where + and - for zooming will be located on page
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };

//define/instantiate the actual map
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

//attach listener so center of map stays the center even on resize
  google.maps.event.addDomListener(window, 'resize', function() {
    //sets center to where map is currently centered
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });

  myMap.dropPins = function(latitude, longitude) {
    console.log('dropping pin');
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      animation: google.maps.Animation.DROP,
      map: map
    });
  };

  myMap.resetCenter = function(middleArrayAddress) {
    console.log(middleArrayAddress);
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + middleArrayAddress + '&key=AIzaSyAmRBpethxWhkGO2BxwEDmdQd6hDv84fhA', function(data) {
      console.log(data);
      myMap.lat = data.results[0].geometry.location.lat;
      myMap.lng = data.results[0].geometry.location.lng;
      mapOptions.center = new google.maps.LatLng(myMap.lat, myMap.lng);
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    });
  };

  myMap.requestCoordinates = function (address) {
    console.log('entering theMap.requestLocation', address);
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAmRBpethxWhkGO2BxwEDmdQd6hDv84fhA', function(data) {
      myMap.lat = data.results[0].geometry.location.lat;
      myMap.lng = data.results[0].geometry.location.lng;
      myMap.dropPins(myMap.lat, myMap.lng);
    });
  };

  module.myMap = myMap;
})(window);
