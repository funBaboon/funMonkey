(function() {
  var ebayKeys = require('../keys/ebayKeys.js')
  var request = require('request');

  function queryEbay(req,res) {
    request('http://open.api.ebay.com/shopping?&version=951&appid=' + ebayKeys.ebayKeys.appID +'&callName=FindProducts&QueryKeywords=' + req.params.query,
      function(error, response, body) {
      res.json(response)
      })
  }

  module.exports.queryEbay = queryEbay;

})();
