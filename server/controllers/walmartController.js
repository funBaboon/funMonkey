(function() {
  var Walmart = require('../keys/walmartKeys.js')
  var request = require('request');

  function queryWalmart(req,res) {
    request('http://api.walmartlabs.com/v1/search?query=' +
             req.params.query +
             '&format=json&apiKey=' +
             Walmart.secret.Key,
      function(error, response, body) {
        var result = JSON.parse(response.body);
        console.log(result.items.length)
        res.json(result.items);
      })
  }

  function trendingWalmart(req,res) {
    request ('http://api.walmartlabs.com/v1/trends?apiKey=' + Walmart.secret.Key + ' &lsPublisherId=xyz&format=json', function(error, response, body) {
      var result = JSON.parse(response.body);
      res.json(result.items);
      console.log(result.length)
    })
  }

  module.exports.queryWalmart = queryWalmart;
  module.exports.trendingWalmart = trendingWalmart;

})();
