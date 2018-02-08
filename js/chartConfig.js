getLineChart = function(data, option, chartTitle) {
	var lineOption = {
		color: ['#ff9628', '#334b62'],
		toolbox: {
			show: true,
			feature: {}
		},
		tooltip: {
			trigger: 'axis',
			textStyle: {
				fontSize: 12,
				fontWeight: 'normal'
			},
			axisPointer: {
				type: 'cross'
			}
		},
		legend: {
			selectedMode: true,
			itemHeight: 16,
			itemWidth: 40,
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal',
				color: 'black'
			},
			icon: 'roundRect',
			data: data.legend
		},
		grid: {
			top: 70,
			bottom: 50,
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				onZero: false,
				lineStyle: {
					color: 'black'
				}
			},
			axisLabel: {
				textStyle: {
					fontSize: 12,
					fontWeight: 'normal',
					color: 'black'
				},
				show: true
				/*,
								interval: 0,
								rotate: 45*/
			},
			axisPointer: {
				show: true,
				snap: true,
				label: {
					show: true
				}
			},
			data: data.xAxis
		}],
		yAxis: [{
				type: 'value',
				axisLabel: {
					show: true
				}
			}
			/*,
						{
							type: 'value',
							axisLabel: {
								show: false
							}
						}*/
		],
		series: data.series.map(function(o, index) {
			return $.extend(o, {
				lineStyle: {
					normal: {
						width: 4
					}
				},
				//				yAxisIndex: index,
				type: 'line',
				smooth: true
			});
		}),
		animation: true
	}
	return $.extend(lineOption, option);
};

getBarChart = function(data, option, chartTitle) {
	var barOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		toolbox: {
			show: true,
			feature: {}
		},
		color: ['#ff982c', '#334960'],
		legend: {
			itemHeight: 20,
			itemWidth: 45,
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal',
				color: 'BLACK'
			},
			selectedMode: true,
			icon: 'roundRect',
			data: data.legend
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},

		xAxis: [{
			axisLabel: {
				textStyle: {
					fontSize: 14,
					fontWeight: 'normal',
					color: 'black'
				},
				show: true,
				interval: 0
			},
			type: 'category',
			data: data.xAxis
		}],
		yAxis: [{
			type: 'value'
		}],
		series: data.series.map(function(o) {
			return $.extend(o, {
				type: 'bar',
				barGap: '10%'
				//  		barWidth:20
			});
		}),
		animation: true
	};
	return $.extend(barOption, option);
}

getLineBarChart = function(data, option, scope) {
	var maxValue = null;
	if(typeof(scope.viewIndex) !== 'undefined') {
		maxValue = 100;
	}
	var lineBarOption = {
		color: ['#334960', '#ff982c'],
		tooltip: {
			trigger: 'axis'
			/*,
						formatter: '{a0}: {c0} %<br/>{a1}: {c1} %'*/
		},
		legend: {
			data: data.legend
		},
		xAxis: [{
			type: 'category',
			data: data.xAxis,
			axisPointer: {
				type: 'shadow'
			},
			axisLabel: {
				textStyle: {
					fontSize: 12,
					fontWeight: 'normal',
					color: 'black'
				},
				show: true,
				interval: 0,
				rotate: 45
			}
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max: null,
			axisLabel: {
				formatter: '{value} $'
			}
		}, {
			type: 'value',
			scale: true,
			position: 'right',
			axisLabel: {
				formatter: '{value} %'
			}
		}],
		grid: {
			x: 60,
			x2: 40
		},
		series: [{
				name: data.series[0].name,
				type: 'line',
				lineStyle: {
					normal: {
						width: 3
					}
				},
				smooth: false,
				data: data.series[0].data,
				label: {
					normal: {
						formatter: '{value} $'
					}
				}
			}, 
			{
				name: data.series[1].name,
				type: 'bar',
				barWidth: '10%',
				data: data.series[1].data,
				yAxisIndex: 1,
				label: {
					normal: {
						formatter: '{value} %'
					}
				}
			},

		],
		animation: true
	}
	return $.extend(lineBarOption, option);
}

