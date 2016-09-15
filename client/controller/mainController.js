(function() {
  "use strict";

  angular
    .module('App', [])
    .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = ['$scope', '$http'];

  function mainCtrl($scope, $http) {
    $scope.queryEbay = queryEbay;

    function queryEbay(query) {
      query = query.replace(/ /g, '%20');
      $http({
        method: 'GET',
        url: '/api/ebay/'+ query
      }).then(function success(res) {
        console.log(res.data);
        $scope.data = res.data;

        $scope.searchQuery = '';
      }, function err(res){
        console.log('error:', res)
      });
    }
  }
})();
