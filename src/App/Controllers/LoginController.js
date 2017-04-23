(function()
{
    var LoginController = function($scope,$location)
    {
       
        
        
       $scope.ValidateUser  =  function()
        {
        if($scope.Email != null && $scope.Password!= null)
            {
               
                var Reg_Password = localStorage.getSelectedItem($scope.Email)
                if(Reg_Password==null)
                    {
                        alert("Username not found, Please register")
                    }
              else if(Reg_Password == $scope.Password)
                    {
                         $location.path('/Home')
                    }
                else
                    {
                        alert("Username/Password is not valid")
                    }
                
               
                
            }
        else
            {
               
                alert("Please enter the login credentials")
                
            }
    
        };

        
        $scope.go = function(strPath)
        {
            $location.path(strPath);
        };
        
                       
    }
    LoginController.$inject = ['$scope','$location'];
    angular.module('SplitWise').controller('LoginController',LoginController);
}());