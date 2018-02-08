app.controller('IndexController', function($scope, $http, $location, $state, $rootScope) {
	http = $http;
	
	$scope.getNavItemClass = function(path) {
		var url = $location.path();
		if(url == "/") {
			url = "/";
		}
		if(url == path) {
			//TODO: 加载页面时会频繁触发，为什么？
			return "layui-nav-item layui-this";
		}
		return "layui-nav-item";
	};
});
