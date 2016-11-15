/**
 * Created by SURAJ on 11/12/2016.
 */
angular.module("ojassadmin").controller("dashboardController",["$scope","$http",'$cookies','$state',"commonService",function($scope,$http,$cookies,$state,commonService){
    if($cookies.get("secure_token") === undefined || $cookies.get("secure_token") == defaulttoken){
        $state.go("login");
    }else{
        setTimeout(function(){
            $scope.loggedInUserData = commonService.loggedInUserData;
            $scope.$apply();
        },1000);
    }

    $scope.logout = function(){
        $cookies.remove("secure_token");
        $cookies.remove("uid");
        $state.go("login");
    }




}]);