angular
    .module('resources', [])
    .controller('ResourceController', ['$http', ResourceController]);

function ResourceController($http){
  console.log('resource page');
  const vm = this;
  vm.currentCategory = '';

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

  getResources();

  // adding
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

  vm.deleteResource = function(resource){
    // TODO needs to delete a single file
    $http.delete(`/resources/${resource._id} `).then(
        res => {
          getResources();
        },
        err => {
          console.log(err);
        }
    );
  };
}
