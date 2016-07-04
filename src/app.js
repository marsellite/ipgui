var angular = require("angular");
var route = require("angular-route");
'use strict';

// Declare app level module which depends on views, and components
angular.module('IPGui', [
  'ngRoute',
  'IPGui.controllers'
  ,'IPGui.directives'
  ,'IPGui.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "templates/xmlloader.html", controller: "xmlloader"}).
	when("/interface", {templateUrl: "templates/interface.html", controller: "ipgui"}).
	otherwise({redirectTo: '/'});
}]);

require("./directives");
require("./services");
require("./controllers");
