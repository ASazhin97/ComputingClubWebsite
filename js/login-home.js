var getNewPointInput = function(){
    var input = document.getElementsByClassName('new-point-input');
    return input.item(0).value;
}


var checklistApp = angular.module('ChecklistApp', []);

checklistApp.controller('checklistController', ['$scope', function($scope){
    $scope.new_event = {};

    $scope.addEvent = function(event){
        $scope.new_event.Points = [];
        $scope.new_event.Num = $scope.events.length;
        $scope.events.push(event);

        $scope.new_event = {};
    }

    $scope.events = [
        {
            "Name":"Hackathon",
            "Num":0,
            "Description":"6-Hour Event",
            "Date":"11/3/2018",
            "Points":["Food", "Topic", "Check In", "Judges"]
        },
        {
            "Name":"Tech Challange",
            "Num":1,
            "Description":"All Day Event",
            "Date":"12/1/2018",
            "Points":["Food", "Topic", "Check In", "Judges", "Employees"]
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
        var input = document.getElementsByClassName('new-point-input');
        input.innerHTML = ""
    }
}]);
