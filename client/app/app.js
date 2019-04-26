/* eslint-disable angular/file-name */
angular
    .module('computingClubApp', ['ngRoute', 'home', 'events'])
    .config($routeProvider => {
      $routeProvider
          .when('/', {
            controller: 'HomeController as homeCtrl',
            templateUrl: '/public/app/views/home.html',
            resolve: {
              load: ['InjectFileService', function(injectFile){
                injectFile.set('css', '/public/css/home.css', 'homecss');
              }],
            },
          })
          .when('/events', {
            controller: 'EventsController as eventsCtrl',
            templateUrl: '/public/app/views/events.html',
            resolve: {
              load: ['InjectFileService', function(injectFile){
                injectFile.set('css', '/public/css/home.css', 'homecss');
                injectFile.set('css', '/public/css/events.css', 'eventscss');
              }],
            },
          });
    });
// TODO: handle 404 here with .otherwise
