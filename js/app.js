var app =angular.module('ShangChengApp',['ui.router', 'ngCookies'])
var cookies;
var http;
var yearmonth;
    app.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
        .state("home",{
            url:"/",
            templateUrl:"pages/home.html",
            controller:"HomeController"
        });
    });
    
