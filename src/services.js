var angular = require("angular");
var xml2js = require("xml2js");

angular
.module('IPGui.services', [])
.factory('metadata', ['$q', function($q) {
	var metadata = {}
	function setFile(file) {
		metadata.file = file;
		console.log(metadata.file);
	}
	function fileName() {
		if('file' in metadata){
			return metadata.file.name;
		}else{
			return "";
		}
	}

	function load(){
		var d = $q.defer();
		// load xml file and convert to JSON format
		var reader = new FileReader();
		reader.onload = function(e){
			var parser = new xml2js.Parser();
			parser.parseString(e.target.result, function (err, result) {
				//console.log( JSON.stringify(result, null, 2));
				d.resolve(result.ip.view);
			});
		};
		reader.onerror = function(e){
			d.reject(e.target.result);
		};
		reader.readAsText(metadata.file);
		return d.promise;
	};


	return {
		setFile: setFile,
		fileName: fileName,
		load:   load
	}

}]);
