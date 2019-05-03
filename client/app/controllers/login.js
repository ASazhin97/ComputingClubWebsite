angular
    .module('login', [])
    .controller('LoginController', ['$http', 'AuthenticationService', LoginController]);

function LoginController($http, authentication){
  const vm = this;

  vm.submitForm = function(admin){
    authentication.login(admin);
  };
}
