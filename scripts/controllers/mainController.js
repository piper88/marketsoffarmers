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
    $('.list-display').on('click', '.show-less', function(ctx) {
      console.log('clicked on show-less');
      console.log($(this));
      $(this).hide();
      $(this).parent().find('.show-more').show();
      $(this).parent().find('#details').hide();
    });
    $('.list-display').on('click', '.show-more', function(ctx) {
      console.log('clicked on ' + ctx.toElement.id);
      console.log($(this));
      $(this).hide();
      $(this).parent().find('.show-less').show();
      //when they click on show-more, set display to show of h6 elements
      $(this).parent().find('#details').show();
    });
  };

  module.mainController = mainController;
})(window);

//the controllers are called ONLY by the routes? and then the controllers call the views and models?
//or maybe you just have to pass the ctx object along when you go between files??
