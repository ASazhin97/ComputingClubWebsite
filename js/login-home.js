var getNewPointInput = function(){
    var input = document.getElementsByClassName('new-point-input');
    return input.item(0).value;
}


var checklistApp = angular.module('ChecklistApp', []);

checklistApp.controller('checklistController', ['$scope', function($scope){
    
    $scope.events = [
        {
            "Name":"Hackathon",
            "Num":0,
            "Description":"6 hour event on Saturday",
            "Date":"12/3/2018",
            "Points":["Food", "Topic", "Checkin", "Judges"]
        },
        {
            "Name":"CT Challange",
            "Num":1,
            "Description":"All Day Event",
            "Date":"12/3/2018",
            "Points":["Food", "Topic", "Checkin", "Judges", "Employess"]
        }
    ];
    
    $scope.current_event = $scope.events["0"];
    $scope.current_points = $scope.current_event.Points;
    
    $scope.setSection = function(eventNum){
        $scope.current_event = $scope.events[eventNum];
        $scope.current_points = $scope.current_event.Points;
    }
    
    $scope.addPoint = function (){
        $scope.current_points.push(getNewPointInput());
    }
}]);