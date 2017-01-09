/**
 * Created by SURAJ on 11/15/2016.
 */

angular.module("ojassadmin").controller("eventsController", ['$scope', '$http', '$cookies', 'commonService', function ($scope, $http, $cookies, commonService) {
    $http.get(commonService.apiBaseUrl + "allevents/" + commonService.loggedInUserData.branchid).then(function (results) {
        DEBUG && console.log(results.data.message);
        $scope.eventsdata = results.data.message;
        angular.forEach($scope.eventsdata,function(value, key){
            value.rules = [];
            value.penalties = [];
        });
        DEBUG && console.log($scope.eventsdata);
        setTimeout(function () {
            $("#eventstab li:first-child").addClass("active");
            $("#eventstabpanel div:first-child").addClass("active");
        }, 10);
    });
    $scope.addRuleCurrentEvent = "";
    $scope.addRuleCurrentEid = "";
    $scope.addedRule = "";
    $scope.addRuleModalOpen = function (ename, eid) {
        $scope.addRuleCurrentEvent = ename;
        $scope.addRuleCurrentEid = eid;
        $("#addRuleModal").modal();
    };
    $scope.addRule = function () {
        if ($scope.addedRule == "") {
            $scope.mtype = 0;
            $scope.message = "Enter the rule";
        } else {
            var data = {
                rule: $scope.addedRule,
                eid: $scope.addRuleCurrentEid
            };
            $http.post(commonService.apiBaseUrl + "addrule", data).then(function (results) {
                if (results.data.success == true && results.data.message == "rule added") {
                    $scope.mtype = 1;
                    $scope.message = "Rule added successfully";
                    $scope.addRuleCurrentEvent = "";
                    $scope.addRuleCurrentEid = "";
                    $scope.addedRule = "";
                    setTimeout(function(){
                        $("#closeAddRuleModal").trigger("click");
                    },1000);
                } else if (results.data.success == false && results.data.message == "invalid event") {
                    $scope.mtype = 0;
                    $scope.mtype = "Error";
                }
            });
        }
    };
}]);