app.controller('StockController', function($scope, $http, $state, $location, $rootScope, $stateParams, $timeout) {

	$scope.stockCodes = ['GOOGLE', 'ALIBABA'];

	$scope.getCharts = function() {
		for(i in $scope.stockCodes) {
			console.log(document.getElementById("container_" + $scope.stockCodes[i]));
			var chart = echarts.init($("#container_" + $scope.stockCodes[i])[0]);
			chart.setOption(getLineBarChart(getTestData(), {}, $scope.stockCodes[i]));
		}
	}

//controller里对应的处理函数
$scope.renderFinish = function() {
	
	$timeout(function() {
		$scope.getCharts();
	}, 0);
}

var getTestData = function() {
	data = {};
	data.legend = ['股价', '增长率'];
	data.xAxis = ['2017.11.14', '2018.12.14', '2018.01.14']
	data.series = [];
	stockPrice = {};
	stockPercent = {};
	stockPrice.name = '股价';
	stockPercent.name = '增长率';
	stockPrice.data = [1000, 1090, 1209.9];
	stockPercent.data = [0.0, 9.0, 11.0];
	data.series.push(stockPrice);
	data.series.push(stockPercent);
	return data;
}
}).directive('repeatFinish', function() {
	return {
		link: function(scope, element, attr) {
			console.log(scope.$index)
			if(scope.$last) {
				console.log('ng-repeat执行完毕');
				scope.$eval(attr.repeatFinish);
			}
		}
	}
});