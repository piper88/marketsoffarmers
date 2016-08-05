(function(module) {
  var marketController = {};

//doesn't actually do anything yet.
  marketController.loadMarketsByZip = function() {
    console.log('in marketController.loadMarketsByZip');
    Market.createTable();
  };

  module.marketController = marketController;
})(window);
