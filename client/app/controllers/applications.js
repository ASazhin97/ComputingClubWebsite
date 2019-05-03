angular
    .module('applications', [])
    .controller('ApplicationsController', ['$http', ApplicationsController]);

function ApplicationsController($http){
  const vm = this;

  vm.applications = [];

  // Get applications from database
  function getApplications(){
    $http.get('/members/role/applicant')
        .then(res => {
          vm.applications = res.data;
        },
        err => {
          alert(err.data.message);
        });
  }

  // Call on page load
  getApplications();

  vm.accept = function(applicant){
    // Change role to member and remove from view
    removeFromView(applicant);

    applicant.role = 'member';
    const body = {};
    body.member = applicant;

    $http.put(`/members/${applicant._id}`, body).then(
        res => {
          getApplications();
        },
        err => {
          alert(err.data.message);
        }
    );
  };

  // Delete from db and remove from view
  vm.reject = function(applicant){
    removeFromView(applicant);
    $http.delete(`/members/${applicant._id}`).then(
        res => {
          getApplications();
        },
        err => {
          alert(err.data.message);
        }
    );
  };

  function removeFromView(applicant){
    const index = vm.applications.indexOf(applicant);
    vm.applications.splice(index, 1);
  }
}
