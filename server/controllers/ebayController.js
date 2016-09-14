(function() {
var ebayKeys = require("../keys/ebayKeys");

//EBAY SHOPPING API QUERY URL

function queryEbay (query){

  var ebayApiUrl = 'http://open.api.ebay.com/shopping?';
  var params = {
    version: 951,
    appid: ebayKeys.ebayKeys.appID,
    callName: 'FindProducts',
    QueryKeywords: query.split(' ').join('+')
  }
}

module.exports
})();