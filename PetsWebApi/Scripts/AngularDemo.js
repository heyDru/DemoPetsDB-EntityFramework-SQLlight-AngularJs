var app = angular.module('ownerModule', ['ngRoute']);

app.config([
    '$routeProvider', function($routeProvider) {
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
            redirecTo:'/'
            });
    }
]);

app.controller('petController', function ($scope,$http, $routeParams, $window, petPagination, OwnerService) {

    $scope.reloadRoute = function () {
        $window.location.reload();
    }

    $scope.ownerId = $routeParams.id;

    OwnerService.getOwner($scope.ownerId)
        .then(function(response) {
           petPagination.setPets(response.data.Pets);
           $scope.totalPetsCount = response.data.Pets.length;
           $scope.petsData = petPagination.getPagePets();
           $scope.paginationList = petPagination.getPaginationList();
            $scope.petsOwnerName = response.data.Name;
        });

    $scope.showPage = function (page) {
        if (page === 'prev') {
            $scope.petsData = petPagination.getPrevPage();
        } else {
            if (page === 'next') {
                $scope.petsData = petPagination.getNextPage();
            } else {
                $scope.petsData = petPagination.getPagePets(page);
            }
        }
    }

    $scope.getCurrentPageNum = function () {
        return petPagination.getCurrentPageNum();
    }

    $scope.save = function (petName) {
        $scope.pet = {
            Name: petName,
            OwnerId:  $scope.ownerId
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

    $scope.delete = function (id) {
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

});

app.factory('petPagination', function ($sce) {
    var currentPage = 0;
    var itemsPerPage = 3;
    var pets = [];

    return {
        setPets: function (newPets) {
            pets = newPets;
        },

        getPagePets: function (num) {
            num = angular.isUndefined(num) ? 0 : num;
            var first = itemsPerPage * num;
            var last = first + itemsPerPage;
            currentPage = num;
            last = last > pets.length ? pets.length : last;
            return pets.slice(first, last);
        },

        getTotalPagesNumber: function () {
            return Math.ceil(pets.length / itemsPerPage);
        },

        getPaginationList: function () {
            var pagesNum = this.getTotalPagesNumber();
            var paginationList = [];
            paginationList.push({
                name: $sce.trustAsHtml('&laquo;'),
                link: 'prev'
            });
            for (var i = 0; i < pagesNum; i++) {
                var name = i + 1;
                paginationList.push({
                    name: $sce.trustAsHtml(String(name)),
                    link: i
                });
            };
            paginationList.push({
                name: $sce.trustAsHtml('&raquo;'),
                link: 'next'
            });
            if (pagesNum > 1) {
                return paginationList;
            } else {
                return false;
            }
        },

        getCurrentPageNum: function () {
            return currentPage;
        },

        getPrevPage: function () {
            var prevPageNum = currentPage - 1;
            if (prevPageNum < 0) prevPageNum = 0;
            return this.getPagePets(prevPageNum);
        },

        getNextPage: function () {
            var nextPageNum = currentPage + 1;
            var maxPagesLength = this.getTotalPagesNumber();
            if (nextPageNum >= maxPagesLength) nextPageNum = maxPagesLength - 1;
            return this.getPagePets(nextPageNum);
        }
    }
});

app.controller('ownerController',
    function($scope, $http, $window, OwnerService, pagination) {

        $scope.reloadRoute = function() {
            $window.location.reload();
        }

        OwnerService.getAllOwners().then(function(d) {
                pagination.setOwners(d.data);
                $scope.totalOwnersCount = d.data.length;
                $scope.ownersData = pagination.getPageOwners();
                $scope.paginationList = pagination.getPaginationList();
            },
            function() {
                alert('Error!!!');
            });

        $scope.showPage = function(page) {
            if (page === 'prev') {
                $scope.ownersData = pagination.getPrevPage();
            } else {
                if (page === 'next') {
                    $scope.ownersData = pagination.getNextPage();
                } else {
                    $scope.ownersData = pagination.getPageOwners(page);
                }
            }
        }

        $scope.getCurrentPageNum = function() {
            return pagination.getCurrentPageNum();
        }

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

        $scope.accesDialog = function (id, name) {
            $scope.idToDelete = id;
           // $scope.nameToDelete = name;
            $scope.popUpDialogContent = "Delete this owner -"+ name +"? ";
            $scope.popupDialogCallback = 'delete'//$scope.delete(id);
            $scope.showPopUpDialog = true;
        };


    }).directive('popUpDialog',
    function() {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/VIews/popUpDialog.html',
            controller: function($scope) {
                $scope.showPopUpDialog = false;
                $scope.closePopUpDialog=function() {
                    $scope.showPopUpDialog = false;
                }
                $scope.popUpDialogApprove = function () {
                    $scope[$scope.popupDialogCallback]($scope.idToDelete);
                    $scope.showPopUpDialog = false;
                }
            }
        }
    });
    

app.factory('OwnerService', function ($http, pagination) {
    var fac = {};
    return{ 
        getAllOwners : function() {
        return $http.get('http://localhost:49616/api/Owner/');
        },

        getOwner: function(id) {
            return $http.get('http://localhost:49616/api/Owner/' + id);
        }
    }
});

app.factory('pagination', function ($sce) {
    var currentPage = 0;
    var itemsPerPage = 3;
    var owners = [];
    
    return {
        setOwners:function(newOwners) {
            owners = newOwners;
        },

        getPageOwners: function(num) {
            num = angular.isUndefined(num) ? 0 : num;
            var first = itemsPerPage * num;
            var last = first + itemsPerPage;
            currentPage = num;
            last = last > owners.length ? owners.length : last;
            return owners.slice(first, last);
        },

        getTotalPagesNumber:function() {
            return Math.ceil(owners.length / itemsPerPage);
        },

        getPaginationList:function() {
            var pagesNum = this.getTotalPagesNumber();
            var paginationList = [];
            paginationList.push({
                name:$sce.trustAsHtml( '&laquo;'),
                link: 'prev'
            });
            for (var i = 0; i < pagesNum; i++) {
                var name = i + 1;
                paginationList.push({
                    name: $sce.trustAsHtml(String(name)),
                    link: i
                });
            };
            paginationList.push({
                name: $sce.trustAsHtml('&raquo;'),
                link: 'next'
            });
            if (pagesNum > 1) {
                return paginationList;
            } else {
                return false;
            }
        },

        getCurrentPageNum:function() {
            return currentPage;
        },

        getPrevPage:function() {
            var prevPageNum = currentPage - 1;
            if (prevPageNum < 0) prevPageNum = 0;
            return this.getPageOwners(prevPageNum);
        },

        getNextPage: function () {
            var nextPageNum = currentPage + 1;
            var maxPagesLength = this.getTotalPagesNumber();
            if (nextPageNum >= maxPagesLength) nextPageNum = maxPagesLength-1;
            return this.getPageOwners(nextPageNum);
        }
    }
});



