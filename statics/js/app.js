var app = angular.module('Interface',[]);

var api = {
	'login' : '/api/login',
	'logout' : '/api/logout',
	'menu' : '/api/menu'
};

var preference = {
	'grid' : '/preferences/grid'
};


app.filter('html',['$sce', function($sce){
	return function(input){
		return $sce.trustAsHtml(input);
	};
}]);