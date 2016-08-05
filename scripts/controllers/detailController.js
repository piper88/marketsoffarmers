(function(module) {
  var detailController = {};

//passes control from markets to details, by passing the id of what the user clicks
  detailController.addDetailListener = function() {
    console.log('in addDetailListener');
    $('.list-display').on('click', '.show-less', function(ctx) {
      console.log('clicked on show-less');
      $(this).hide();
      $(this).parent().find('.show-more').show();
      // $('.show-more').show();
      // $('.show-less').hide();
      $('section').find($('.' + ctx.toElement.id).empty());
    });
    $('.list-display').on('click', '.show-more', function(ctx) {
      console.log('clicked on show-more');
      $(this).hide();
      $(this).parent().find('.show-less').show();
      // $('.show-less').show();
      // $('.show-more').hide();
      Details.getData(ctx.toElement.id);
    });
  };

  $(this).parent().find('a.read-on').show();
    $(this).parent().find('a.show-less').hide();

  module.detailController = detailController;
})(window);

//the controllers are called ONLY by the routes? and then the controllers call the views and models?
//or maybe you just have to pass the ctx object along when you go between files??
