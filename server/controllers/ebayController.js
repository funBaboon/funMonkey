(function() {

  var request = require('request');

  function queryEbay(req,res) {
    console.log(req.params.query)
    request('http://open.api.ebay.com/shopping?&version=951&appid=&callName=FindProducts&QueryKeywords=' + req.params.query,
      function(error, response, body) {
      res.json(response)
      })
  }

  module.exports.queryEbay = queryEbay;

})();
