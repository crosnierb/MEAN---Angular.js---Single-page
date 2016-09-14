// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var microbloggosApp = angular.module('MicroBloggos', ['ngRoute', 'ngCookies']);

    // configure our routes
    microbloggosApp.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'authentification/login.html',
                controller  : 'authController'
            })

            // route for the register page
            .when('/register', {
                templateUrl : 'authentification/register.html',
                controller  : 'authController'
            })

            // route for the register page
            .when('/success', {
                templateUrl : 'success.html',
                controller  : 'sucController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'contact.html',
                controller  : 'contactController'
            });
    });

    microbloggosApp.run(function($rootScope, $cookies) {
    			if($cookies.get('token') && $cookies.get('currentUser')){
    				$rootScope.token = $cookies.get('token');
    				$rootScope.currentUser = $cookies.get('currentUser');
    		}
    });

    microbloggosApp.factory('success', function() {
      var savedData = {}
      function set(data) {
        savedData = data;
      }
      function get() {
        return savedData;
      }

      return {
        set: set,
        get: get
      }
    });

    // create the controller and inject Angular's $scope
    microbloggosApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    microbloggosApp.controller('authController', function($scope, $http, $location, success) {
      $scope.loginData = {
        email : '',
        password : ''
      };

      $scope.registerData = {
        username : '',
        email : '',
        password : ''
      };

   $scope.login = function(){
     $http({
       method : "POST",
       url : "login",
       data : $scope.loginData,
       headers: {
         'Content-Type' : 'application/json'
       }
     }).then(function(response) {
        if (!response.data.success) {
          $scope.message = response.data.message;
        }
        else {
          $location.path('/');
        }
       });
     }

     $scope.register = function(){
       $http({
         method : "POST",
         url : "register",
         data : $scope.registerData,
         headers: {
           'Content-Type' : 'application/json'
         }
       }).then(function(response) {
          if (!response.data.success) {
            $scope.message = response.data.message;
          }
          else {
            success.set({
              data: "Username: "+response.data.data.name+" | Email: "+response.data.data.email,
              message: response.data.message,
              link: {href: '#login', name: 'Login now on your account!' }
            });
            $location.path('/success');
          }
         });
       }

    $scope.logout = function(){
          console.log('response');
          $cookies.remove('token');
          $cookies.put('currentUser');
          $rootScope.token = null;
          $rootScope.currentUser = null;
        };
    });

    microbloggosApp.controller('sucController', function($scope, success) {
      console.log("foobabar out");
            $scope.message = success.get();
            console.log($scope.message);
    });

    microbloggosApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    microbloggosApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
