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

  //Instantiate acutal map, infoWindows, and add dom listener to stay on center
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var infoWindow = new google.maps.InfoWindow({maxWidth: 225});

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.tripper(map, 'resize');
    map.setCenter(center);
  });


 //---------------------------------------------------------------------------------------------------
//   //Add Searchbox, Autocomplete, to search by address

  var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(47.000000, -123.000000),
  new google.maps.LatLng(48.000000, -124.000000),

  myMap.initAutocomplete = function () {
    console.log('myMap.initAutocomplete');
    searchBoxOptions = {
      bounds: defaultBounds,
      types: ['address']
    };
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      console.log('what?');
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      $('#formiepoo').val('');
      Market.clearMarketsAndDetails();
      console.log('searchBox.addListener');
      var places = searchBox.getPlaces();
      var addressLat = places[0].geometry.viewport.f.f;
      var addressLng = places[0].geometry.viewport.b.b;
      Market.getDataByCoordinates(addressLat, addressLng);
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      map.setZoom(15);
    });
  });


//-----------------------------------------------------------------------------------------------------
//Drop pins and shit

  myMap.dropPins = function(latitude, longitude, market) {
    console.log('myMap.dropPins');
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      animation: google.maps.Animation.DROP,
      map: map
    });
    // console.log(market);
    var html = '<strong>' + market.marketname + '</strong> <br/>' + market.Address + '<br/>';
    google.maps.event.addListener(marker, 'click', function() {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        listView.highlightMarket(market);
      }
    });
  };

  myMap.resetCenter = function(middleArrayAddress) {
    console.log('myMap.resetCenter');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + middleArrayAddress + '&key=AIzaSyBjoe5awPREbRDM0Vhlg2GS73-SskZMnTM', function(data) {
      // console.log(data);
      myMap.lat = data.results[0].geometry.location.lat;
      myMap.lng = data.results[0].geometry.location.lng;
      mapOptions.center = new google.maps.LatLng(myMap.lat, myMap.lng);
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    });
  };

  myMap.requestCoordinates = function (market) {
    console.log('myMap.requestCoordinates');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + market.Address + '&key=AIzaSyBjoe5awPREbRDM0Vhlg2GS73-SskZMnTM', function(data) {
      myMap.lat = data.results[0].geometry.location.lat;
      myMap.lng = data.results[0].geometry.location.lng;
      myMap.dropPins(myMap.lat, myMap.lng, market);
    });
  };

  myMap.initAutocomplete();

  module.myMap = myMap;
})(window);
