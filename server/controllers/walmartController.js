(function() {
  var Walmart = require('../keys/walmartKeys.js')
  var request = require('request');

  function queryWalmart(req,res) {
    request('http://api.walmartlabs.com/v1/search?query=' +
             req.params.query +
             '&format=json&apiKey=' +
             Walmart.secret.Key,
      function(error, response, body) {
        if(error){
          console.log('error in queryWalmart');
        } else {
          var result = JSON.parse(response.body);
          res.json(result.items);
        }
      });
  }

  function trendingWalmart(req,res) {
    request ('http://api.walmartlabs.com/v1/trends?apiKey=' + Walmart.secret.Key +
             '&format=json',
      function(error, response, body) {
        if(error) {
          console.log('error in trendingWalmart');
        } else{
          console.log('getting to trend')
          var result = JSON.parse(response.body);
          res.json(result.items);
        }
    })
  }

  module.exports.queryWalmart = queryWalmart;
  module.exports.trendingWalmart = trendingWalmart;

})();