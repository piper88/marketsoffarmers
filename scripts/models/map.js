(function(module) {

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
    zoom: 15,
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

//add pin (marker), specify position and which map you want it on
  var marker = new google.maps.Marker({
    position: {lat:47.618217, lng:-122.351832},
    map: map
  });


  module.map = map;
})(window);
