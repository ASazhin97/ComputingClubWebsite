angular
    .module('applications', [])
    .controller('ApplicationsController', ['$http', ApplicationsController]);

function ApplicationsController($http){
  console.log('applications page');
  const vm = this;

  vm.applications = [];

  // Get applications from database
  $http.get('/members/role/applicant')
      .then(res => {
        vm.applications = res.data;
      },
      err => {
        console.log(err);
      });

  vm.accept = function(applicant){
    // Change role to member and remove from view
    removeFromView(applicant);
  };
  vm.reject = function(applicant){
    // Delete from db and remove from view
    removeFromView(applicant);
  };

  function removeFromView(applicant){
    const index = vm.applications.indexOf(applicant);
    vm.applications.splice(index, 1);
  }
}

