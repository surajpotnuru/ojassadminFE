/**
 * Created by SURAJ on 11/12/2016.
 */

(function () {

    var dependencies = ['$http', '$cookies'];
    var commonFactory = function ($http, $cookies) {

        var factory = {};

        factory.apiBaseUrl = "http://localhost:3000/api/";
        factory.loggedInUserData = {
        };
        if($cookies.get("uid") != undefined){
            $http.get(factory.apiBaseUrl+"user/"+$cookies.get("uid")).then(function(result){
                DEBUG && console.log(result);
                factory.loggedInUserData = result.data.message;
                DEBUG && console.log(factory.loggedInUserData);
            });
        }
        return factory;
    };

    commonFactory.$inject = dependencies;
    app.factory('commonService', commonFactory);
}());