/**
 * 多边形图表配置
 */
//var w = o.offsetWidth;                      //宽度
//var cardRatio = 40;                //此处填入要显示的百分比
//var amtPerCard = 199;  
getPolygonChart = function(data, option, chartTitle, width) {
	var w = width; //宽度
	var y = 360;
	var polygonOption = {
		tooltip: {
			show: false,
		},
		graphic: [{
				type: 'polygon',
				left: 'center',
				bounding: 'raw',
				z: 2,
				top: '64%', //上面圆环 和下边五边形的间距
				draggable: false,
				shape: {
					points: [
						[0, 0],
						[w / 2, 0],
						[w / 2, -y / 20],
						[w / 4, -y / 10],
						[0, -y / 20]
					]
				},
				style: {
					fill: '#4b5b6b', //五边形颜色
					baseline: 'bottom'
				}
			},
			{
				type: 'group',
				left: 'center',
				bounding: 'raw',
				z: 2,
				top: '71%', //五边形内字的位置，要比五边形的位置偏下一些
				children: [{
					type: 'text',
					left: 'center',
					top: 'center',
					z: 100,
					style: {
						fill: '#FFF', //五边形内字的颜色
						text: data.amtPerCard.toFixed(2), //五边形内字的内容
						font: '12px bold Microsoft YaHei' //五边形内字的大小和字体
					}
				}]
			},
			{
				type: 'group',
				left: 'center',
				bounding: 'raw',
				z: 2,
				bottom: '10%',
				children: [{
					type: 'text',
					left: 'center',
					top: 'center',
					z: 100,
					style: {
						fill: '#333',
						text: data.ind,
						font: '14px bold Microsoft YaHei'
					}
				}]
			}
		],
		series: [{
				type: 'pie',
				silent: true,
				radius: [w / 3.8, 3 * w / 8],
				center: ['50%', '40%'],
				selectedMode: 'single',
				clockwise: false,
				data: [{
						value: 100 - data.amtRatio * 100,
						name: '自由度高'
					},
					{
						value: data.amtRatio * 100,
						name: '自由度中'
					}
				],
				color: ['#4b5b6b', '#ff9628'], //显示圆环的百分比颜色
				itemStyle: {
					normal: {
						label: {
							show: false,
							formatter: '{b}%'
						},

						labelLine: {
							show: false
						}
					},
					// emphasis: {
					//     shadowBlur: 10,
					//     shadowOffsetX: 0,
					//     shadowColor: 'rgba(0, 0, 0, 0.5)'
					// }
				}
			},
			{
				type: 'pie',
				radius: [0, w / 6],
				center: ['50%', '40%'],
				selectedMode: 'false',
				hoveranimation: true,
				silent: true,
				data: [{
					value: 1
				}],
				label: {
					normal: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: 12,
							fontWeight: 'bold'
						}

					}
				},
				color: ['#ff9628'], //内圆颜色
			},
			{
				type: 'pie',
				radius: ['0%', '0%'],
				center: ['50%', '40%'],
				selectedMode: 'false',
				hoveranimation: true,
				silent: true,
				data: [{
					value: 1
				}],
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter: (data.amtRatio * 100).toFixed(1) + "%",
						textStyle: {
							fontSize: 12,
							fontWeight: 'bold',
							color: '#fff' //圆心字体颜色
						}
					}
				}
			}
		],
		animation: true
	};
	return $.extend(polygonOption, option);
}

