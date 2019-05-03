angular
    .module('register', [])
    .controller('RegisterController', ['AuthenticationService', RegisterController]);

function RegisterController(authentication){
  const vm = this;

  vm.submitForm = function(admin){
    authentication.register(admin);
  };
}
