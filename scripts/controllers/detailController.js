(function(module) {
  var detailController = {};

//passes control from markets to details, by passing the id of what the user clicks
  detailController.addDetailListener = function() {
    console.log('in addDetailListener');
    $('.list-display').on('click', '.show-less', function(ctx) {
      console.log('clicked on show-less');
      $('section').find($('.' + ctx.toElement.id).empty());
    });
    $('.list-display').on('click', '.show-more', function(ctx) {
      console.log('clicked on show-more');
      Details.getData(ctx.toElement.id);
    });
  };

  module.detailController = detailController;
})(window);

//the controllers are called ONLY by the routes? and then the controllers call the views and models?
//or maybe you just have to pass the ctx object along when you go between files??
