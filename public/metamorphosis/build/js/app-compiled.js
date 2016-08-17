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
(function () {
	var ctrlM = angular.module('promiseIndexedDb.ctrl');

	// ctrlM

})();
(function () {
	var cdM = angular.module('promiseIndexedDb.cust.dir');

	// cdM

})();
(function () {
	var dM = angular.module('promiseIndexedDb.dir');

	// dM

})();
(function () {
	var promiseM = angular.module('promiseIndexedDb.promise.factory');

	// promiseM

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