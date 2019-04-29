angular
    .module('partials', [])
    .controller('PartialsController', ['$location', 'AuthenticationService', PartialsController]);

function PartialsController($location, authentication){
  const vm = this;

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
    currLocation = currLocation == '' ? 'Home' : capitalizeFirstLetter(currLocation);
    for (const navItem of vm.navItems){
      if (navItem.text === currLocation){
        vm.activeItem = navItem;
        break;
      }
    }
  };

  function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Call function on page load/refresh
  vm.setOnPageLoad();
}
