(function() {
  var ebayKeys = require('../keys/ebayKeys.js')
  var request = require('request');

  function queryEbay(req,res) {
    request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords' +
            '&SERVICE-NAME=FindingService' +
            '&SERVICE-VERSION=1.0.0' +
            '&GLOBAL-ID=EBAY-US' +
            '&SECURITY-APPNAME=' + ebayKeys.Keys.appID +
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


  /*
  Ebay Fee Structure
  Listing fee: free for first 50 in month, $0.30 each for additional
  Final Value fee: 10% of total amount (including shipping) up to max of $750

  ------
  Amazon Fee Structure (Individual Selling Plan)
  Listing fee: $0.99 per item
  Final Value fee: 8-20% (For media: % of item price + $1.35, for non-media: % of item price + shipping)

  **(Business Selling Plan => no listing fee per item, but monthly subscription fee)

  ------
  Walmart Fee Structure
  **Need to apply to sell on Walmart, selection based on reputation, sales projection, and bullshit.
  JUST PURCHASE from here


  */




  module.exports.queryEbay = queryEbay;
  module.exports.topSelling = topSelling;
})();


