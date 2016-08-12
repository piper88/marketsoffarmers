(function(module) {
  var listView = {};

  listView.compileMarkets = function(market) {
    console.log(Details.all[4].Address);
    myMap.resetCenter(Details.all[4].Address);
    Details.all.forEach(function(market) {
      var marketToDisplay = Handlebars.compile($('#list-of-markets').html());
      ($('#' + market.id).append(marketToDisplay(market)));
      myMap.requestCoordinates(market.Address);
    });
  };

  module.listView = listView;
})(window);
