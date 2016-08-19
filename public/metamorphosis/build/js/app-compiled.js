(function () {

	var anguNg = ['ngAria', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngNotify', 'ngMask'];
	var anguEx = ['ui.bootstrap', 'mgcrea.ngStrap', 'angularMoment', 'bootstrapLightbox'];
	var routerCtrl = ['promiseIndexedDb.router', 'promiseIndexedDb.ctrl'];
	var cons = ['promiseIndexedDb.constant'];
	var serv = ['promiseIndexedDb.sig.service', 'promiseIndexedDb.service', 'promiseIndexedDb.promise.factory'];
	var dir = ['promiseIndexedDb.dir', 'promiseIndexedDb.cust.dir'];

	var depedencyArr = anguNg.concat(anguEx, routerCtrl, cons, serv, dir);
	/**
	* promiseIndexedDb Module
	*
	* The main module of this application...
	*/
	angular.module('promiseIndexedDb', depedencyArr);

	angular.module('promiseIndexedDb.router', ['ui.router']);
	angular.module('promiseIndexedDb.constant', []);
	angular.module('promiseIndexedDb.sig.service', []);
	angular.module('promiseIndexedDb.service', []);
	angular.module('promiseIndexedDb.promise.factory', []);
	angular.module('promiseIndexedDb.ctrl', []);
	angular.module('promiseIndexedDb.dir', ['promiseIndexedDb.service', 'promiseIndexedDb.sig.service']);
	angular.module('promiseIndexedDb.cust.dir', ['promiseIndexedDb.service', 'promiseIndexedDb.sig.service']);

})();
(function () {
	var rM = angular.module('promiseIndexedDb.router');

	// rM

})();
(function () {
	var cosM = angular.module('promiseIndexedDb.constant');

})();
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

(function () {
	var cdM = angular.module('promiseIndexedDb.cust.dir');

	// cdM

})();
(function () {
	var dM = angular.module('promiseIndexedDb.dir');

	// dM

})();
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

// service js Document
// $log.log("sigSrevice error line -- 15 --- data : "+data+" config: "+config+" status: "+status+".---");
	/*sM.service('verifyNumStrObjArrUndefinedElem', ['$log', function($log){
		
		this.IsNumberAndGreaterThanZero = function (figure) {
			var numBool = angular.isNumber(figure) && !isNaN(figure) && figure > 0;
			return numBool;
		};

		this.IsNumberAndGreaterThanWhileEqualZero = function (figure) {
			var numBool = angular.isNumber(figure) && !isNaN(figure) && figure >= 0;
			return numBool;
		};

		this.IsStringAndNotNull = function (str) {
			var strBool = angular.isString(str) && str.length > 0 && str !== null && str !== '';
			return strBool;
		};

		this.IsUndefined = function (testimony) {
			var refBool = angular.isUndefined(testimony);
			return refBool;
		};

		this.IsJqOrDomElem = function (jqdomElem) {
			var argBool = angular.isElement(jqdomElem) && typeof(jqdomElem) !== 'undefined';
			return argBool;
		};

		this.IsObjAndNotEmpty = function (obj) {
			var objBool = angular.isObject(obj) && Object.keys(obj).length > 0 && typeof(obj) !== 'undefined';
			return objBool;
		};

		this.IsArrayAndNotUnfilled = function (arr) {
			var arrBool = angular.isArray(arr) && arr.length > 0 && typeof(arr) !== 'undefined';
			return arrBool;
		}

	}]);*/
(function () {
	var sM = angular.module('promiseIndexedDb.service');

	// sM

})();
// service js Document
// $log.log("sigSrevice error line -- 14 --- data : "+data+" config: "+config+" status: "+status+".---");
/*sigM.service('inquireInfo', ['$http', '$log', 'appnameDb', function($http, $log, appnameDb){
	var dbPath = appnameDb.dbDot+appnameDb.delimiter+appnameDb.dbPrefix+appnameDb.delimiter+appnameDb.dbName+appnameDb.dbExtension;

	this.obtainDossier = function (func) {
		$http.get(dbPath)
		.then(function (testimony) {
			func(testimony.data);
			$log.log('get data successfully. '+dbPath);
		})
		.catch(function (data, config, status) {
			$log.log("sigSrevice error line -- 16 -\&\#1046\;- data : "+data+" config: "+config+" status: "+status+".---");
		})
		.finally(function () {
			$log.log('sigSrevice line 19, finally method.');
		});
	};

}]);*/
(function () {
	var ssM = angular.module('promiseIndexedDb.sig.service');

	// ssM

})();
// jQuery Js Document
$(document).ready(function() {
	/*notice ();
	initWow ();*/
});

function notice () {
	alert('pls, disable this function.'+window.location);
}

function initWow () {
	new WOW().init();
}