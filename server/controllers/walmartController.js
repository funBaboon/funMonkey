(function() {
  var Walmart = require('../keys/walmartKeys.js')
  var request = require('request');

  function queryWalmart(req,res) {
    request('http://api.walmartlabs.com/v1/search?query=' + req.params.query + '&format=json&apiKey=' + Walmart.secret.Key,
      function(error, response, body) {
        var result = JSON.parse(response.body);
        console.log(result.items.length)
        res.json(result.items);
      })
  }

  module.exports.queryWalmart = queryWalmart;

})();
