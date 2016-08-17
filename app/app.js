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