/* eslint-disable angular/file-name */
angular
    .module('computingClubApp', ['ngRoute', 'home', 'events', 'login', 'register'])
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
          .when('/login', {
            controller: 'LoginController as loginCtrl',
            templateUrl: '/public/app/views/login.html',
            resolve: {
              load: ['InjectFileService', function(injectFile){
                injectFile.set('css', '/public/css/home.css', 'homecss');
                injectFile.set('css', '/public/css/login.css', 'logincss');
              }],
            },
          })
          .when('/register', {
            controller: 'RegisterController as registerCtrl',
            templateUrl: '/public/app/views/register.html',
            resolve: {
              load: ['InjectFileService', function(injectFile){
                injectFile.set('css', '/public/css/home.css', 'homecss');
                injectFile.set('css', '/public/css/register.css', 'registercss');
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
