(function(module) {
  var mainController = {};

  mainController.passToDetails = function() {
    console.log('mainController.passToDetails');
    Market.all.forEach(function(result) {
      Details.getData(result.id);
    });
  };

//passes control from markets to details, by passing the id of what the user clicks
  mainController.showMarkets = function() {
    console.log('mainController.showMarkets');
    listView.compileMarkets();
    $('.markets').on('click', function() {
      $(this).find('#details').toggle();
      $(this).find('.show-less').toggle();
      $(this).find('.show-more').toggle();
    }); 
  };

  module.mainController = mainController;
})(window);

//the controllers are called ONLY by the routes? and then the controllers call the views and models?
//or maybe you just have to pass the ctx object along when you go between files??
