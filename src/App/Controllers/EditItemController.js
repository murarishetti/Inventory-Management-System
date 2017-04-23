/**
 * Created by daras on 27-Mar-17.
 */
(function () {

    var EditItemController = function ($scope,$http,EditItemFactory) {

        var init = function () {
			
            var SelectedItem = EditItemFactory.getSelectedItem();
			$scope.Item = {};
            $scope.Item.Name = SelectedItem.name;
            $scope.Item.Image = SelectedItem.largeImage;
            $scope.Item.MSRP = SelectedItem.msrp;
            $scope.Item.SalePrice = SelectedItem.salePrice;
            $scope.Item.UPC = SelectedItem.upc;
            $scope.Item.ModelNumber = SelectedItem.modelNumber;
			$scope.Item.Quantity = 1;
        }
		
		$scope.RegisterItem = function()
		{
			console.log($scope.Item)
			$http.post("/EditItem",$scope.Item).success(function(){
				console.log("Data Posted Successfully");
			}).error(function(err)
					{
				console.log(err);
			});
		}
		

        init();


    }
    EditItemController.$inject = ['$scope','$http','EditItemFactory']
    angular.module("SplitWise").controller('EditItemController',EditItemController)

}())