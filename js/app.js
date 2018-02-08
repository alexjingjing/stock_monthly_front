var app =angular.module('StockApp',['ui.router', 'ngCookies'])
var cookies;
var http;
var yearmonth;
    app.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
        .state("home",{
            url:"/",
            templateUrl:"pages/home.html",
            controller:"HomeController"
        })
        .state("stock",{
            url:"/stock",
            templateUrl:"pages/stock.html",
            controller:"StockController"
        });
        $urlRouterProvider.otherwise("/");
    });
    
