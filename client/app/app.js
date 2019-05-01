/* eslint-disable angular/file-name */
angular
    .module('computingClubApp', [
      'ngRoute',
      'partials',
      'home',
      'events',
      'login',
      'register',
      'applications',
      'resources',
      'members',
    ])
    .config($routeProvider => {
      $routeProvider
          .when('/', {
            controller: 'HomeController as homeCtrl',
            templateUrl: '/public/app/views/home.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                },
              ],
            },
          })
          .when('/login', {
            controller: 'LoginController as loginCtrl',
            templateUrl: '/public/app/views/login.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set('css', '/public/css/login.css', 'logincss');
                },
              ],
            },
          })
          .when('/register', {
            controller: 'RegisterController as registerCtrl',
            templateUrl: '/public/app/views/register.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set('css', '/public/css/register.css', 'registercss');
                },
              ],
            },
          })
          .when('/apply', {
            controller: 'ApplyController as applyCtrl',
            templateUrl: '/public/app/views/apply.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set('css', '/public/css/apply.css', 'applycss');
                  // injectFile.set('css', '/public/css/apply.css', 'applycss');
                },
              ],
            },
          })
          .when('/events', {
            controller: 'EventsController as eventsCtrl',
            templateUrl: '/public/app/views/events.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set('css', '/public/css/events.css', 'eventscss');
                },
              ],
            },
          })
          .when('/applications', {
            controller: 'ApplicationsController as applicationsCtrl',
            templateUrl: '/public/app/views/applications.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set(
                      'css',
                      '/public/css/applications.css',
                      'applicationscss'
                  );
                },
              ],
            },
          })
          .when('/members', {
            controller: 'MembersController as membersCtrl',
            templateUrl: '/public/app/views/members.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set(
                      'css',
                      '/public/css/members.css',
                      'memberscss'
                  );
                },
              ],
            },
          })
          .when('/resources', {
            controller: 'ResourceController as resourceCtrl',
            templateUrl: '/public/app/views/resources.html',
            resolve: {
              load: [
                'InjectFileService',
                function(injectFile){
                  injectFile.set('css', '/public/css/home.css', 'homecss');
                  injectFile.set(
                      'css',
                      '/public/css/resources.css',
                      'resourcescss'
                  );
                },
              ],
            },
          });
    });
// TODO: handle 404 here with .otherwise
