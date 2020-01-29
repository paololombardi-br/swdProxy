myApp.directive('diceFace', function() {
    return {
      restrict: 'E',
      scope: {
        card: '=',
        faceNum: '='
      },
      controller: controller,
      templateUrl: 'Dice.html'
    };
  });

var controller = ['$scope','$element', function ($scope,$element) {

    function init() {
        if (!$scope.options || $scope.options == {})
            $scope.options = {}

        if (!$scope.card.size) $scope.card.size = 100;
        if (!$scope.card.offsetx) $scope.card.offsetx= -23;
        if (!$scope.card.offsety) $scope.card.offsety= -15;
        $element.bind('DOMMouseScroll mousewheel onmousewheel', function(event){
            // cross-browser wheel delta
            var event = window.event || event; // old IE support
            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    
            if(delta > 0) $scope.card.size ++;
            else $scope.card.size --;
            $scope.$apply();
            // for IE
            event.returnValue = false;
            // for Chrome and Firefox
            if(event.preventDefault) {
               event.preventDefault();                        
            }
    
            
          })
       // $element.bind('onmousemove',function (event){console.log(event)})
    }

    init();

    $scope.move = (event)=>{
        if ($scope.isClicked)
        {
            $scope.card.offsetx= $scope.card.offsetx + event.movementX;
            $scope.card.offsety= $scope.card.offsety + event.movementY;
        }
    }


}]