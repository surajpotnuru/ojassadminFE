/**
 * Created by SURAJ on 11/11/2016.
 */
DEBUG = true;
var defaulttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0ZDNiYjFiMC1hOTdlLTExZTYtYWM2MC1hNThjMjc3ODRkMTMiLCJpYXQiOjE0NzkwMjcxNjh9.zJNVc1APYdUiEBzfIfnnnXAKxd-BSce70eR-eGzkvGY";
var app = angular.module('ojassadmin', ['ngCookies', 'ui.router']);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['ojassadmin']);
});


app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "loginController"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "templates/dashboard.html",
            controller: "dashboardController"
        })
        .state("dashboard.addbranchhead", {
            url: "/addbranchhead",
            templateUrl: "templates/addBranchHead.html",
            controller: "addBranchHeadController"
        })
        .state("dashboard.updatebranch", {
            url: "/updatebranchdata",
            templateUrl: "templates/updatebranchdata.html",
            controller: "updateBranchDataController"
        })
        .state("dashboard.events", {
            url: "/events",
            templateUrl: "templates/events.html",
            controller: "eventsController"
        });
    $httpProvider.interceptors.push(function ($cookies) {
        return {
            'request': function (config) {
                $httpProvider.defaults.headers.common["x-access-token"] = $cookies.get("secure_token");
                return config;
            }
        }
    });
}]);