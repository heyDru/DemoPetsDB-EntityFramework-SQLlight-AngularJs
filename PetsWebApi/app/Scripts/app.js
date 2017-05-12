var app = angular.module('ownerModule', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'app/VIews/Index.html',
                controller: 'ownerController'
            })
            .when('/Owner/:id',
            {
                templateUrl: 'app/VIews/OwnerView.html',
                controller: 'petController'
            })
            .when('/test',
            {
                templateUrl: 'app/VIews/Test.html',
                controller: 'petCOntroller'
            })
        .otherwise({
            redirecTo: '/'
        });
    }
]);

app.directive('popUpDialog', function () {
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

app.controller('petController',function($scope, $http, $routeParams, $window, OwnerService) {
        $scope.allPets = null;

        $scope.sortKey = 'Name';

        $scope.sort = function(key) {
            $scope.sortKey = key;
            $scope.reverse = !$scope.reverse;
        }

        $scope.reloadRoute = function() {
            $window.location.reload();
        }

        $scope.ownerId = $routeParams.id;

        OwnerService.getOwner($scope.ownerId)
            .then(function(response) {
                $scope.allPets = response.data.Pets;
                $scope.totalPetsCount = response.data.Pets.length;
                $scope.petsOwnerName = response.data.Name;
            });

        $scope.save = function(petName) {
            $scope.pet = {
                Name: petName,
                OwnerId: $scope.ownerId
            };
            $http({
                method: 'POST',
                url: 'http://localhost:49616/api/Pet/',
                data: $scope.pet
            }).then(function successCallback(response) {
                $scope.pet = {};
                $scope.petName = null;
                alert("Pet Added Successfully !!!");
                $scope.reloadRoute();

            });
        };

        $scope.delete = function(id) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:49616/api/Pet/' + id
            }).then(function successCallback(response) {
                    $scope.reloadRoute();
                    alert("Owner Deleted Successfully !!!");
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };

        $scope.accesDialog = function(id, name) {
            $scope.idToDelete = id;
            $scope.popUpDialogContent = "Delete this pet - " + name + "? ";
            $scope.popupDialogCallback = 'delete' //$scope.delete(id);
            $scope.showPopUpDialog = true;
        };

    });

app.controller('ownerController',function($scope, $http, $window, OwnerService) {

        $scope.allOwner = null;

        $scope.sortKey = 'Name';

        $scope.sort = function(key) {
            $scope.sortKey = key;
            $scope.reverse = !$scope.reverse;
        }


        $scope.reloadRoute = function() {
            $window.location.reload();
        }

        OwnerService.getAllOwners().then(function(d) {
                $scope.allOwner = (d.data);
                $scope.totalOwnersCount = d.data.length;
            },
            function() {
                alert('Error!!!');
            });

        $scope.save = function(ownerName) {
            $scope.owner = {
                Name: ownerName
            };
            $http({
                method: 'POST',
                url: 'http://localhost:49616/api/Owner/',
                data: $scope.owner
            }).then(function successCallback(response) {
                $scope.owner = {};
                $scope.ownerName = null;
                alert("Owner Added Successfully !!!");
                $scope.reloadRoute();

            });
        };

        $scope.delete = function(id) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:49616/api/Owner/' + id
            }).then(function successCallback(response) {
                    $scope.reloadRoute();
                    alert("Owner Deleted Successfully !!!");
                },
                function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
        };

        $scope.accesDialog = function(id, name) {
            $scope.idToDelete = id;
            $scope.popUpDialogContent = "Delete this owner - " + name + "? ";
            $scope.popupDialogCallback = 'delete' //$scope.delete(id);
            $scope.showPopUpDialog = true;
        };

    });
    
app.factory('OwnerService', function ($http) {
    var fac = {};
    return {
        getAllOwners: function () {
            return $http.get('http://localhost:49616/api/Owner/');
        },

        getOwner: function (id) {
            return $http.get('http://localhost:49616/api/Owner/' + id);
        }
    }
});







