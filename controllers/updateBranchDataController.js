/**
 * Created by SURAJ on 11/15/2016.
 */
angular.module("ojassadmin").controller("updateBranchDataController", ['$scope', '$http', '$cookies', 'commonService', function ($scope, $http, $cookies, commonService) {
    $scope.branchid = commonService.loggedInUserData.branchid;
    function getBranchDetails() {
        $http.get(commonService.apiBaseUrl + "branchdetails/" + $scope.branchid).then(function (results) {
            DEBUG && console.log(results);
            $scope.branchname = results.data.message.branchname;
            $scope.branchdesc = results.data.message.branchdesc;
            $scope.tevents = results.data.message.tevents;
            $scope.totalprize = results.data.message.totalprize;
        });
    }

    getBranchDetails();
    $scope.saveBranchDetails = function () {
        if ($scope.branchname == "" || $scope.branchdesc == "" || $scope.totalprize == "") {
            $scope.mtype = 0;
            $scope.message = "Enter all details";
        } else {
            $scope.mtype = 2;
            $scope.message = "Saving...";
            var data = {
                branchname: $scope.branchname,
                branchdesc: $scope.branchdesc,
                tprize: $scope.totalprize,
                branchid: $scope.branchid
            };
            $http.post(commonService.apiBaseUrl + "branchdetails", data).then(function (results) {
                if (results.data.success == true) {
                    $scope.mtype = 1;
                    $scope.message = "Saved";
                    getBranchDetails();
                    setTimeout(function(){
                        $scope.mtype = 5;
                        $("#closebrancheditmodal").trigger("click");
                    },2000);
                }
            });
        }
    }
}]);