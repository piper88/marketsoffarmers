(function(module) {
  var mainController = {};

  mainController.passToDetails = function() {
    Market.all.forEach(function(result) {
      Details.getData(result.id);
    });
  };

//passes control from markets to details, by passing the id of what the user clicks
  mainController.showMarkets = function() {
    listView.compileMarkets();
    // console.log('in addDetailListener');
    // $('.list-display').on('click', '.show-less', function(ctx) {
    //   console.log('clicked on show-less');
    //   $(this).hide();
    //   $(this).parent().find('.show-more').show();
    //   $('section').find($('.' + ctx.toElement.id).empty());
    // });
    // $('.list-display').on('click', '.show-more', function(ctx) {
    //   console.log('clicked on ' + ctx.toElement.id);
    //   $(this).hide();
    //   $(this).parent().find('.show-less').show();
    //   $('.' + ctx.toElement.id).append(detail.toHtml());
    //   // Details.getData(ctx.toElement.id);
    // });
  };

  module.mainController = mainController;
})(window);

//the controllers are called ONLY by the routes? and then the controllers call the views and models?
//or maybe you just have to pass the ctx object along when you go between files??
