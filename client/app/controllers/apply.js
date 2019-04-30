angular
    .module('apply', [])
    .controller('ApplyController', ['$http', ApplyController]);

function ApplyController($http){
  console.log('apply page');
  const vm = this;

  // adding
  vm.addApplicant = function(member){
    const body = {};
    body.member = member;

    $http.post('/members', body).then(
        res => {
          console.log('Application Submitted!');
        },
        err => {
          console.log(err);
        }
    );
    // alert('Thank you for applying to the Quinnipiac University Computing Club! A club officer will get back to you by email once they have reviewed your application.');
  };
}
