// 1. create the module / app, make sure ng-app points to it.
var newsApp = angular.module('newsApp', []);
// 2. create the controller and give it $scope.
newsApp.controller("newsController", ['$scope', function($scope) {
  $scope.new_article = {};
  $scope.articles = [{
      name: 'John Badman',
      major: 'Business',
      email: 'notJohnGoodman@gmail.com',
      grad: '1966',
      why: "I want to build a killer robot so I can take over the world. Mwahahahaha!"
    },
    {
        name: 'John Goodman',
        major: 'Computer Science',
        email: 'JohnGoodman@gmail.com',
        grad: '2020',
        why: "It looks like you host a lot of interesting tech-related events. I would be honored to join."
      }
  ];

  // to find console for each article
  $scope.includeConsole = function(console) {
    var i = $.inArray(console, $scope.consoleIncludes);
    if (i > -1) {
      $scope.consoleIncludes.splice(i, 1);
    } else {
      $scope.consoleIncludes.push(console);
    }
  }

  // filter through each article to find corresponding console
  $scope.consoleFilter = function(articles) {
    if ($scope.consoleIncludes.length > 0) {
      if ($.inArray(articles.console, $scope.consoleIncludes) < 0)
        return;
    }

    return articles;
  }

  $scope.addArticle = function(article) {
    $scope.articles.push(article);
    $scope.new_article = "";
    return false;
  }

  $scope.removeArticle = function(article) {
  var index = $scope.articles.indexOf(article);
  $scope.articles.splice(index, 1);
}

}]);
