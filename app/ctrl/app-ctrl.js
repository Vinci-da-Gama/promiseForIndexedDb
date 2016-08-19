(function() {
    var ctrlM = angular.module('promiseIndexedDb.ctrl');

    ctrlM.controller('IndexedDBTodosCtrl', ['$scope', '$window', 'indexedDbCoorporative', function($scope, $window, indexedDbCoorporative) {
        console.log('5 -- IndexedDBTodosCtrl.');
        function init() {
            indexedDbCoorporative.openNewIndexedDB()
            .then(function() {
                $scope.refreshTodos();
            });
        }
        init();
        $scope.todoList = [];

        $scope.refreshTodos = function() {
            indexedDbCoorporative.getTodosFromIndexedDb()
            .then(function(data) {
                $scope.todoList = data;
                console.log('19 -- $scope.todoList is: ', $scope.todoList);
            }, function(err) {
                $window.alert(err);
            });
        };

        $scope.addToIndexedDb = function() {
            indexedDbCoorporative.addTodoToIndexedDb($scope.todoToIndexedDb)
            .then(function() {
                $scope.refreshTodos();
                $scope.todoToIndexedDb = "";
            }, function(err) {
                $window.alert(err);
            });
        };

        $scope.removeThisTodo = function(id) {
        	console.log('35 -- deleted id is: '+id);
            indexedDbCoorporative.deleteTodoFromIndexedDB(id)
            .then(function() {
                $scope.refreshTodos();
            }, function(err) {
                $window.alert(err);
            });
        };

    }]);

})();
