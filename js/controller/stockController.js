app.controller('StockController', function($scope, $http, $state, $location, $rootScope, $stateParams, $timeout) {

	$scope.stockCodes = ['GOOG', 'BABA'];

	$scope.getCharts = function() {
		for(i in $scope.stockCodes) {
			getStockList(i, $scope.stockCodes[i]);
		}
	}

	//controller里对应的处理函数
	$scope.renderFinish = function() {

		$timeout(function() {
			$scope.getCharts();
		}, 0);
	}

	var time = '14';
	var getStockList = function(index, code) {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/stocks?" + "&time=" + time + "&code=" + code,
			"method": "GET",
			"callbackFunction": function(response) {
				console.log(response);
				var chart = echarts.init($("#container_" + $scope.stockCodes[index])[0]);
				chart.setOption(getLineBarChart(formData(response.stockList), {}, $scope.stockCodes[index]));
			}
		});
	}

	var formData = function(stockList) {
		xAxis = [];
		prices = [];
		percents = [];
		for(i in stockList) {
			xAxis.push(stockList[i].date);
			prices.push(stockList[i].price);
		}
		for(i in prices) {
			var percent = parseFloat((((prices[i] - prices[0]) / prices[0]) * 100).toFixed(2));
			console.log(percent)
			percents.push(percent);
		}
		data = {};
		data.legend = ['股价', '增长率'];
		data.xAxis = xAxis;
		data.series = [];
		stockPrice = {};
		stockPercent = {};
		stockPrice.name = '股价';
		stockPercent.name = '增长率';
		stockPrice.data = prices;
		stockPercent.data = percents;
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