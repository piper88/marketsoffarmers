(function(module) {

  //set up a view file that renders all the market data to the page at  the same time, and just set dispaly to hidden until they click show more. Don't compile and render in markets.js anymore

  function Details (opts) {
    if (opts.Schedule === 'Unavailable') {
      this.Schedule = opts.Schedule;
    } else {
      this.Schedule = opts.Schedule.slice(0, opts.Schedule.length - 12);
    }
    this.Address = opts.Address;
    this.Products = opts.Products;
  }

  Details.all = [];

  Details.getData = function(id) {
    console.log('Details.getData');
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
      dataType: 'jsonp',
      success: function(detaileddata) {
        console.log('successfully got detail data by id');
        var validSchedule = parseInt((new Date() - new Date(detaileddata.marketdetails.Schedule.slice(14, 24)))/60/60/24/1000);
        if (validSchedule < 0 || typeof validSchedule != "number") {
          detaileddata.marketdetails.Schedule = detaileddata.marketdetails.Schedule;
        } else {
          detaileddata.marketdetails.Schedule = 'Unavailable';
        }
        var validProducts = detaileddata.marketdetails.Products;
        if (validProducts.length > 0) {
          detaileddata.marketdetails.Products = detaileddata.marketdetails.Products;
        } else {
          detaileddata.marketdetails.Products = 'Unavailable';
        };
        // Details.all = detaileddata.marketdetails;
        // Details.all.forEach(function(marketDetails) {
        //   var market = new Details (marketDetails);
        //   market.insertDetails();
        // });
        var market = new Details(detaileddata.marketdetails);
        //need to empty out websql, and then insert?
        // Market.clearMarketsAndDetails();
        market.insertDetails();
      }
    });
  };

  Details.createTable = function(next) {
    console.log('Details.createTable');
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS detaildata (' +
        'Address VARCHAR(255),' +
        'Schedule VARCHAR(255),' +
        'Products VARCHAR(500)); '
    );
  };

  Details.prototype.insertDetails = function() {
    console.log('Details.insertDetails');
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
    console.log('Details.joinTables');
    webDB.execute('SELECT marketdata.marketname, marketdata.id, marketdata.distance, detaildata.Address, detaildata.Schedule, detaildata.Products FROM detaildata INNER JOIN marketdata ON marketdata.rowid=detaildata.rowid', function(rows) {
      Details.all = rows;
      next();
    });
  };

  Details.createTable();

  module.Details = Details;
})(window);
