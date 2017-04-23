(function()
{
    
    var RegisterController = function($scope,$location)
    {
       $scope.show = false;
      
       
        $scope.CheckPassword = function()
        {
            if($scope.Reg_Password!=null&&$scope.Reg_Cnfpassword!=null)
                {
                    
                      if ($scope.Reg_Password == $scope.Reg_Cnfpassword)
                {
                    $scope.show = false;
                }
            else
                {
                    $scope.show = true;
                }
                }
            
          
        }
        
        
        $scope.RegisterUser = function()
        {
            var Email = document.getElementById("Reg_Email").value;
            var Password =  document.getElementById("Reg_Password").value;
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(Email,Password)
                $location.path('/')
        }}
        
    };
    
    RegisterController.$inject = ['$scope','$location'];
    angular.module('SplitWise').controller('RegisterController',RegisterController);
    
}());