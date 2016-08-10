(function(module) {

  function Details (opts) {
    this.Address = opts.Address;
    this.Schedule = opts.Schedule.slice(0, opts.Schedule.length - 12);
    this.Products = opts.Products;
  }

  Details.all = [];

  //first have to create the Market object WITH id AND details, and then push to an array, so you have an array of objects

  //JOIN websql tables by id, to get new table with id, name, distance, and details

  Details.getData = function(id) {
    console.log('in Details.getData');
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
      dataType: 'jsonp',
      success: function(detaileddata) {
        console.log('detail success');
        var market = new Details(detaileddata.marketdetails);
        market.insertDetails();
        // market.showDetails();
      }
    });
  };

  Details.prototype.showDetails = function(oneMarket) {
    $('.list-display').on('click', '.show-more', function(detail) {
      console.log(detail);
      $(this).hide();
      $(this).parent().find('.show-less').show();
      $('.' + detail.toElement.id).append(detail.toHtml());
      // Details.getData(ctx.toElement.id);
    });
  };

  Details.createTable = function(next) {
    console.log('creating details table');
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS detaildata (' +
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
    Details.joinTables();
  };

  Details.joinTables = function() {
    webDB.execute('SELECT marketdata.marketname, marketdata.id, marketdata.distance, detaildata.Address, detaildata.Schedule, detaildata.Products FROM detaildata INNER JOIN marketdata ON marketdata.rowid=detaildata.rowid', function(rows) {
      Details.all = rows;
    });
    Details.renderToPage();
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
