var eventsApp = angular.module("EventsApp", []);

eventsApp.controller('eventController', ['$scope', function($scope){
    $scope.new_event = {}

    $scope.events = [
        {
            "Title":"Hackathon",
            "Description":"During Hackathon, students must create apps, websites, etc, based on a unique and challenging prompt in only 6 hours.",
            "Date":"11/3/2018"
        },
        {
            "Title":"CT Tech Challange",
            "Description":"The Tech Challange allows participants to test their skills against Connecticut's best programmers.",
            "Date":"12/1/2018"
        }
    ];

    $scope.addEvent = function(event){
        $scope.events.push(event);

        $scope.new_event = {};
    }
}])
