// Service that is responsible for all things authentication

angular
    .module('computingClubApp')
    .factory('AuthenticationService', ['$rootScope', '$http', '$location', AuthenticationService])
    .run(['AuthenticationService', function(authenticatation){
    // On page load/reload call setAuth in AuthenticationService
      authenticatation.setAuth();
    }]);

function AuthenticationService($rootScope, $http, $location){
  // Object that stores the methods for this service
  const authenticatation = {};

  // Using rootScope to prevent loading the module for every controller that needs to know if an admin is simply logged in
  // $rootScope.isAuthenticated = true;
  authenticatation.setAuthStatus = function(boolean){
    $rootScope.isAuthenticated = boolean;
  };

  // Set username
  authenticatation.setUsername = function(username){
    $rootScope.username = username;
  };

  // Clear username
  authenticatation.clearUsername = function(){
    $rootScope.username = '';
  };

  // Get authentication details from server and set them
  authenticatation.setAuth = function(){
    $http.get('/admin/authenticated')
        .then(res => {
          authenticatation.setAuthStatus(res.data.isAuthenticated);
          authenticatation.setUsername(res.data.username);
        },
        err => {
          authenticatation.setAuthStatus(false);
          authenticatation.clearUsername();
        });
  };

  // Responsible for logging in admin users
  authenticatation.login = function(credentials){
    $http.post('/admin/login', credentials)
        .then(res => {
          authenticatation.setAuthStatus(true);
          authenticatation.setUsername(res.data.username);
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
          authenticatation.setAuthStatus(true);
          authenticatation.setUsername(res.data.username);
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
          authenticatation.setAuthStatus(false);
          authenticatation.clearUsername();
          $location.path('/');
        },
        err => {
          $location.path('/');
        });
  };

  return authenticatation;
}
