var app =angular.module('starter', ['ngRoute', 'angular-carousel']);

app.config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/landing.html',
    controller: 'LandingCtrl'
  })
  .when('/questions/:qid', {
    templateUrl: 'views/question.html',
    controller: 'QuestionsCtrl'
  })
  .when('/result', {
    templateUrl: 'views/result.html',
    controller: 'ResultCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

app.controller('LandingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.answers=[];
}]);
app.controller('QuestionsCtrl', ['$rootScope', '$scope', '$route', function($rootScope, $scope, $route) {
  if($rootScope.answers == undefined){
    window.location='#/landing'
  }

//    alert($rootScope.answers);
  $scope.fullQuizMulti = {
    'title': 'SKIN DIAGNOSTIC TOOL',
    'subtitle': 'Find out which product best suits your skin',
    'introText': '',
    'questions': [
      {
        'title': 'What are your skin concerns?',
        'subtitle': '',
        'type': 'multi',
        'question': '',
        'options': [
            {'id':1,'name': 'Dry lines, dry & rough skin'},
            {'id':2,'name': 'Dark spots & patchy skin'},
            {'id':3,'name': 'Dullness & tired looking skin'},
            {'id':4,'name': 'Dine lines, wrinkles & sagging skin'},
            {'id':5,'name': 'Blackheads & clogged pores'}
        ],
        'answer': '',
        'explanation': 'Mies van der Rohe, on the benefits of minimalism.'
      },
      {
        'title': 'Do you have blemishes and uneven skin tone? How much does it concern to you?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':6,'name': 'A lot & I am very concerned about it'},
            {'id':7,'name': 'A little & I am a little concerned about it'},
            {'id':8,'name': 'A little & I am not concerned at all'}
        ],
        'answer': '',
        'explanation': 'Robert Venturi, reacting to minimalism. He is shown here with his wife, Denise Scott Brown.'
      },
      {
        'title': 'What type of product assortments do you use?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':9,'name': 'Easy Breezy'},
            {'id':10,'name': 'Sophisticates'}
        ],
        'answer': '',
        'explanation': 'Mies van der Rohe, on the need for refined design.'
      },
      {
        'title': 'What is your skin type ?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':11,'name': 'Dry / Dry Combination'},
            {'id':12,'name': 'Normal'},
            {'id':13,'name': 'Oily / Oily Combination'}
        ],
        'answer': '',
        'explanation': 'Thomas Jefferson, who built and rebuilt his home at Monticello for 40 years.'
      },
      {
        'title': 'What is your age?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':14,'name': '20 & below'},
            {'id':15,'name': '21 - 30'},
            {'id':16,'name': '31 - 40'},
            {'id':17,'name': '41 - 50'},
            {'id':18,'name': '51 - 60'},
            {'id':19,'name': '61 & above'}
        ],
        'answer': '',
        'explanation': 'Louis Sullivan, on the Wainwright Building design.'
      },
      {
        'title': 'Do you use makeup regularly?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':20,'name': 'Yes'},
            {'id':21,'name': 'No'}
        ],
        'answer': '',
        'explanation': 'Frank Lloyd Wright, reacting to Victor Gruen’s suburban shopping centers.'
      },
      {
        'title': 'Do you sleep in an air-conditioned room?',
        'subtitle': '',
        'type': 'single',
        'question': '',
        'options': [
            {'id':22,'name': 'Yes'},
            {'id':23,'name': 'No'}
        ],
        'answer': '',
        'explanation': 'Frank Lloyd Wright, reacting to Victor Gruen’s suburban shopping centers.'
      }
    ]
  };
  $scope.getResults=false;
  $scope.pro_option=[];
  $scope.curQues = $scope.fullQuizMulti.questions[$route.current.params.qid];
  if($scope.curQues.type == 'multi'){
    $scope.inType = 'checkbox';
  } else {
    $scope.inType = 'radio';
    $scope.inName = 'single';
  }
  $scope.next = parseInt($route.current.params.qid)+1;
  $scope.prev = parseInt($route.current.params.qid)-1;
  $scope.purl = 'questions/'+$scope.prev;
  $scope.nurl = 'questions/'+$scope.next;
  if($scope.next>6){
    $scope.nurl = 'result';
  }
  if($scope.prev<0){
    $scope.purl = '/';
  }

  $scope.answered = function(opt){
      if($scope.curQues.type=='multi'){
        if(opt.checked){
          $rootScope.answers.push(opt.id);
          $rootScope.answers = _.sortBy($rootScope.answers, function(num) {
            return num;
          });
          $rootScope.answers = _.uniq($rootScope.answers);
        }else{
          $rootScope.answers = _.without($rootScope.answers, opt.id);
        } 
      }else{
        if(opt.checked){
          angular.forEach($scope.curQues.options,function(value){
            if($rootScope.answers.indexOf(value.id)!=-1){
              $rootScope.answers.splice($rootScope.answers.indexOf(value.id),1)
              value.checked=false;
            }
          })
          $rootScope.answers.push(opt.id);
          $rootScope.answers = _.sortBy($rootScope.answers, function(num) {
            return num;
          });
          if($scope.next>6){
            $scope.getResults=true;
          }
        }else{
          $rootScope.answers = _.without($rootScope.answers, opt.id);
          $scope.getResults=false;
        }
      }
      if(opt.checked){
        $scope.isError=false;
      }
    console.log($rootScope.answers);
  }
  $scope.radioAnswered = function(opt){
    var index = $rootScope.answers.indexOf(opt.id);
    if (index > -1) {
      $rootScope.answers.splice(index, 1);
    }
    $rootScope.answers.push(opt.id);
    $rootScope.answers = _.sortBy($rootScope.answers, function(num) {
      return num;
    });
    $rootScope.answers = _.uniq($rootScope.answers);
    console.log($rootScope.answers);
  }
  $scope.goNext=function($event){
      $event.preventDefault();
      angular.forEach($scope.curQues.options,function(value){
          if($rootScope.answers.indexOf(value.id)!=-1)    
              window.location='#'+$scope.nurl;
      });
      $scope.isError=true;
  }
  $scope.goPrev=function($event){
      window.location='#'+$scope.purl;
  }

  var ans=$rootScope.answers;
  angular.forEach($scope.curQues.options,function(value){
    //alert(JSON.stringify(value))
    if(ans.indexOf(value.id)>=0){
      value.checked=true;
    }else value.checked=false;
  })


}]);

