(function() {
  "use strict";

  angular
    .module('App', [])
    .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = ['$scope', '$http'];

  function mainCtrl($scope, $http) {
    $scope.queryEbay = queryEbay;

    function queryEbay(query) {
      query = query.replace(/ /g, '+');
      $http({
        method: 'GET',
        url: '/api/ebay/'+ query
      }).then(function success(res) {
        $scope.results = res.data;
        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }
  }
})();
