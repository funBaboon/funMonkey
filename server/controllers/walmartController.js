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

  function clearanceWalmart(req,res) {
    request (
    //   'http://api.walmartlabs.com/v1/feeds/clearance?apikey=' + Walmart.secret.Key +
    //          // '&amp;categoryId=3944',
    // '&format=json&categoryId=3944',
             'http://api.walmartlabs.com/v1/feeds/preorder?apikey=' + Walmart.secret.Key + '&format=json',
      function(error, response, body) {
        if(error) {
          console.log('error in clearanceWalmart');
        } else{
          console.log('getting to clearance')
          // var result = response;
          console.log(response.body)
          // var result = JSON.parse(response.body);
          // console.log(result)
          res.json(response.body);
        }
    })
  }

  module.exports.queryWalmart = queryWalmart;
  module.exports.clearanceWalmart = clearanceWalmart;

})();