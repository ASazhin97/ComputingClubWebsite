angular
    .module('computingClubApp')
    .factory('AuthenticationService', ['$http', '$location', AuthenticationService]);

function AuthenticationService($http, $location){
  // TODO: maybe find a better way to check if someone is authenticated
  // Maybe broadcast an event whenever a 401 reponse is sent and
  // used a boolean for isAuthenticated instead of a function that
  // returns a boolean
  this.isAuthenticated = function(){
    const event = {};
    $http.post('/events', event)
        .then(res => {
          return true;
        },
        err => {
          return false;
        }
        );
  };

  this.login = function(credentials){
    $http.post('/admin/login', credentials)
        .then(res => {
        // Redirect when successfull
          $location.path('/');
        },
        err => {
          $location.path('/login');
        }
        );
  };

  this.register = function(credentials){

  };

  this.logout = function(){

  };
}
