(function() {
    var promiseM = angular.module('promiseIndexedDb.promise.factory');

    promiseM.factory('indexedDbCoorporative', ['$window', '$q', function($window, $q) {
        var indexedDbFactory = {};
        var indexedDbItself = $window.indexedDB;
        var dbResults = null;
        var lastIndexPointer = 0;
        var _dbName = 'todoData';

        indexedDbFactory.openNewIndexedDB = function() {
            var _def = $q.defer();
            var version = 1;
            var request = indexedDbItself.open(_dbName, version);

            request.onupgradeneeded = function(resEvent) {
                dbResults = resEvent.target.result;
                resEvent.target.transaction.onerror = indexedDbItself.onerror;
                if (dbResults.objectStoreNames.contains("todo")) {
                    dbResults.deleteObjectStore("todo");
                }
                var store = dbResults.createObjectStore("todo", { keyPath: "id" });
            };
            request.onsuccess = function(res) {
                dbResults = res.target.result;
                _def.resolve();
            };
            request.onerror = function() {
                _def.reject();
            };

            return _def.promise;
        };

        indexedDbFactory.getTodosFromIndexedDb = function() {
            var _def = $q.defer();

            if (dbResults === null) {
                _def.reject("IndexDB is not opened yet!");
            } else {
                var trans = dbResults.transaction(["todo"], "readwrite");
                var store = trans.objectStore("todo");
                var todosArray = [];

                // Get everything in the store;
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = store.openCursor(keyRange);

                cursorRequest.onsuccess = function(getRes) {
                    var getDataResult = getRes.target.result;
                    if (getDataResult === null || getDataResult === undefined) {
                        _def.resolve(todosArray);
                    } else {
                        todosArray.push(getDataResult.value);
                        if (getDataResult.value.id > lastIndexPointer) {
                            lastIndexPointer = getDataResult.value.id;
                        }
                        getDataResult.continue();
                    }
                };

                cursorRequest.onerror = function(error) {
                    console.log(error.value);
                    _def.reject("Something went wrong!!!");
                };
            }

            return _def.promise;
        };

        indexedDbFactory.addTodoToIndexedDb = function(theTodoWord) {
            var _def = $q.defer();

            if (dbResults === null) {
                _def.reject("IndexDB is not opened yet!");
            } else {
                var trans = dbResults.transaction(["todo"], "readwrite");
                var store = trans.objectStore("todo");
                lastIndexPointer++;
                var request = store.put({
                    "id": lastIndexPointer,
                    "text": theTodoWord
                });

                request.onsuccess = function(addSuccessRes) {
                    _def.resolve();
                };

                request.onerror = function(addError) {
                    console.log(addError.value);
                    _def.reject("Todo item couldn't be added!");
                };
            }
            return _def.promise;
        };

        indexedDbFactory.deleteTodoFromIndexedDB = function(IDforDelete) {
            var _def = $q.defer();

            if (dbResults === null) {
                _def.reject("IndexDB is not opened yet!");
            } else {
                var trans = dbResults.transaction(["todo"], "readwrite");
                var store = trans.objectStore("todo");

                var request = store.delete(IDforDelete);

                request.onsuccess = function(delRes) {
                    _def.resolve();
                };

                request.onerror = function(delError) {
                    console.log(delError.value);
                    _def.reject("Todo item couldn't be deleted");
                };
            }

            return _def.promise;
        };

        return indexedDbFactory;
    }]);

})();