getPiePercentageChart = function(scale, option) {
	var piePercentageOption = {
		tooltip: {
			show: false
		},
		series: [{
				type: 'pie',
				silent: true,
				radius: ['80%', '95%'],
				center: ['50%', '40%'],
				selectedMode: 'single',
				data: [{
					value: scale,
					name: '占比'
				}, {
					value: 1 - scale,
					name: '其他'
				}],
				color: ['#ff9628', '#334960'], //显示的圆环百分比颜色
				label: {
					normal: {
						show: false,
						position: 'center',
						formatter: function(params) {
							if(params.name != '其他') {
								return params.percent + '%';
							} else {
								return '';
							}
						},
						textStyle: {
							fontSize: 12,
							color: '#333' //圆心字体颜色
						}
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: false,
							formatter: '{d}%',

						},
						labelLine: {
							show: false
						}
					},
				}
			},
			{
				type: 'pie',
				silent: true,
				radius: ['0%', '0%'],
				center: ['50%', '40%'],
				selectedMode: 'single',
				data: [{
					value: scale,
					name: '占比'
				}],
				color: ['#6a7985', '#bbe2e8'], //显示的圆环百分比颜色
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter: function(params) {
							if(params.name != '其他') {
								return(params.value * 100).toFixed(1) + '%';
							} else {
								return '';
							}
						},
						textStyle: {
							fontSize: 14,
							fontWeight: 'bold',
							color: '#333' //圆心字体颜色
						}
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: false,
							formatter: '{d}%',

						},
						labelLine: {
							show: false
						}
					},
				}
			}
		],
		animation: true
	}
	return $.extend(piePercentageOption, option);
}

/**
 * 饼图
 * @param {Object} data 格式:[{value:v,name:n},...]
 */
getPieChart = function(data, option, radius, viewIndex) {
	radius = '70%';
	var itemData = data.map(function(o) {
		o.textStyle = {
			fontWeight: 'bold',
			color: 'black'
		};
		return o
	})
	if(typeof(viewIndex) == 'undefined') {
		radius = radius ? radius : '70%';
	}
	var pieChartOption = {
		color: ['#334960', '#f4c11a', '#acb8b8', '#4b5b6b', '#ff9628', '#bec2c5', '#477183', '#efc20d', '#678099', '#fdb263', '#7f8d8d', '#93a3bb'],
		tooltip: {
			trigger: 'item',
			formatter: "{b} <br> {c}%"
		},
		legend: {
			selectedMode: false,
			orient: 'vertical',
			left: 'right',
			itemHeight: 12,
			itemWidth: 30,
			textStyle: {
				fontSize: 12
			},
			data: itemData
		},
		grid: {
			containLabel: true
		},
		series: [{
			type: 'pie',
			radius: ['0%', radius],
			center: ['50%', '60%'],
			selectedMode: 'single',
			data: data,
			itemStyle: {
				normal: {
					label: {
						show: true,
						formatter: '{b} : {c}%',
					},
					labelLine: {
						show: true
					}
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}],
		animation: true
	};
	return $.extend(pieChartOption, option);
}

/**
 * 简单饼图
 * @param {Object} data 数值，取值<=1
 */
getSinglePieChart = function(data, option) {
	var pieChartOption = {
		tooltip: {
			trigger: 'item',
			formatter: "{b} : {d}%"
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true,
					name: '图片',
					title: '保存'
				}
			}
		},
		legend: {
			selectedMode: false,
			orient: 'vertical',
			left: 'left',
			itemHeight: 12,
			itemWidth: 30,
			textStyle: {
				fontSize: 12
			}
		},
		series: [{
			type: 'pie',
			radius: ['0%', '70%'],
			center: ['50%', '60%'],
			selectedMode: 'single',
			data: [{
				name: '占比',
				value: data
			}, {
				name: '其他',
				value: 1 - data
			}],
			itemStyle: {
				normal: {
					label: {
						show: true,
						position: 'inside',
						formatter: function(params) {
							if(params.name != '其他') {
								return params.percent;
							} else {
								return '';
							}
						}
					},
					labelLine: {
						show: false
					}
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}],
		animation: true
	};
	return $.extend(pieChartOption, option);
}