(function()
{
    var app = angular.module('SplitWise',['ngRoute','ngResource']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
           controller:'DBSearchController',
           templateUrl:'App/Views/DBSearch.html'
        }).when('/Home',{
            controller: 'SearchProductsControllers',
            templateUrl : 'App/Views/SearchProducts.html'
        }).when('/Register',{
             controller:'RegisterController',
            templateUrl : 'App/Views/Register.html'
        }).when('/EditItem',{
            controller:'EditItemController',
            templateUrl : 'App/Views/EditItem.html'
        })
        .otherwise({redirectTo:'/'});
        
    });
    
}());