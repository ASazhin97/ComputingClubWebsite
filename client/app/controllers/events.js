angular
    .module('events', [])
    .controller('EventsController', ['$http', EventsController]);

function EventsController($http){
  const vm = this;

  vm.events = [];

  // Get events from database
  function getEvents(){
    $http.get('/events').then(
        res => {
          vm.events = res.data;
        },
        err => {
          alert(err.data.message);
        }
    );
  }

  // Call on page load
  getEvents();

  // Responsible for adding events to the database
  vm.addEvent = function(event){
    // Server is expecting req.body to contain the 'event' key
    const body = {};
    body.event = event;

    $http.post('/events', body).then(
        res => {
          vm.event = {};
          alert('Event Created!');
          getEvents();
        },
        err => {
          alert(err.data.message);
        }
    );
  };

  // Responsible for deleting an event from the database
  vm.deleteEvent = function(event){
    $http.delete(`/events/${event._id}`).then(
        res => {
          alert('Event Deleted!');
          getEvents();
        },
        err => {
          alert(err.data.message);
        }
    );
  };
}
