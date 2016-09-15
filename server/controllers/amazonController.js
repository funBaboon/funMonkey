(function() {
  var amazonKeys = require('../keys/amazonKeys.js')
  var request = require('request');
  var Crypto = require('crypto-js')
  var utc = new Date().toJSON().slice(0,10).replace(/-/g,"")

  function getSignatureKey(key, dateStamp, regionName, serviceName) {
     var kDate= Crypto.HmacSHA1(Crypto.SHA256, dateStamp, "AWS4" + key, { asBytes: true})
     var kRegion= Crypto.HmacSHA1(Crypto.SHA256, regionName, kDate, { asBytes: true });
     var kService= Crypto.HmacSHA1(Crypto.SHA256, serviceName, kRegion, { asBytes: true });
     var kSigning= Crypto.HmacSHA1(Crypto.SHA256, "aws4_request", kService, { asBytes: true });

     return kSigning;
  }

  function queryAmazon(req,res) {
    request('http://webservices.amazon.com/onca/xml?AWSAccessKeyId=' + amazonKeys.Keys.AccessKeyID + '&AssociateTag=hrcj-20&Condition=New&Keywords=' + req.params.query + '&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=All&Service=AWSECommerceService&Timestamp=2016-09-15T18%3A45%3A44.000Z&Version=2011-08-01&Signature=' + sig,
      function(error, response, body) {
        console.log(response)
        res.send(body);
      })
  }

  module.exports.queryAmazon = queryAmazon;

})();
