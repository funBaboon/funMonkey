(function() {
  var ebayKeys = require('../keys/ebayKeys.js')
  var request = require('request');

  function queryEbay(req,res) {
    request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords' +
            '&SERVICE-NAME=FindingService' +
            '&SERVICE-VERSION=1.0.0' +
            '&GLOBAL-ID=EBAY-US' +
            '&SECURITY-APPNAME=' + ebayKeys.ebayKeys.appID +
            '&RESPONSE-DATA-FORMAT=XML' +
            '&REST-PAYLOAD' +
            '&keywords=' + req.params.query,
      function(error, response, body) {
      res.send(response.body);
      })
      // &version=951&appid=' + ebayKeys.ebayKeys.appID +'&callName=FindProducts&QueryKeywords=' + req.params.query,
  }

  module.exports.queryEbay = queryEbay;

})();
