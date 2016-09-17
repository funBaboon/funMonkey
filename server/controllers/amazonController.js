(function() {
  var request = require('request');
  var amazonKeys = require('../keys/amazonKeys.js')
  var sha = require('../securehashingalgo/sha256.js');
  var sha2 = require('../securehashingalgo/sha2.js');

  function queryAmazon(req, res) {
    var unsignedUrl = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemSearch&SubscriptionId=' + amazonKeys.Keys.AccessKeyID + '&AssociateTag=hrcj-20&Version=2011-08-01&SearchIndex=All&Condition=New&Keywords=' + req.params.query + '&ResponseGroup=Images,ItemAttributes,Offers,ShippingCharges,SalesRank';

    var lines = unsignedUrl.split("\n");
    unsignedUrl = "";
    for (var i in lines) {
      unsignedUrl += lines[i];
    }

    var urlregex = new RegExp("^http:\\/\\/(.*)\\/onca\\/xml\\?(.*)$");
    var matches = urlregex.exec(unsignedUrl);
    var host = matches[1].toLowerCase();
    var query = matches[2];
    var pairs = query.split("&");

    pairs = cleanupRequest(pairs);
    pairs = encodeNameValuePairs(pairs);
    pairs.sort();

    var canonicalQuery = pairs.join("&");
    var stringToSign = "GET\n" + host + "\n/onca/xml\n" + canonicalQuery;
    var secret = amazonKeys.Keys.SecretAccessKey;
    var signature = sign(secret, stringToSign);
    var signedUrl = "http://" + host + "/onca/xml?" + canonicalQuery + "&Signature=" + signature;

    function encodeNameValuePairs(pairs) {
      for (var i = 0; i < pairs.length; i++) {
        var name = "";
        var value = "";
        var pair = pairs[i];
        var index = pair.indexOf("=");

        if (index == -1) {
          name = pair;
        } else if (index == 0) {
          value = pair;
        } else {
          name = pair.substring(0, index);
          if (index < pair.length - 1) {
            value = pair.substring(index + 1);
          }
        }

        name = encodeURIComponent(decodeURIComponent(name));

        value = value.replace(/\+/g, "%20");
        value = encodeURIComponent(decodeURIComponent(value));

        pairs[i] = name + "=" + value;
      }

      return pairs;
    }

    function cleanupRequest(pairs) {
      var haveTimestamp = false;
      var haveAwsId = false;
      var accessKeyId = amazonKeys.Keys.AccessKeyID;
      var nPairs = pairs.length;
      var i = 0;
      while (i < nPairs) {
        var p = pairs[i];
        if (p.search(/^Timestamp=/) != -1) {
          haveTimestamp = true;
        } else if (p.search(/^(AWSAccessKeyId|SubscriptionId)=/) != -1) {
          pairs.splice(i, 1, "AWSAccessKeyId=" + accessKeyId);
          haveAwsId = true;
        } else if (p.search(/^Signature=/) != -1) {
          pairs.splice(i, 1);
          i--;
          nPairs--;
        }
        i++;
      }

      if (!haveTimestamp) {
        pairs.push("Timestamp=" + getNowTimeStamp());
      }

      if (!haveAwsId) {
        pairs.push("AWSAccessKeyId=" + accessKeyId);
      }
      return pairs;
    }

    function sign(secret, message) {
      var messageBytes = sha.str2binb(message);
      var secretBytes = sha.str2binb(secret);

      if (secretBytes.length > 16) {
        secretBytes = core_sha256(secretBytes, secret.length * sha.chrsz);
      }

      var ipad = Array(16),
        opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = secretBytes[i] ^ 0x36363636;
        opad[i] = secretBytes[i] ^ 0x5C5C5C5C;
      }

      var imsg = ipad.concat(messageBytes);
      var ihash = sha.core_sha256(imsg, 512 + message.length * sha.chrsz);
      var omsg = opad.concat(ihash);
      var ohash = sha.core_sha256(omsg, 512 + 256);
      var b64hash = sha2.binb2b64(ohash);
      var urlhash = encodeURIComponent(b64hash);

      return urlhash;
    }

    function addZero(n) {
      return (n < 0 || n > 9 ? "" : "0") + n;
    }

    function getNowTimeStamp() {
      return new Date().toJSON();
    }

    request(signedUrl, function(error, response, body) {
      res.send(body);
    })
  }
  module.exports.queryAmazon = queryAmazon;
})();