app.controller('ResultCtrl', ['$scope','$rootScope', function($scope,$rootScope){
    if($rootScope.answers == undefined){
      window.location='#/landing'
    }
    $scope.dayProducts=[];
    $scope.nightProducts=[];
    $scope.dayProducts2=[];
    $scope.nightProducts2=[];
    $scope.compareList=[];
    $scope.proFilter=[
      {
          productId:0,
          options:[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:1,
          options:[1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:2,
          options:[1,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:3,
          options:[1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:4,
          options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:5,
          options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:6,
          options:[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:7,
          options:[1,2,3,4,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:8,
          options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:9,
          options:[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId:10,
          options:[1,3,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 11,
          options:[1,3,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 12,
          options: [1,3,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 13,
          options: [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 14,
          options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 15,
          options: [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 16,
          options: [1,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 17,
          options: [1,2,3,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 18,
          options: [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 19,
          options: [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 20,
          options: [1,3,5,6,7,8,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 21,
          options: [1,3,5,6,7,8,10,11,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 22,
          options: [1,3,5,6,7,8,10,12,14,15,16,20,21,22,23]
      },
      {
          productId: 23,
          options: [1,3,5,6,7,8,10,12,17,18,19,20,21,22,23]
      },
      {
          productId: 24,
          options: [1,3,5,6,7,8,10,12,13,14,15,16,20,21,22,23]
      },
      {
          productId: 25,
          options: [1,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 26,
          options: [1,2,3,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 27,
          options: [1,2,3,5,6,7,8,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 28,
          options: [1,2,3,5,6,7,8,10,11,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 29,
          options: [1,2,3,5,6,7,8,10,12,17,18,19,20,21,22,23]
      },
      {
          productId: 30,
          options: [1,2,3,5,6,7,8,10,12,14,15,16,20,21,22,23]
      },
      {
          productId: 31,
          options: [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 32,
          options: [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 33,
          options: [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 34,
          options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 35,
          options: [1,2,3,4,5,8,10,11,12,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 36,
          options: [1,2,3,4,5,8,10,13,14,15,16,17,18,19,20,21,22,23]
      },
      {
          productId: 37,
          options: [1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
    ];
    $scope.products=[
      {"productId":"0","name":"SHA Make-up Remover Gel", "category":"Makeup Remover", "description":"Light-watery gel texture that is 100% water-formula and oil-free. Removes Lip, Eye and Face makeup, even stubborn waterproof makeup.", "day": 0,"night": 1, "img":"img/products/sha-makeup-remover.jpg"},
      {"productId":"1","name":"SHA Cleansing Oil", "category":"Makeup Remover", "description":"Superior and Exceptionally Pure Olive Oil, surprisingly light texture. Removes Lip, Eye and Face makeup, even waterproof and sparkly makeup. 100% removable with water easily.", "day": 0,"night": 1, "img":"img/products/sha-cleansing-oil.jpg"},
    
      {"productId":"2","name":"Super HA Hydrating Cleanser & Super HA Hydrating Foam Wash", "category":"Facial Cleanser", "description":"Effectively removes impurities, dirt, oil and dead skin cell, while retaining essential moisture. Skin feels moist, fresh and silky smooth.", "day": 1,"night": 1, "img":"img/products/sha-foam-wash.jpg"},
      {"productId":"3","name":"Arbutin Whitening Face Wash", "category":"Facial Cleanser", "description":"Effectively cleanses impurities, dirt and oil for clearer and brighter complexion.", "day": 1,"night": 1, "img":"img/products/arbutin-face-wash.jpg"},
      {"productId":"4","name":"AHA + BHA Foam Wash & AHA + BHA Exfoliating Wash", "category":"Facial Cleanser", "description":"Natural fruit acids that evenly dissolve dullness, dirt and light makeup gently, unveiling egg-smooth new born skin. Dissolves blackheads & while heads, dead skin cells and dirt built up.", "day": 1,"night": 1, "img":"img/products/ahabha-foam-wash.jpg"},
      {"productId":"5","name":"AHA + BHA Oil Control Face Wash", "category":"Facial Cleanser", "description":"Natural fruit acids that evenly dissolve dullness, dirt and light makeup gently, unveiling egg-smooth new born skin. Dissolves blackheads & while heads, dead skin cells and dirt built up. Effectively controls skin oiliness and tightens pores.", "day": 1,"night": 1, "img":"img/products/ahabha-oilcontrol-acnecare.jpg"},
    
      {"productId":"6","name":"Super HA Hydrating Lotion & Refill Pack", "category":"Lotion", "description":"Intensively hydrates deep inside skin with Proprietry 4 interlocked Hyaluronic Acids. When skin is hydrated, skincare benefits multiply. Skin feels moist, refined and dewy radiant, with smooth bounciness.", "day": 1,"night": 0, "img":"img/products/sha-hydrating-lotion.jpg"},
      {"productId":"7","name":"Super HA Hydrating Lotion Light", "category":"Lotion", "description":"Intensively hydrates deep inside skin with light-as-water texture. When skin is hydrated, skincare benefits multiply. Skin feels fresh, refined and dewy radiant, with smooth bounciness.", "day": 1,"night": 0, "img":"img/products/sha-hydrating-lotion-light.jpg"},
      {"productId":"8","name":"Arbutin Whitening Lotion & Refill Pack", "category":"Lotion", "description":"Illuminate skin with abundant moisture and natural bearberry extract, Arbutin that brightens skin tone. Suitable for restoring complexion clarity and preventing dull, tired skin and uneven skin tone.", "day": 1,"night": 0, "img":"img/products/arbutin-whitening-lotion.jpg"},
      {"productId":"9","name":"Retinol Anti-Aging + 3D Lifting Lotion", "category":"Lotion", "description":"High concentration of age-fighting ingredients target the heart of all aging signs though Multiple Target Repair Technology. Diminishes fine lines and wrinkles, lifts contour and improves elasticity, brightens and hydrates skin.", "day": 1,"night": 0, "img":"img/products/retinol-antiageing-3Dlifting.jpg"},
      {"productId":"10","name":"AHA + BHA Mild Peeling Toner", "category":"Lotion", "description":"Gently softens skin, polishes away dullness and preventing clogged pores. Moisturises skin for a natural radant and beautifully matte skin.", "day": 1,"night": 0, "img":"img/products/ahabha-mild-peeling-lotion.jpg"},
      {"productId":"11","name":"Super HA Hydrating Lotion & Refill Pack", "category":"Lotion", "description":"Intensively hydrates deep inside skin with Proprietry 4 interlocked Hyaluronic Acids. When skin is hydrated, skincare benefits multiply. Skin feels moist, refined and dewy radiant, with smooth bounciness.", "day": 0,"night": 1, "img":"img/products/sha-hydrating-lotion.jpg"},
      {"productId":"12","name":"Super HA Hydrating Lotion Light", "category":"Lotion", "description":"Intensively hydrates deep inside skin with light-as-water texture. When skin is hydrated, skincare benefits multiply. Skin feels fresh, refined and dewy radiant, with smooth bounciness.", "day": 0,"night": 1, "img":"img/products/sha-hydrating-lotion-light.jpg"},
      {"productId":"13","name":"Arbutin Whitening Lotion & Refill Pack", "category":"Lotion", "description":"Illuminate skin with abundant moisture and natural bearberry extract, Arbutin that brightens skin tone. Suitable for restoring complexion clarity and preventing dull, tired skin and uneven skin tone.", "day": 0,"night": 1, "img":"img/products/arbutin-whitening-lotion.jpg"},
      {"productId":"14","name":"Retinol Anti-Aging + 3D Lifting Lotion", "category":"Lotion", "description":"High concentration of age-fighting ingredients target the heart of all aging signs though Multiple Target Repair Technology. Diminishes fine lines and wrinkles, lifts contour and improves elasticity, brightens and hydrates skin.", "day": 0,"night": 1, "img":"img/products/retinol-antiageing-3Dlifting.jpg"},
    
      {"productId":"15","name":"Super HA Hydrating Essence", "category":"Essence", "description":"Light weight, concentrated hydrating essence treatment penetrates instantly deep into skin, leaving skin plumped, bouncy, soft and smooth with healthy radiance. Replenishes, stores water in deep layers of skin, rejuvenating skin's natural protection barrier.", "day": 1,"night": 0, "img":"img/products/sha-essence.jpg"},
      {"productId":"16","name":"Super HA Hydrating Essence", "category":"Essence", "description":"Light weight, concentrated hydrating essence treatment penetrates instantly deep into skin, leaving skin plumped, bouncy, soft and smooth with healthy radiance. Replenishes, stores water in deep layers of skin, rejuvenating skin's natural protection barrier.", "day": 0,"night": 1, "img":"img/products/sha-essence.jpg"},
      {"productId":"17","name":"Arbutin Whitening Essence", "category":"Essence", "description":"Reduces & fights dark spots and uneven skin tone by breaking down dark spots clusters in skin. Surges skin hydration to repair moisture barrier and inner dehydration.", "day": 1,"night": 0, "img":"img/products/arbutin-essence.jpg"},
      {"productId":"18","name":"Arbutin Whitening Essence", "category":"Essence", "description":"Reduces & fights dark spots and uneven skin tone by breaking down dark spots clusters in skin. Surges skin hydration to repair moisture barrier and inner dehydration.", "day": 0,"night": 1, "img":"img/products/arbutin-essence.jpg"},
    
      {"productId":"19","name":"UV Perfect Gel Moisturiser SPF50 PA++++", "category":"UV Care Moisturiser", "description":"Power of 3 product efficacies of essence, moisturiser and mask with high UV protection, all in one moisturiser. Deeply hydrates, treats and reenergize skin during the day, with long hour protection from harmful UV rays.", "day": 1,"night": 0, "img":"img/products/sha-uv-pg.jpg"},
    
      {"productId":"20","name":"Super HA Hydrating Moisturizing Milk", "category":"Moisturiser", "description":"Light-weight easily-absorbed moisturiser perfect for oily prone skin. Deeply infuse skin with essential nourishment and provides long-lasting hydration, leaving skin soft, smooth and well-hydrated.", "day": 1,"night": 0, "img":"img/products/sha-hydrating-milk.jpg"},
      {"productId":"21","name":"Super HA Hydrating Cream", "category":"Moisturiser", "description":"Skin-protecting moisturiser that hydrates, nourishes and helps restore skin barrier, leaving skin soft, smooth and resilient. Non-greasy cream that calms and soothes dryness prone skin.", "day": 1,"night": 0, "img":"img/products/sha-cream.jpg"},
      {"productId":"22","name":"Super HA Hydrating Moisturizing Milk", "category":"Moisturiser", "description":"Light-weight easily-absorbed moisturiser deeply infuse skin with essential nourishment and provides long-lasting hydration. Skin feels soft, smooth and well-hydrated.", "day": 1,"night": 0, "img":"img/products/sha-hydrating-milk.jpg"},
      {"productId":"23","name":"Super HA Hydrating Cream", "category":"Moisturiser", "description":"Skin-protecting moisturiser that hydrates, nourishes and helps restore skin barrier, leaving skin soft, smooth and resilient. Non-greasy cream that calms and soothes dryness prone skin.", "day": 1,"night": 0, "img":"img/products/sha-cream.jpg"},
      {"productId":"24","name":"Super HA Hydrating Water Gel", "category":"Moisturiser", "description":"Ultralight watery gel texture contains 4 interlocked Hyaluronic Acids (HA) that locks, replenishes and stores moisture in skin, layer-after-layer. Essential nutrients Vitamin B3, Aloe Vera & other moisturising botanical extracts allows deeper penetration, so skin is nourished with breathable comfort. Enriched with Ceramide that forms a moisture protecting shield.", "day": 1,"night": 0, "img":"img/products/sha-watergel.jpg"},
      {"productId":"25","name":"Super HA Hydrating Perfect Gel", "category":"Moisturiser", "description":"Best-selling moisturiser combined the power of 3 product efficacies of essence, moisturiser and mask in one product. Infused with Proprietary Hyaluronic Acids, Collagen and Ceramide that nourishes, repairs and rejuvenates skin with healthy radiance and lasting moist and soft skin.", "day": 0,"night": 1, "img":"img/products/sha-hydrating-perfect-gel.jpg"},
      {"productId":"26","name":"Arbutin Whitening Perfect Gel", "category":"Moisturiser", "description":"Power of 3 product efficacies of essence, moisturiser and mask in once product. Infused with Arbutin, a natural bearberry extract and Vitamin C that reduce dark spots clusters to brighten dull, tired skin.", "day": 1,"night": 0, "img":"img/products/arbutin-perfect-gel.jpg"},
      {"productId":"27","name":"Arbutin Whitening Milk", "category":"Moisturiser", "description":"Light-textured moisturiser providing long-lasting hydration and radiance clarity. Natural Arbutin and Vitamin C help fight and reduce dark spots, while brighten dull and tired skin, revealing skin clarity.", "day": 1,"night": 0, "img":"img/products/arbutin-whitening-milk.jpg"},
      {"productId":"28","name":"Arbutin Whitening Cream", "category":"Moisturiser", "description":"Light & non-greasy moisturiser providing long-lasting hydration and radiance clarity. Natural Arbutin and Vitamin C help fight and reduce dark spots, while brighten dull and tired skin, revealing skin clarity.", "day": 1,"night": 0, "img":"img/products/arbutin-cream.jpg"},
      {"productId":"29","name":"Arbutin Whitening Milk", "category":"Moisturiser", "description":"Light-textured moisturiser providing long-lasting hydration and radiance clarity. Natural Arbutin and Vitamin C help fight and reduce dark spots, while brighten dull and tired skin, revealing skin clarity.", "day": 1,"night": 0, "img":"img/products/arbutin-whitening-milk.jpg"},
      {"productId":"30","name":"Arbutin Whitening Cream", "category":"Moisturiser", "description":"Light & non-greasy moisturiser providing long-lasting hydration and radiance clarity. Natural Arbutin and Vitamin C help fight and reduce dark spots, while brighten dull and tired skin, revealing skin clarity.", "day": 1,"night": 0, "img":"img/products/arbutin-cream.jpg"},
      {"productId":"31","name":"Arbutin Whitening Perfect Gel", "category":"Moisturiser", "description":"Get the power of 3 product efficacies of essence, moisturiser and mask in once product. Infused with Arbutin, a natural bearberry extract and Vitamin C that reduce dark spots clusters to brighten dull, tired skin.", "day": 0,"night": 1, "img":"img/products/arbutin-perfect-gel.jpg"},
      {"productId":"32","name":"Retinol Anti-Aging + 3D Lifting Gel", "category":"Moisturiser", "description":"Power of 3 product efficacies of essence, moisturiser and mask in once product. Proprietary 3D HA provides ultimate lasting moisture. Reduces lines and wrinkles, refined pores, lightens dark spots with improved radiance and clarity of skin.", "day": 1,"night": 0, "img":"img/products/retinol-perfect-gel.jpg"},
      {"productId":"33","name":"Retinol Anti-Aging 3D Lifting Milk", "category":"Moisturiser", "description":"Light-weight fast-absorbing moisturiser that deeply nourishes skin. Proprietary 3D HA provides ultimate lasting moisture. Reduces lines and wrinkles, refined pores, lightens dark spots with improved radiance and clarity of skin.", "day": 1,"night": 0, "img":"img/products/retinol-milk.jpg"},
      {"productId":"34","name":"Retinol Anti-Aging + 3D Lifting Gel", "category":"Moisturiser", "description":"Power of 3 product efficacies of essence, moisturiser and mask in once product. Proprietary 3D HA provides ultimate lasting moisture. Reduces lines and wrinkles, refined pores, lightens dark spots with improved radiance and clarity of skin.", "day": 0,"night": 1, "img":"img/products/retinol-perfect-gel.jpg"},
    
      {"productId":"35","name":"Air Aqua UV Fresh (Hydrating) SPF50 PA+++", "category":"Sunscreen", "description":"Air-light moisturiser with SPF 50 PA+++ with 3 benefits of Hydration, Whitening & Anti-aging. Superior photostable UV filters that provides durable, safe and long-lasting protection. For skin that needs hydration boost.", "day": 1,"night": 0, "img":"img/products/air-aqua-uv-moist.jpg"},
      {"productId":"36","name":"Air Aqua UV Fresh (Oil Control) SPF50 PA+++", "category":"Sunscreen", "description":"Air-light moisturiser with SPF 50 PA+++ with 3 benefits of Hydration, Whitening & Anti-aging. Superior photostable UV filters that provides durable, safe and long-lasting protection. Keeps skin matte and fresh longer.", "day": 1,"night": 0, "img":"img/products/air-aqua-uv-fresh.jpg"},
      {"productId":"37","name":"Air BB (Natural and Ivory Beige)  SPF50 PA+++", "category":"Sunscreen", "description":"Brightens, hydrates, firm and protects skin while giving skin a flawless natural veil. Skin feels matte and pores refined.", "day": 1,"night": 0, "img":"img/products/air-bb-natural-beige.jpg"},
    ];
    $scope.emptyProduct=[
      {"productId":"0","name":" ", "category":"no product", "description":" ", "day": 1,"night": 1, "img":" "},
    ];
    $scope.disPro={};
    $scope.overLay=false;
    $scope.dayCarousel=false;
    $scope.nightCarousel=false;
    // angular.forEach($rootScope.answers,function(value){
    //     angular.forEach($scope.proFilter,function(filter){
    //         if(filter.options.indexOf(value)!=-1){
    //             var pro=$scope.products[filter.productId];
    //             if(pro.day==1){
    //                   $scope.dayProducts.push(pro);
    //             }else if(pro.night==1){
    //                 $scope.nightProducts.push(pro);
    //             }
    //         }
    //     })
    // })

    angular.forEach($scope.proFilter,function(filter){
      //console.log(filter.options);
      var a=$rootScope.answers;
      var b=filter.options;
      function contains(a, b) {
        if(a.length < b.length) {
          var temp = a;
          a = b;
          b = temp;
        }
        a = a.slice(); // copy array
        return b.every(function(elm) {
          var index = a.indexOf(elm);
          if(index !== -1) {
              a.splice(index, 1); // remove found element
              return true;
          }
          return false;
        });
      }
      if(contains(a,b)){
         var pro=$scope.products[filter.productId];
         $scope.compareList.push(pro);
      }
    });
    //console.log($scope.compareList);

    var d1=0, d2=0, d3=0, d4=0, d5=0, d6=0, d7=0;
    var n1=0, n2=0, n3=0, n4=0, n5=0, n6=0, n7=0;

    $scope.dayCategory1=[];
    $scope.dayCategory2=[];
    $scope.dayCategory3=[];
    $scope.dayCategory4=[];
    $scope.dayCategory5=[];
    $scope.dayCategory6=[];
    $scope.dayCategory7=[];
    $scope.nightCategory1=[];
    $scope.nightCategory2=[];
    $scope.nightCategory3=[];
    $scope.nightCategory4=[];
    $scope.nightCategory5=[];
    $scope.nightCategory6=[];
    $scope.nightCategory7=[];
    
    angular.forEach($scope.compareList,function(filter){
      if((filter.category=='Makeup Remover')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory1.push(pro);
      }
      else if((filter.category=='Facial Cleanser')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory2.push(pro);
      }
      else if((filter.category=='Lotion')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory3.push(pro);
      }
      else if((filter.category=='Essence')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory4.push(pro);
      }
      else if((filter.category=='UV Care Moisturiser')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory5.push(pro);
      }
      else if((filter.category=='Moisturiser')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory6.push(pro);
      }
      else if((filter.category=='Sunscreen')&&(filter.day=='1')){
        var pro=$scope.products[filter.productId];
        $scope.dayCategory7.push(pro);
      }
    });

    
    angular.forEach($scope.compareList,function(filter){
      if((filter.category=='Makeup Remover')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory1.push(pro);
      }
      else if((filter.category=='Facial Cleanser')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory2.push(pro);
      }
      else if((filter.category=='Lotion')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory3.push(pro);
      }
      else if((filter.category=='Essence')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory4.push(pro);
      }
      else if((filter.category=='UV Care Moisturiser')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory5.push(pro);
      }
      else if((filter.category=='Moisturiser')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory6.push(pro);
      }
      else if((filter.category=='Sunscreen')&&(filter.night=='1')){
        var pro=$scope.products[filter.productId];
        $scope.nightCategory7.push(pro);
      }
    });

  

    if($scope.dayCategory2.length > 0){
      angular.forEach($scope.dayCategory2,function(filter){
        if(d2==0&&(filter.category=='Facial Cleanser')){
          var pro=$scope.products[filter.productId];
          $scope.dayProducts.push(pro);
          $scope.dayProducts2.push(pro);
          d2++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.dayProducts.push(pro);
      $scope.dayProducts[0].noProduct='No product suggested';
    }
    if($scope.dayCategory3.length > 0){
      angular.forEach($scope.dayCategory3,function(filter){
        if(d3==0&&(filter.category=='Lotion')){
          var pro=$scope.products[filter.productId];
          $scope.dayProducts.push(pro);
          $scope.dayProducts2.push(pro);
          d3++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.dayProducts.push(pro);
      $scope.dayProducts[1].noProduct='No product suggested';
    }
    if($scope.dayCategory4.length > 0){
      angular.forEach($scope.dayCategory4,function(filter){
        if(d4==0&&(filter.category=='Essence')){
          var pro=$scope.products[filter.productId];
          $scope.dayProducts.push(pro);
          $scope.dayProducts2.push(pro);
          d4++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.dayProducts.push(pro);
      $scope.dayProducts[2].noProduct='No product suggested';
    }
    if($scope.dayCategory6.length > 0){
      angular.forEach($scope.dayCategory6,function(filter){
        if(d6==0&&(filter.category=='Moisturiser')){
          var pro=$scope.products[filter.productId];
          $scope.dayProducts.push(pro);
          $scope.dayProducts2.push(pro);
          d6++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.dayProducts.push(pro);
      $scope.dayProducts[3].noProduct='No product suggested';
    }

    if($scope.dayCategory7.length > 0){
      angular.forEach($scope.dayCategory7,function(filter){
        if(d7==0&&(filter.category=='Sunscreen')){
          var pro=$scope.products[filter.productId];
          $scope.dayProducts.push(pro);
          $scope.dayProducts2.push(pro);
          d7++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.dayProducts.push(pro);
      $scope.dayProducts[4].noProduct='No product suggested';
    }


    if($scope.nightCategory1.length > 0){
      angular.forEach($scope.nightCategory1,function(filter){
        if(n1==0&&(filter.category=='Makeup Remover')){
          var pro=$scope.products[filter.productId];
          $scope.nightProducts.push(pro);
          $scope.nightProducts2.push(pro);
          n1++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.nightProducts.push(pro);
      $scope.nightProducts[0].noProduct='No product suggested';
    }
    if($scope.nightCategory2.length > 0){
      angular.forEach($scope.nightCategory2,function(filter){
        if(n2==0&&(filter.category=='Facial Cleanser')){
          var pro=$scope.products[filter.productId];
          $scope.nightProducts.push(pro);
          $scope.nightProducts2.push(pro);
          n2++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.nightProducts.push(pro);
      $scope.nightProducts[1].noProduct='No product suggested';
    }
    if($scope.nightCategory3.length > 0){
      angular.forEach($scope.nightCategory3,function(filter){
        if(n3==0&&(filter.category=='Lotion')){
          var pro=$scope.products[filter.productId];
          $scope.nightProducts.push(pro);
          $scope.nightProducts2.push(pro);
          n3++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.nightProducts.push(pro);
      $scope.nightProducts[2].noProduct='No product suggested';
    }
    if($scope.nightCategory4.length > 0){
      angular.forEach($scope.nightCategory4,function(filter){
        if(n4==0&&(filter.category=='Essence')){
          var pro=$scope.products[filter.productId];
          $scope.nightProducts.push(pro);
          $scope.nightProducts2.push(pro);
          n4++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.nightProducts.push(pro);
      $scope.nightProducts[3].noProduct='No product suggested';
    }
    if($scope.nightCategory6.length > 0){
      angular.forEach($scope.nightCategory6,function(filter){
        if(n6==0&&(filter.category=='Moisturiser')){
          var pro=$scope.products[filter.productId];
          $scope.nightProducts.push(pro);
          $scope.nightProducts2.push(pro);
          n6++;
        }
      });
    }else{
      var pro=$scope.emptyProduct[0];
      $scope.nightProducts.push(pro);
      $scope.nightProducts[4].noProduct='No product suggested';
    }



    
    
    console.log($scope.dayProducts);

    

    

    // angular.forEach($scope.compareList,function(filter){
      
    //   if(d1==0&&(filter.category=='Facial Cleanser')&&(filter.day=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.dayProducts.push(pro);
    //     d1++;
    //   }
    //   if(d2==0&&(filter.category=='Lotion')&&(filter.day=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.dayProducts.push(pro);
    //     d2++;
    //   }
    //   if(d3==0&&(filter.category=='Essence')&&(filter.day=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.dayProducts.push(pro);
    //     d3++;
    //   }
    //   if(d4==0&&(filter.category=='Moisturiser')&&(filter.day=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.dayProducts.push(pro);
    //     d4++;
    //   }
    //   if(d5==0&&(filter.category=='Sunscreen')&&(filter.day=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.dayProducts.push(pro);
    //     d5++;
    //   }
    //   if(n1==0&&(filter.category=='Makeup Remover')&&(filter.night=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.nightProducts.push(pro);
    //     n1++;
    //   }
    //   if(n2==0&&(filter.category=='Facial Cleanser')&&(filter.night=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.nightProducts.push(pro);
    //     n2++;
    //   }
    //   if(n3==0&&(filter.category=='Lotion')&&(filter.night=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.nightProducts.push(pro);
    //     n3++;
    //   }
    //   if(n4==0&&(filter.category=='Essence')&&(filter.night=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.nightProducts.push(pro);
    //     n4++;
    //   }
    //   if(n5==0&&(filter.category=='Moisturiser')&&(filter.night=='1')){
    //     var pro=$scope.products[filter.productId];
    //     $scope.nightProducts.push(pro);
    //     n5++;
    //   }

    // });
    // console.log($scope.dayProducts); 
    // console.log($scope.nightProducts); 


    $scope.dayProducts=$scope.dayProducts.slice(0,5);
    $scope.nightProducts=$scope.nightProducts.slice(0,5);
    for(var i=0;i<$scope.dayProducts.length;i++){
      $scope.dayProducts[i].seq=i+1;
    }
    for(var i=0;i<$scope.nightProducts.length;i++){
      $scope.nightProducts[i].seq=i+1;
    }


    $scope.showPro=function(index){
      //console.log(index);
      $scope.carouselIndex = index;
      $scope.overLay=true;
    }
    $scope.hidePro=function(){
      $scope.overLay=false;
    }
    $scope.daySlider=function(){
      $scope.dayCarousel=true;
      $scope.nightCarousel=false;
    }
    $scope.nightSlider=function(){
      $scope.dayCarousel=false;
      $scope.nightCarousel=true;
    }


}]);


