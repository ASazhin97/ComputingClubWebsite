angular
    .module('register', [])
    .controller('RegisterController', ['AuthenticationService', RegisterController]);

function RegisterController(authentication){
  console.log('Register page');
  const vm = this;

  vm.submitForm = function(){
    authentication.register(vm.admin);
  };
}
