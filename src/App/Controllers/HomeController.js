(function()
{
   
    
    var HomeController = function($scope,GoogleMapsFactory,WeatherFactory)
    {
         $scope.Status = false;
        document.getElementById("Weather").style.visibility = "hidden"
       var directionsDisplay;
        // var maps = new new google.maps.Map();
        function init()
    {
         directionsDisplay = new google.maps.DirectionsRenderer();
map = new google.maps.Map(document.getElementById('Map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
 
});        
        var Source = document.getElementById("Source")
        var Destination = document.getElementById("Destination")
 var autocomplete_Source = new google.maps.places.Autocomplete(Source);
         var autocomplete_Destination = new google.maps.places.Autocomplete(Destination);
        
         autocomplete_Source.bindTo('bounds', map);
         autocomplete_Destination.bindTo('bounds', map);
       directionsDisplay.setMap(map);
    };
        
        init();
        
        $scope.GetDirections = function()
        {
             var res = [];
            if($scope.Source!=null && $scope.Destination != null)
                
                {
                    
                 GoogleMapsFactory.calcRoute($scope.Source,$scope.Destination,directionsDisplay );
       
        WeatherFactory.getWeather($scope.Source).success(function(Result){
          
             
           
            $scope.Src_City_Name =    Result.name;
            $scope.Src_City_Temp = Result.main.temp;
            $scope.Src_City_Humidity = Result.main.humidity;
            $scope.Src_City_Pressure = Result.main.pressure;
            $scope.Src_Weather_Icon =  "http://openweathermap.org/img/w/" + Result.weather[0].icon + ".png";
      
        });    
            
             WeatherFactory.getWeather($scope.Destination).success(function(Result){
          
             
           
            $scope.Dest_City_Name =    Result.name;
            $scope.Dest_City_Temp = Result.main.temp;
            $scope.Dest_City_Humidity = Result.main.humidity;
            $scope.Dest_City_Pressure = Result.main.pressure;
            $scope.Dest_Weather_Icon =  "http://openweathermap.org/img/w/" + Result.weather[0].icon + ".png";
           document.getElementById("Weather").style.visibility = "visible"
      
        });    
           
                } 
       
            
        
        };
        
     
        
        
      
    }
      HomeController.$inject = ['$scope','GoogleMapsFactory','WeatherFactory']
angular.module("SplitWise").controller("HomeController",HomeController);
}());