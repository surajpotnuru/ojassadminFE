/**
 * Created by SURAJ on 11/11/2016.
 */

var app = angular.module('ojassadmin', ['ngCookies','ui.router']);
angular.element(document).ready(function(){
    angular.bootstrap(document,['ojassadmin']);
});


app.config(['$stateProvider','$urlRouterProvider','$httpProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state("login",{
        url:"/login",
        templateUrl:"templates/login.html",
        controller:"loginController"
    })
        .state("dashboard",{
            url:"/dashboard",
            templateUrl: "templates/dashboard.html",
            controller: "dashboardController"
        });
}]);