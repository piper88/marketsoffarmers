(function(module) {

  function Market (opts) {
    this.id = opts.id;
    console.log(opts.id);
    this.marketname = opts.marketname.slice(4);
    this.distance = opts.marketname.slice(0,3);
  };

//Market.all contains id and name of market
  Market.all = [];
  //store id's of all 10 markets, so you can drop pins at these locations
  // Market.marketId = [];

  Market.getData = function(zip) {
    // myMap.initAutocomplete();
    $('#list-container').empty();

    $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,

      dataType: 'jsonp',
      success: function(data) {
        console.log('success');
        Market.all = data;
        Market.all = Market.all.results.slice(0,10);
        Market.all.forEach(function(singleMarket) {
          var market = new Market(singleMarket);
          market.insertPermit();
          //maybe this append part should eventually go in views somehow?
          $('#list-container').append(market.toHtml());
        });
        Market.handoverToController();
      }

    });

  };

//if you want to call a method on an object or array in different js file, must wrap in method on an array within that js file?
  Market.handoverToController = function() {
    //call Details.getData on each market
    mainController.passToDetails();
  };

  Market.createTable = function(next) {
    console.log('inside Market.createTable');
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS marketdata (' +
        'id VARCHAR(255), ' +
        'marketname VARCHAR(255), ' +
        'distance FLOAT); '
    );
    Market.findMarketsByZip();
  };

  Market.findMarketsByZip = function() {
    // webDB.execute('DELETE * from marketdata');
    $('#formiepoo').on('submit', function(e) {
      e.preventDefault();
      // myMap.initAutocomplete();
      webDB.execute('SELECT * from marketdata', function(rows) {
        if (rows.length) {
          webDB.execute('DELETE from marketdata');
        }
      });
      webDB.execute('SELECT * from detaildata', function(rows) {
        if (rows.length) {
          webDB.execute('DELETE from detaildata');
        }
      });

      var chosenZip = $('#zip').val();
      if (chosenZip.length === 0) {
        console.log('zip is not present');
        Market.getData(98103);
      } else {
        console.log('zip chosen is' + chosenZip);
        Market.getData(chosenZip);
      }
      // searchBox.addListener();
    });
  };

//eventually sort permits by distance, before inserting
  Market.prototype.insertPermit = function () {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO marketdata (id, marketname, distance) VALUES (?, ?, ?);',
          'data': [this.id, this.marketname, this.distance],
        }
      ]
    );
  };

//should eventually go in views
//compile it in the views, and then append the result of calling a method on like details. or Market.
//but I think anything on the prototype has to stay within the file with that object
  Market.prototype.toHtml = function() {
    var source = $('#market-name').html();
    var template = Handlebars.compile(source);
    return template(this);
  };

//put this line in the marketController file...perhaps correct, perhaps not
  Market.createTable();
  //Map.initAutocomplete();

  module.Market = Market;
})(window);
