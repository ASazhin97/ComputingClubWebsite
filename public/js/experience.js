// 1. create the module / app, make sure ng-app points to it.
var newsApp = angular.module('newsApp', []);
// 2. create the controller and give it $scope.
newsApp.controller("newsController", ['$scope', function($scope) {
  $scope.new_article = {};
  $scope.articles = [{
      name: 'Julianna Shevchenko',
      date: '2018/11/03',
      event: '2018 Hackathon',
      image: 'jshev.png',
      quote: "It was kind of stressful. In the past they had given more time. It is kind of hard to get everything done. I am glad that we scoped our project really well."
    },
    {
        name: 'Charles Zhu',
        date: '2018/11/03',
        event: '2018 Hackathon',
        image: 'czhu.png',
        quote: "It is a rush. Those hours go by really quick. You plan out things that you try to do and sometimes you find out there are a lot of features that take way too much time and you gotta scale down and push out something that is presentable."
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
