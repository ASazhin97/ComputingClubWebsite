var personellApp = angular.module('personellPageApp', []);

personellApp.controller('officerController', ['$scope', function($scope){
    $scope.officers = [{"Name":"David Lepore","Class":"Junior","Position":"President","Image":"images/david_lepore.jpg"},{"Name":"David Lepore","Class":"Junior","Position":"President","Image":"images/david_lepore.jpg"}];
    
    
    
}]);