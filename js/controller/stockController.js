app.controller('StockController', function($scope, $http, $state, $location, $rootScope, $stateParams) {
	
	// 指定图表的配置项和数据
        function randomData() {
            console.log('random');
        }

        var chart, chart2;
        $(function() {
            // 体重
            chart = new Highcharts.Chart({
                chart: {
                    type: 'spline',
                    renderTo: 'container'
                },
                title: {
                    text: '孕妇体重'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: null
                    },
                    dateTimeLabelFormats: {
		                millisecond: '%m-%d',
						second: '%m-%d',
						minute: '%m-%d',
						hour: '%m-%d',
						day: '%m-%d',
						week: '%m-%d',
						month: '%m-%d',
						year: '%Y'
		            },
                    showFirstLabel: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: '体重(kg)'
                    }
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                	headerFormat: '<b>{series.name}</b><br>',
                	pointFormat: '{point.x:%m-%d}: {point.y:.1f} kg'
                },
                series: [{
                    name: '体重',
                    lineWidth: 1,
                    marker: { 
                        radius: 3
                    },
                    data: [
                    ]
                }, {
                    name: '体重上限',
                    lineWidth: 1,
                    marker: { 
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#FF0000',
                    data: [
                    ]
                } ,{
                    name: '体重下限',
                    lineWidth: 1,
                    marker: { 
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#4876FF',
                    data: [
                    ]
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });

            // 血压
            chart2 = new Highcharts.Chart({
                chart: {
                    type: 'spline',
                    renderTo: 'container2'
                },
                title: {
                    text: '孕妇血压'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: null
                    },
                    dateTimeLabelFormats: {
		                millisecond: '%m-%d',
						second: '%m-%d',
						minute: '%m-%d',
						hour: '%m-%d',
						day: '%m-%d',
						week: '%m-%d',
						month: '%m-%d',
						year: '%Y'
		            },
                    showFirstLabel: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: '血压(mmHg)'
                    }
                },
                tooltip: {
                	headerFormat: '<b>{series.name}</b><br>',
                	pointFormat: '{point.x:%m-%d}: {point.y:.1f} mmHg'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: '高压',
                    lineWidth: 1,
                    marker: { 
                        radius: 3
                    },
                    color: '#304577',
                    data: [
                    ]
                },{
                    name: '低压',
                    lineWidth: 1,
                    marker: { 
                        radius: 3
                    },
                    color: '#767676',
                    data: [
                    ]
                }, {
                    name: '高压上限',
                    lineWidth: 1,
                    marker: { 
                    	enabled: null,
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#FF0000',
                    data: [
                    ]
                } ,{
                    name: '高压下限',
                    lineWidth: 1,
                    marker: { 
                    	enabled: null,
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#4876FF',
                    data: [
                    ]
                }, {
                    name: '低压上限',
                    lineWidth: 1,
                    marker: { 
                    	enabled: null,
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#FF0000',
                    data: [
                    ]
                } ,{
                    name: '低压下限',
                    lineWidth: 1,
                    marker: { 
                    	enabled: null,
                        radius: 2
                    },
                    showInLegend: false,
                    color: '#4876FF',
                    data: [
                    ]
                }],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });
        });    
        var weight = [];
        var weightUpperLimit = [];
        var weightLowerLimit = [];
        function renderWeight(data) {
        	var jsonData = JSON.parse(data);
        	weight = [];
        	weightUpperLimit = [];
        	weightLowerLimit = [];
        	if (jsonData.dataSets) {
        		var dataSet = jsonData.dataSets.dataSet;
	            var highSet = jsonData.upperLimit.dataSet;
	            var lowSet = jsonData.lowerLimit.dataSet;

	        	for (var i = 0; i < dataSet.length; i++) {
	        		weight.push([
	                    Date.parse(dataSet[i].x) + 86400000,
	                    dataSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < highSet.length; i++) {
	        		weightUpperLimit.push([
	                    Date.parse(highSet[i].x) + 86400000,
	                    highSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < lowSet.length; i++) {
	        		weightLowerLimit.push([
	                    Date.parse(lowSet[i].x) + 86400000,
	                    lowSet[i].y
	                ]
	                );
	        	}
        	}
            
            if (chart.series.length == 1) {
            	chart.series[0].setData(weight, true);
            } else if (chart.series.length == 3) {
            	console.log(weight);
            	chart.series[0].setData(weight, false);
            	chart.series[1].setData(weightUpperLimit, false);
            	chart.series[2].setData(weightLowerLimit, false);
            	chart.redraw();
            }
        }

        var highData = [];
        var highUpperLimit = [];
        var highLowerLimit = [];
        var lowData = [];
        var lowUpperLimit = [];
        var lowLowerLimit = [];   
        function renderPressure(high, low) {
        	var highJson = JSON.parse(high);
        	var lowJson = JSON.parse(low);
            highData = [];
        	highUpperLimit = [];
        	highLowerLimit = [];
        	lowData = [];
        	lowUpperLimit = [];
        	lowLowerLimit = [];
        	if (highJson.dataSets && lowJson.dataSets) {
        		var highSet = highJson.dataSets.dataSet;
	            var lowSet = lowJson.dataSets.dataSet;
	            var highUpperSet = highJson.upperLimit.dataSet;
	            var lowUpperSet = lowJson.upperLimit.dataSet;
	            var highLowerSet = highJson.lowerLimit.dataSet;
	            var lowLowerSet = lowJson.lowerLimit.dataSet;

	        	for (var i = 0; i < highSet.length; i++) {
	        		highData.push([
	                    Date.parse(highSet[i].x) + 86400000,
	                    highSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < highUpperSet.length; i++) {
	        		highUpperLimit.push([
	                    Date.parse(highUpperSet[i].x) + 86400000,
	                    highUpperSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < lowUpperSet.length; i++) {
	        		lowUpperLimit.push([
	                    Date.parse(lowUpperSet[i].x) + 86400000,
	                    lowUpperSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < lowSet.length; i++) {
	        		lowData.push([
	                    Date.parse(lowSet[i].x) + 86400000,
	                    lowSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < highLowerSet; i++) {
	        		highLowerLimit.push([
	                    Date.parse(highLowerSet[i].x) + 86400000,
	                    highLowerSet[i].y
	                ]
	                );
	        	}
	        	for (var i = 0; i < lowLowerSet; i++) {
	        		lowLowerLimit.push([
	                    Date.parse(lowLowerSet[i].x) + 86400000,
	                    lowLowerSet[i].y
	                ]
	                );
	        	}
        	}
            
            if (chart2.series.length == 2) {
            	chart2.series[0].setData(highData);
            	chart2.series[1].setData(lowData);
            } else if (chart2.series.length == 6) {
            	console.log(lowUpperLimit);
            	chart2.series[0].setData(highData, false);
            	chart2.series[1].setData(lowData, false);
            	chart2.series[2].setData(highUpperLimit, false);
            	chart2.series[3].setData(highLowerLimit, false);
            	chart2.series[4].setData(lowUpperLimit, false);
            	chart2.series[5].setData(lowLowerLimit, false);
            	chart2.redraw();
            }
        }

        function formWeight(data) {
        	var time = new Date(data.x)
            weight.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formWeightUpper(data) {
        	var time = new Date(data.x)
            weightUpperLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formWeightLower(data) {
        	var time = new Date(data.x)
            weightLowerLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formHigh(data) {
        	var time = new Date(data.x)
            highData.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formLow(data) {
        	var time = new Date(data.x)
            lowData.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formHighUpper(data) {
        	var time = new Date(data.x)
            highUpperLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formLowUpper(data) {
        	var time = new Date(data.x)
            lowUpperLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formHighLower(data) {
        	var time = new Date(data.x)
            highLowerLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }

        function formLowLower(data) {
        	var time = new Date(data.x)
            lowLowerLimit.push([
                    Date.parse(time) + 86400000,
                    data.y
                ]
                );
        }
});