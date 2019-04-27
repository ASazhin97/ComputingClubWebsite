angular
    .module('events', [])
    .controller('EventsController', ['$http', EventsController]);

function EventsController($http){
  console.log('events page');
  const vm = this;

  vm.events = [];

  // Get events from database
  $http.get('/events')
      .then(res => {
        vm.events = res.data;
      },
      err => {
        console.log(err);
      });

  // Responsible for adding events to the database
  vm.addEvent = function(event){
    // Server is expecting req.body to contain the 'event' key
    const body = {};
    body.event = event;

    $http.post('/events', body)
        .then(res => {
        // TODO: Display success message
        },
        err => {
          console.log(err);
        });
  };
}
