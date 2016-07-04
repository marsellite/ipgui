var angular = require("angular");
angular
  .module('IPGui.directives', [])
  /* angular js do not support file select change binding, need to add this directive.
   * What this directive does is to bind selected file to ng-model for any file select change*/
  .directive('bindNgModelOnChange', ['metadata', function(metadata) {
    return {   
    		require: 'ngModel',     
        restrict: 'A',
        link: function($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                           
                metadata.setFile(event.target.files[0]);
                ngModel.$setViewValue(metadata.fileName());
                $scope.$apply();
            });
        }
    };
}]);



