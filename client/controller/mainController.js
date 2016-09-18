(function() {
  "use strict";

  angular
    .module('App', [])
    .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = ['$scope', '$http'];

  function mainCtrl($scope, $http) {
    $scope.queryAmazon = queryAmazon;
    $scope.queryEbay = queryEbay;
    $scope.topSellingEbay = topSellingEbay;
    $scope.queryWalmart = queryWalmart;
    $scope.trendingWalmart = trendingWalmart;

    function queryAmazon(query){
      query = query.replace(/ /g, '%20');
      $http({
        method: 'GET',
        url: '/api/amazon/' + query
      }).then(function success(res){
        var x2js = new X2JS();
        var newData = x2js.xml_str2json(res.data);
        console.log(newData);
        $scope.amazonResults = newData;
      }, function err(res){
        console.log('error:', res);
      })
    }

    function queryEbay(query) {
      query = query.replace(/ /g, '%20');
      $http({
        method: 'GET',
        url: '/api/ebay/'+ query
      }).then(function success(res) {
        $scope.ebayResults = res.data;

        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }

    function topSellingEbay(){
       $http({
        method: 'GET',
        url: '/api/ebay/topSelling'
      }).then(function success(res) {
        $scope.ebayResults = res.data;

        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }

    function queryWalmart(query) {
      query = query.replace(/ /g, '%20');
      $http({
        method: 'GET',
        url: '/api/walmart/'+ query
      }).then(function success(res) {
        $scope.walmartResults = res.data;

        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }

    function trendingWalmart() {
      $http({
        method: 'GET',
        url: '/api/walmart/trending'
      }).then(function success(res) {
        $scope.walmartResults = res.data;

        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }
  }
})();
