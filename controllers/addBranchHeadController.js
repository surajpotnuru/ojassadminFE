/**
 * Created by SURAJ on 11/13/2016.
 */
angular.module("ojassadmin").controller("addBranchHeadController", ['$scope', '$cookies', '$http', '$state', 'commonService', function ($scope, $cookies, $http, $state, commonService) {
    $http.get(commonService.apiBaseUrl + "branches").then(function (results) {
        DEBUG && console.log(results);
        $scope.allBranchData = results.data.message;
    });
    function getBranchHeads() {
        $http.get(commonService.apiBaseUrl + "branchheads").then(function (results) {
            DEBUG && console.log(results.data);
            $scope.branchheadsdata = results.data.message;
        });
    }

    getBranchHeads();

    $scope.addBHName = "";
    $scope.addBHEmail = "";
    $scope.addBHPassword = "";
    $scope.addBHPhone = "";
    $scope.branchid = "";
    $scope.mtype = 2;
    $scope.message = "";

    $scope.editBH = function (item) {
        $scope.editBHName = item.name;
        $scope.editBHEmail = item.email;
        $scope.editBHPhone = item.phone;
        $scope.editBHUid = item.uid;
        $("#editBranchHeadModal").modal();

    };
    $scope.editBranchHead = function () {
        if ($scope.editBHName == "" || $scope.editBHEmail == "" || $scope.editBHPhone == "") {
            $scope.mtype = 0;
            $scope.message = "Enter all details";
        } else {
            var data = {
                name: $scope.editBHName,
                phone: $scope.editBHPhone,
                email: $scope.editBHEmail,
                uid: $scope.editBHUid
            };
            $http.post(commonService.apiBaseUrl + "update", data).then(function (results) {
                if (results.data.success == true) {
                    $scope.mtype = 1;
                    $scope.message = "Updated Successfully";
                    getBranchHeads();
                    DEBUG && console.log("BRANCH HEADS DATA\n");
                    DEBUG && console.log($scope.branchheadsdata);
                    setTimeout(function () {
                        $scope.mtype = 5;
                        $scope.message = "";
                        $scope.closeEditBHModal();
                    }, 2000);
                }
            });
        }
    };
    $scope.closeEditBHModal = function () {
        $("#editBranchHeadModal").trigger("click");
    };
    $scope.deleteBH = function (uid, name, branchname, item) {
        var x = window.confirm("Remove " + name + " as Branch Head for " + branchname + " ?");
        if (x) {
            $http.delete(commonService.apiBaseUrl + "user/" + uid).then(function (results) {
                if (results.data.success == true) {
                    var index = item.$index;
                    $scope.branchheadsdata.splice(index, 1);
                    alert("Removed");
                } else {
                    alert("Problem Occured !!! Try Later");
                }
            });
        }
        $scope.$apply();
    };
    $scope.addBranchHead = function () {
        if ($scope.addBHName == "" || $scope.addBHPassword == "" || $scope.addBHPhone == "" || $scope.addBHEmail == "") {
            $scope.mtype = "0";
            $scope.message = "Enter all details"
        } else {
            $scope.mtype = 2;
            $scope.message = "Adding...";
            var data = {
                name: $scope.addBHName,
                email: $scope.addBHEmail,
                password: $scope.addBHPassword,
                phone: $scope.addBHPhone,
                accessLevel: 2,
                branch: $scope.branchid
            };
            DEBUG && console.log(data);
            $http.post(commonService.apiBaseUrl + "signup", data).then(function (results) {
                if (results.data.success == true && results.data.message == "registration successfull") {
                    $scope.mtype = 1;
                    $scope.message = "Branch Head Added";
                    getBranchHeads();
                    setTimeout(function () {
                        $scope.addBHName = "";
                        $scope.addBHEmail = "";
                        $scope.addBHPassword = "";
                        $scope.addBHPhone = "";
                        $scope.branchid = "";
                        $scope.mtype = 2;
                        $scope.message = "";
                        $scope.$apply();
                        $("#closebhaddmodal").trigger("click");
                    }, 2000);
                } else {
                    if (results.data.message == "branch heads already registered") {
                        $scope.mtype = 0;
                        $scope.message = "Branch Heads already added for this event"
                    } else if (results.data.message == "branchhead with this email already exists") {
                        $scope.mtype = 0;
                        $scope.message = "Branch head with email already exists";
                    }
                }
            });
        }
    }
}]);