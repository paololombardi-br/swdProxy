var myApp = angular.module('swdProxy', ['ngMaterial']);

myApp.controller('ProxyPageController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

  $scope.loadCardsWithDice = () => {
    if (!$scope.cardsWithDice) {
      if ($window.localStorage['CardsDb']) {
        $scope.cards = JSON.parse($window.localStorage['CardsDb']);
        $scope.cardsWithDice = $scope.cards ? $scope.cards.filter(x => x.has_die) : [];
      }
      return $http.get('https://swdestinydb.com/api/public/cards/', {}).then(
        cards => {
          $window.localStorage['CardsDb'] = JSON.stringify(cards.data);
          $scope.cards = $window.localStorage['CardsDb'];
          $scope.cardsWithDice = cards.data.filter(x => x.has_die);
          console.log('Loaded..')
        },
        () => { return [] });
    }
    else return;
  }
  $scope.loadCardsWithDice();
  $scope.printList = [];
  $scope.printInfo = {paper:"A4"};

  $scope.searchTextChange = (text) => {
    //console.log('Text changed to ' + text);
  }

  $scope.cardSelected = (card) => {
    if (card && card.sides) {
      var regexp = /([+X\d]*)(RD|MD|-|Dr|F|R|Sp|ID|Sh|Dc)?(\d*)/;
      card.sidesMap = card.sides.map(x => {
        var res = regexp.exec(x);
        return {
          quantifier: res[1],
          symbol:
            res[2] == 'RD' ? 'ranged' :
              res[2] == 'MD' ? 'melee' :
                res[2] == '-' ? 'blank' :
                  res[2] == 'Dr' ? 'disrupt' :
                    res[2] == 'F' ? 'focus' :
                      res[2] == 'R' ? 'resource' :
                        res[2] == 'Sp' ? 'special' :
                          res[2] == 'ID' ? 'indirect' :
                            res[2] == 'Sh' ? 'shield' :
                              res[2] == 'Dc' ? 'discard' :
                                res[2] == '' ? '' : "unknown",
          cost: res[3]
        }
      })
    }
    $scope.selectedCard = card;
  }

  $scope.querySearch = (query) => {
    if ($scope.cardsWithDice)
      return $scope.cardsWithDice.filter(x => x.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    else
      return []
  }
  $scope.print = function () {
    $scope.printItems = [];
    if ($scope.printInfo.paper == "A4251") {
      var i;
      for (i = 0; i < $scope.printInfo.emptyLabels; i++) {
        $scope.printItems.push({});
        $scope.printItems.push({});
      }
    }
    $scope.printList.forEach(x => {
      $scope.printItems.push({ card: x, faceNum: 0 });
      $scope.printItems.push({ card: x, faceNum: 1 });
      $scope.printItems.push({ card: x, faceNum: 2 });
      $scope.printItems.push({ card: x, faceNum: 3 });
      $scope.printItems.push({ card: x, faceNum: 4 });
      $scope.printItems.push({ card: x, faceNum: 5 });
    })
    setTimeout(()=>{window.print()},500);
  }
}]);