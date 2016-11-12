/**
 * Created by SURAJ on 11/12/2016.
 */

(function () {

    var dependencies = ['$http', '$cookies'];
    var commonFactory = function ($http, $cookies) {

        var factory = {};

        factory.apiBaseUrl = "http://localhost:3000/api/";

        return factory;
    };

    commonFactory.$inject = dependencies;
    app.factory('commonService', commonFactory);
}());