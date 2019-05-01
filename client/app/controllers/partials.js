angular
    .module('partials', [])
    .controller('PartialsController', ['$rootScope', '$location', 'AuthenticationService', PartialsController]);

function PartialsController($rootScope, $location, authentication){
  const vm = this;

  $rootScope.$on('$locationChangeSuccess', event => {
    vm.setOnPageLoad();
  });

  vm.navItems = [
    {
      href: '/#!',
      text: 'Home',
    },
    {
      href: '/#!/members',
      text: 'Members',
    },
    {
      href: '/#!/resources',
      text: 'Resources',
    },
    {
      href: '/#!/events',
      text: 'Events',
    },
  ];

  // Set the logout function to the logout function in the AuthenticationService
  vm.logout = authentication.logout;

  // Set active item
  vm.setActive = function(navItem){
    vm.activeItem = navItem;
  };

  // Set item on page load/refresh
  vm.setOnPageLoad = function(){
    let currLocation = $location.url().split('/')[1];
    currLocation =
      currLocation === '' || currLocation === undefined
        ? 'Home'
        : capitalizeFirstLetter(currLocation);

    let foundNav = false;
    for (const navItem of vm.navItems){
      if (navItem.text === currLocation){
        vm.activeItem = navItem;
        foundNav = true;
        break;
      }
    }
    if (!foundNav){
      vm.activeItem = '';
    }
  };

  function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Call function on page load/refresh
  vm.setOnPageLoad();
}
