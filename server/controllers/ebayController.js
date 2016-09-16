(function() {
  var ebayKeys = require('../keys/ebayKeys.js')
  var request = require('request');

  function queryEbay(req,res) {
    request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords' +
            '&SERVICE-NAME=FindingService' +
            '&SERVICE-VERSION=1.0.0' +
            '&GLOBAL-ID=EBAY-US' +
            '&SECURITY-APPNAME=' + ebayKeys.ebayKeys.appID +
            '&RESPONSE-DATA-FORMAT=JSON' +
            '&REST-PAYLOAD' +
            '&keywords=' + req.params.query,
      function(error, response, body) {
        var result = JSON.parse(response.body)
        console.log(result.findItemsByKeywordsResponse[0].searchResult[0].item);
        res.send(result.findItemsByKeywordsResponse[0].searchResult[0].item);
      })
  }

  function topSelling(req,res) {
    request('http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getTopSellingProducts&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=' + ebayKeys.ebayKeys.appID + '&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&maxResults=10',
      function(error, response, body) {
        var result = JSON.parse(response.body);
        res.json(result);
    })
  }

  module.exports.queryEbay = queryEbay;
  module.exports.topSelling = topSelling;
})();


