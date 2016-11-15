/**
 * Created by SURAJ on 11/11/2016.
 */
angular.module("ojassadmin").controller("loginController", ['$scope', '$cookies', '$http', '$state', 'commonService', function ($scope, $cookies, $http, $state, commonService) {

    if($cookies.get("secure_token") === undefined){
        $cookies.put("secure_token",defaulttoken);
    }else if($cookies.get("secure_token") != defaulttoken){
        $state.go("dashboard");
    }
    $scope.email = "";
    $scope.password = "";
    $scope.message = "";
    $scope.mtype = "5";
    $scope.signin = function () {
        if ($scope.email == "" || $scope.password == "") {
            $scope.message = "Enter all Details";
            $scope.mtype = 0;
        } else {
            $scope.mtype = 1;
            $scope.message = "Checking...";
            var data = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post(commonService.apiBaseUrl + "signin", data).then(function (results) {
                if (results.data.success == true) {
                    commonService.loggedInUserData = results.data.userData;
                    $cookies.put("secure_token",commonService.loggedInUserData.token);
                    $cookies.put("uid",commonService.loggedInUserData.uid);
                    $state.go("dashboard");
                    DEBUG && console.log(results.data);
                } else {
                    if (results.data.message == "invalid credentials") {
                        $scope.mtype = 0;
                        $scope.message = "Incorrect Password";
                    } else if (results.data.message == "user doesnt exist") {
                        $scope.mtype = 0;
                        $scope.message = "User doesn't exist";
                    }
                }
            });
        }
    }
}]);