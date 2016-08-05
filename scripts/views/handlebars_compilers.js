var zipCompiler = function(chosenZip) {
  var marketsToDisplay = Handlebars.compile($('#zip')).text();
  return marketsToDisplay(chosenZip);
};

//
// Market.prototype.toHtml = function() {
//   var source = $('#list-of-markets').html();
//   var template = Handlebars.compile(source);
//   return template(this);
// };
//
// var permitsCompiler = function(currentPermitsArray) {
//   var permitsToDisplay = Handlebars.compile($('#search-results-template').text());
//   return permitsToDisplay(currentPermitsArray);
// };
