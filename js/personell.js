var personellApp = angular.module('personellPageApp', []);

personellApp.controller('officerController', ['$scope', function($scope){
    $scope.officers = [
        {
            "Name":"David Lepore",
            "Class":"Junior",
            "Position":"President",
            "Image":"images/david_lepore.jpg",
            "Type":"Student"
        },
        {
            "Name":"Joseph White",
            "Class":"Junior",
            "Position":"Vice President",
            "Image":"images/joe.png",
            "Type":"Student"
        },
        {
            "Name":"Megan Forester",
            "Class":"Junior",
            "Position":"Tresurer",
            "Image":"images/MeganForster.jpg",
            "Type":"Student"
        },
        {
            "Name":"Stefan Christov",
            "Class":"PhD",
            "Position":"Supervisor",
            "Image":"images/StefanChristov.jpg",
            "Type":"Professor"
        }
    ];



}]);
