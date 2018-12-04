var eventsApp = angular.module("EventsApp", []);

eventsApp.controller('eventController', ['$scope', function($scope){
    $scope.new_event = {}
    
    $scope.events = [
        {
            "Title":"Hackathon",
            "Description":"Hackathon is a great event where in 6 hours students create websites in a topic",
            "Date":"12/1/2018"
        },
        {
            "Title":"CT Tech Challange",
            "Description":"the tech challange allows one to test their skills agains CT best programmers",
            "Date":"12/1/2018"
        }
    ];
    
    $scope.addEvent = function(event){
        $scope.events.push(event);
        
        $scope.new_event = {};
    }
}])