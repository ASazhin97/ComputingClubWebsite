angular
    .module('login', [])
    .controller('LoginController', ['$http', 'AuthenticationService', LoginController]);

function LoginController($http, authentication){
  console.log('login page');
  const vm = this;

  vm.submitForm = function(admin){
    authentication.login(admin);
  };

  vm.logout = function(){
    authentication.logout();
  };
}
