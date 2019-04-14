var personnelApp = angular.module('personnelPageApp', []);

personnelApp.controller('officerController', [
  '$scope',
  function($scope) {
    $scope.new_personnel = {};

    $scope.addpersonnel = function(person) {
      $scope.officers.push(person);

      $scope.new_personnel = {};
    };

    $scope.Save = function() {
      alert('personnel Page Saved');
    };

    $scope.officers = [
      {
        Name: 'David Lepore',
        Class: 'Senior',
        Position: 'President',
        Image: 'images/david_lepore.jpg',
        Type: 'Student',
      },
      {
        Name: 'Joseph White',
        Class: 'Junior',
        Position: 'Vice President',
        Image: 'images/joe.png',
        Type: 'Student',
      },
      {
        Name: 'Megan Forster',
        Class: 'Junior',
        Position: 'Treasurer',
        Image: 'images/MeganForster.jpg',
        Type: 'Student',
      },
      {
        Name: 'Stefan Christov',
        Class: 'PhD',
        Position: 'Supervisor',
        Image: 'images/StefanChristov.jpg',
        Type: 'Professor',
      },
    ];
  },
]);
