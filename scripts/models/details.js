(function(module) {

  //set up a view file that renders all the market data to the page at  the same time, and just set dispaly to hidden until they click show more. Don't compile and render in markets.js anymore

  function Details (opts) {
    this.Address = opts.Address;
    this.Schedule = opts.Schedule.slice(0, opts.Schedule.length - 12);
    this.Products = opts.Products;
  }

  Details.all = [];

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
      }
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
    webDB.execute('SELECT * FROM detaildata', function(rows) {
      if (rows.length === 10) {
        Details.joinTables(mainController.showMarkets);
      }
    });
  };

  Details.joinTables = function(next) {
    webDB.execute('SELECT marketdata.marketname, marketdata.id, marketdata.distance, detaildata.Address, detaildata.Schedule, detaildata.Products FROM detaildata INNER JOIN marketdata ON marketdata.rowid=detaildata.rowid', function(rows) {
      Details.all = rows;
      next();
    });
  };


  Details.createTable();

  module.Details = Details;
})(window);
