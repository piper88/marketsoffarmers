(function(module) {

  function Details (opts) {
    this.Address = opts.Address;
    this.Schedule = opts.Schedule.slice(0, opts.Schedule.length - 12);
    this.Products = opts.Products;
  }

  Details.all = [];

  Details.getData = function(id) {
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
      dataType: 'jsonp',
      success: function(detaileddata) {
        for (var key in detaileddata) {
          //this inserts detail records properly into websql, but doesn't keep adding details of multiple markets (only has one market details at a time)
          Details.all = detaileddata[key];
          //this one properly keeps all market details in the Details.all array, but doesn't result in proper insertion of the detail records into websql
          // Details.all.push(detaileddata[key]);
        }
        var detail = new Details(Details.all);
        detail.insertDetails();
        $('.' + id).append(detail.toHtml());
      }
    });
  };

  Details.createTable = function(next) {
    console.log('creating details table');
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS detaildata (' +
        'id INTEGER PRIMARY KEY, ' +
        'Address VARCHAR(255),' +
        'Schedule VARCHAR(255),' +
        'Products VARCHAR(500)); '
    );
    // Details.marketClicked();
  };

  Details.prototype.insertDetails = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO detaildata (Address, Schedule, Products) VALUES (?, ?, ?);',
          'data': [this.Address, this.Schedule, this.Products],
        }
      ]
    );
  };

//should also eventually go in views, I think...
  Details.prototype.toHtml = function(id) {
    // detailView.showDetails(id);
    var source = $('#market-details').html();
    var template = Handlebars.compile(source);
    return template(this);
  };

  Details.createTable();
  // Details.marketClicked();

  module.Details = Details;
})(window);
