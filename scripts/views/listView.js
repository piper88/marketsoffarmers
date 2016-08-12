(function(module) {
  var listView = {};

  listView.compileMarkets = function(market) {
    console.log('about to append');
    Details.all.forEach(function(market) {
      var marketToDisplay = Handlebars.compile($('#list-of-markets').html());
      ($('#' + market.id).append(marketToDisplay(market)));
    });
  };

  module.listView = listView;
})(window);
