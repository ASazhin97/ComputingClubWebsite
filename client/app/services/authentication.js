// Service that is responsible for all things authentication

angular
    .module('computingClubApp')
    .factory('AuthenticationService', ['$rootScope', '$http', '$location', AuthenticationService])
    .run(['AuthenticationService', function(authenticatation){
      authenticatation.setAuth(true);
    }]);

function AuthenticationService($rootScope, $http, $location){
  // TODO: maybe find a better way to check if someone is authenticated
  // Maybe broadcast an event whenever a 401 reponse is sent and
  // used a boolean for isAuthenticated instead of a function that
  // returns a boolean

  // Object that stores the methods for this service
  const authenticatation = {};

  // Using rootScope to prevent loading the module for every controller that needs to know if a admin is simply logged in
  // $rootScope.isAuthenticated = true;
  authenticatation.setAuth = function(boolean){
    $rootScope.isAuthenticated = boolean;
  };

  // Responsible for logging in admin users
  authenticatation.login = function(credentials){
    $http.post('/admin/login', credentials)
        .then(res => {
          this.setAuth(true);
          $location.path('/');
        },
        err => {
          $location.path('/login');
        });
  };

  // Responsible for registering in admin users
  authenticatation.register = function(credentials){
    $http.post('/admin/register', credentials)
        .then(res => {
          this.setAuth(true);
          $location.path('/');
        },
        err => {
          $location.path('/register');
        });
  };

  // Responsible for logging out admin users
  authenticatation.logout = function(){
    $http.post('/admin/logout')
        .then(res => {
          $location.path('/');
          this.setAuth(false);
        },
        err => {
          $location.path('/');
        });
  };

  return authenticatation;
}
