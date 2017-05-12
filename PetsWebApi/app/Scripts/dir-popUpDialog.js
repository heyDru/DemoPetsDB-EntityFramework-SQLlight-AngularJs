app.directive('dir-popUpDialogPet', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/VIews/popUpDialog.html',
        controller: function ($scope) {
            $scope.showPopUpDialog = false;
            $scope.closePopUpDialog = function () {
                $scope.showPopUpDialog = false;
            }
            $scope.popUpDialogApprove = function () {
                $scope[$scope.popupDialogCallback]($scope.idToDelete);
                $scope.showPopUpDialog = false;
            }
        }
    }
});