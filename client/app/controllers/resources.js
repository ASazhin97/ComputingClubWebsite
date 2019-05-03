angular
    .module('resources', [])
    .controller('ResourceController', ['$http', ResourceController]);

function ResourceController($http){
  const vm = this;

  // get resources from database
  function getResources(){
    $http.get('/resources').then(
        res => {
          vm.resources = res.data;
        },
        err => {
          alert(err.data.message);
        }
    );
  }

  // Call on page load
  getResources();

  // Responsible for adding resources to the database
  vm.addResource = function(resource){
    const body = {};
    body.resource = resource;

    $http.post('/resources', body).then(
        res => {
          alert('Resource Created!');
          getResources();
        },
        err => {
          alert(err.data.message);
        }
    );
  };

  // Responsible for deleting a resource from the database
  vm.deleteResource = function(resource){
    $http.delete(`/resources/${resource._id}`).then(
        res => {
          getResources();
        },
        err => {
          alert(err.data.message);
        }
    );
  };
}
