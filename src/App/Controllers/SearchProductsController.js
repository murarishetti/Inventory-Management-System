/**
 * Created by daras on 24-Mar-17.
 */
(function () {

    var SearchProductsControllers = function ($scope,$location, WalmartFactory,EditItemFactory ) {

        $scope.Search = function () {

           var data =  WalmartFactory.getSearchResults($scope.SearchText);
           var result  =  data.query().$promise.then(function (data) {
                 $scope.items =data.items;
            },function (reason) {
               console.log(reason);
           });
        }

        $scope.EditItem = function (item) {
            EditItemFactory.setSelectedItem(item)
            EditItemFactory.setData($scope.SearchText,$scope.items)
            go('/EditItem')
        }
        var go = function (way) {

            $location.path(way)

        }

        var init = function () {

            var Data = EditItemFactory.getData();
            if(Data!=null)
            {
                $scope.SearchText = Data.SearchTerm;
                $scope.items = Data.Items;
            }
        }

        init();

    }

    SearchProductsControllers.$inject = ['$scope','$location','WalmartFactory','EditItemFactory']
    angular.module('SplitWise').controller('SearchProductsControllers',SearchProductsControllers);
}());