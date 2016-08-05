(function(module) {
  var marketController = {};

  marketController.loadMarketsByZip = function() {
    console.log('in marketController.loadMarketsByZip');
    Market.createTable();
  };

  module.marketController = marketController;
})(window);
