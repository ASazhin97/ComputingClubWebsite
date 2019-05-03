angular
    .module('resources', [])
    .controller('ResourceController', ['$http', ResourceController]);

function ResourceController($http){
  console.log('resource page');
  const vm = this;

  // get resources from database
  function getResources(){
    $http.get('/resources').then(
        res => {
          vm.resources = res.data;
        },
        err => {
          console.log(err);
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
          console.log('Put success');
          getResources();
        },
        err => {
          console.log(err);
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
          console.log(err);
        }
    );
  };
}
