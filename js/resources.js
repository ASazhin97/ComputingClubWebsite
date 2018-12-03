// 1. create the module / app, make sure ng-app points to it.
var newsApp = angular.module('newsApp', []);
// 2. create the controller and give it $scope.
newsApp.controller("newsController", ['$scope', function($scope) {
  $scope.new_article = {};
  $scope.articles = [{
      name: "Java Programming: Let's Build a Game",
      date: '2014/09/16',
      link: 'https://www.youtube.com/watch?v=1gir2R7G9ws',
      summary: "A Youtube series on the very basic fundamentals of Java game design. Learn how to create your own bullet hell Wave Game with step-by-step instructions from Zack Berenger."
    },
    {
      name: "Create A Responsive Bootstrap Website From Scratch",
      date: '2017/08/14',
      link: 'https://www.youtube.com/watch?v=eIWRbvE1B2E',
      summary: "Once you know the basics of HTML and how to build a simple wesbite, watch this Youtube video where Drew Ryan will show you how to design a website that meets today's web standards using Bootstrap."
    },
    {
      name: "Head First Android Development Source Code",
      date: '2017/05/23',
      link: 'https://github.com/dogriffiths/HeadFirstAndroid',
      summary: "New to Android development and don't have the slightest clue how to start coding in Android Studio? Do not fear! Follow the tutorials in Head First Android Development by Dawn Griffiths and David Griffiths and check your results against the source code here."
    },
    {
      name: "Basic Git Commands",
      date: '2017/09/21',
      link: 'https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html',
      summary: "If it's been a while since you last used git in your terminal, brush up on your git commands with this helpful list from Atlassian. The push and pull of GitHub awaits!"
    },
    {
      name: "Scala with Cats",
      date: '2017/11/01',
      link: 'https://books.underscore.io/scala-with-cats/scala-with-cats.pdf',
      summary: "Whether you are new to Scala, have taken a course in Scala already, or just really like cats, you could benefit from reading this book by Noel Welsh and Dave Gurnell. "
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

}]);
