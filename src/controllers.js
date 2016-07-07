var angular = require("angular");

angular.module('IPGui.controllers', []).

/* Xmlload controller */
controller('xmlloader', ['$scope', 'metadata', function($scope, metadata) {
	$scope.selectfile = metadata.fileName();
	//console.log($scope.selectfile.name);
}]).

/* interface display controller */
controller('ipgui', ['$scope', 'metadata', function($scope, metadata) {

	$scope.views = [];
	$scope.active= {};
	$scope.userConfig = {};
	$scope.ports =[];
	$scope.inputcnt =0;
	$scope.outputcnt =0;

	var init = function(result)
	{
		$scope.views = result.gui[0].tab;
		$scope.settings = result.config[0].setting;
		$scope.active = $scope.views[0];
		$scope.ports = result.interface[0].port;
		$scope.configFile = result.$["name"]+".cfg"

		for(var i=0 ; i< $scope.ports.length; i++)
		console.log($scope.ports[i]);


		function findSetting(name){
			for( var i =0; i < $scope.settings.length; i++){
				if($scope.settings[i].$["id"] == name)
				return $scope.settings[i];
			}
			return undefined;
		}

		/*init userConfig*/

		for(var i=0; i<$scope.settings.length; i++){
			var setting = $scope.settings[i];
			if( "default" in setting.$ )
			if( setting.$["gui"] == "checkbox"){
				if(setting.$["default"] == "true")
				$scope.userConfig[setting.$["id"]] = true;
				else if(setting.$["default"] == "false")
					$scope.userConfig[setting.$["id"]] = false;
				}
				else
					$scope.userConfig[setting.$["id"]] =  setting.$["default"];
					else{
						if(setting.$["gui"] == "checkbox"){
							$scope.userConfig[setting.$["id"]] =  false;
						}
						else if(setting.$["gui"] == "dropbox" || setting.$["gui"] == "radius" || setting.$["gui"] == "radius-inline"){
							$scope.userConfig[setting.$["id"]] =  $scope.parseList(setting.$["values"])[0];
						}
					}
				}

				/* hook up gui and settings*/
				for( var i=0; i<$scope.views.length; i++){
					var view = $scope.views[i];
					for( var j=0; j<view.group.length; j++){
						var group_out = view.group[j];
						for( var n=0; n<group_out.group.length; n++){
							var group = group_out.group[n];
							for( var k=0; k<group.element.length; k++){
								var gui_elem = group.element[k];
								gui_elem["setting"] = findSetting(gui_elem.$["ref"]);

							}
						}
					}
				}

				console.log($scope.userConfig);

			};
			var debug = function(result){console.log(result);};

			//$scope.views = metadata.load().ip.view;
			metadata.load().then(init, function(result){console.log(result);});

			$scope.click = function (v){
				$scope.active = v;
			}
			$scope.parseList = function(str){
				return str.split(" ");
			}

			$scope.showMe = function(cntl){
				if( "show_id" in cntl.$){
					return $scope.userConfig[cntl.$["show_id"]].toString() == cntl.$["show_value"]
				}
				return true;
			}

			$scope.getRange = function(port, which){
				if( which in port.$){
					if( port.$[which] in $scope.userConfig)
					return $scope.userConfig[port.$[which]]
					else
						return port.$[which]
					}
					return "NA"
				}

				$scope.isActive = function(view){
					var ret = $scope.active.$["name"] == view.$["name"];
					return ret;
				}

				$scope.disableMe = function(cntl){
					var ret =false;
					if( "disable_id" in cntl.$){
						ret = $scope.userConfig[cntl.$["disable_id"]].toString() == cntl.$["disable_value"]
					}
					return ret;
				}

				$scope.saveConfig = function () {
					$scope.toJSON = '';
					$scope.toJSON = JSON.stringify($scope.userConfig, 0, 2);
					var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });
					var downloadLink = angular.element('<a></a>');
					downloadLink.attr('href',window.URL.createObjectURL(blob));
					downloadLink.attr('download', $scope.configFile);
					downloadLink[0].click();
				};

				$scope.refreshpage = function (id){
					//$scope.$apply();
					//$scope.userConfig[id] = true;
					console.log($scope.userConfig);

				}

			}]);
