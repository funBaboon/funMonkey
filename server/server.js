
(function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var path = require('path');
  var app = express();
  var http = require('http');
  var ebayController = require('./controllers/ebayController.js');
  var amazonController = require('./controllers/amazonController.js')
  var walmartController = require('./controllers/walmartController.js')


  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../client')));

  var port = process.env.PORT || 1337;

  app.get('/api/amazon/:query', amazonController.queryAmazon);
  app.get('/api/ebay/:query', ebayController.queryEbay);
  app.get('/api/ebay/topSelling', ebayController.topSelling);
  app.get('/api/walmart/:query', walmartController.queryWalmart);
  app.get('/api/walmart/trending', walmartController.trendingWalmart);


  app.listen(port, function() {
    console.log('server up & running on port ', port);
  });

})();