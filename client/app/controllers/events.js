angular
    .module('events', [])
    .controller('EventsController', ['$http', EventsController]);

function EventsController($http){
  console.log('events page');
  const vm = this;

  vm.events = [];

  // Get events
  $http.get('/events')
      .then(res => {
        vm.events = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
      );

  vm.addEvent = function(event){
    $http.post('/events', event)
        .then(res => {
        // Display success message
          console.log(res);
        },
        err => {
          console.log(err);
        }
        );
  };
}
