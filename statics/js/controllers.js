app.controller('MainCtrl',['$scope', 'LoginService', 'MenuService', function($scope, LoginService, MenuService){
	$scope.AskForLogin = function(){
		$scope.loginBox = (typeof localStorage.token === 'undefined' || localStorage.token === '');
		LoginService.setToken(localStorage.token || null);
	};

	$scope.ToggleMenu = function(){
		MenuService.toggle();
	};
}]);


app.controller('LoginCtrl',['$scope', 'LoginService', function($scope, LoginService){

	$scope.credentials = {
		user : "",
		pass : ""
	};

	$scope.Login = function(){
		LoginService.login($scope.credentials.user,$scope.credentials.pass);
	};

	$scope.GetStatusCode = function(){
		return LoginService.getStatus();
	};

	$scope.GetStatusMessage = function(){
		return LoginService.getStatusMessage();
	};
}]);



app.controller('MenuCtrl',['$scope', '$timeout', '$rootScope', 'MenuService', 'LoginService', function($scope, $timeout, $rootScope, MenuService, LoginService){

	$scope.active = {
		expanded : false,
		focus : false,
		itemId : 'home',
		label : '',
		hasSubitems : false,
		canSeeSubitensTitle : true,
		canSeeSubitensItems : true,
		subitems : []
	};
	$scope.items = MenuService.items;

	$scope.Logout = function(){
		LoginService.logout();
	};

	$scope.$on('menuExpandedStatus', function(event, status) {
		$scope.active.expanded = status;
	});

	$scope.IsActiveItem = function(item){
		return item === $scope.active.itemId;
	};

	$scope.SetActiveItem = function(item){
		$scope.active.itemId = item;
		$scope.active.hasSubitems = false;
		$scope.active.showSubitems = true;
		$scope.active.canSeeSubitensTitle = false;
		$scope.active.canSeeSubitensItems = false;

		var itemsLenght = $scope.items.length;
		var currentItem = null;
		for(var i=0; i<itemsLenght; i++){
			if($scope.items[i].id == item){
				currentItem = i;
				break;
			}
		}

		if(currentItem !== null){
			$scope.active.hasSubitems = $scope.items[currentItem].subitems.length > 0;
			$timeout(function(){
				$scope.active.label = $scope.items[currentItem].label;
				$scope.active.subitems = $scope.items[currentItem].subitems;
				$timeout(function(){
					$scope.active.canSeeSubitensTitle = true;
				},1);
				$timeout(function(){
					$scope.active.canSeeSubitensItems = true;
				},100);
			},200);
		}

		if(!$scope.active.hasSubitems)
			$scope.LoadContent(item,false);
	};

	$scope.LoadContent = function(item, hide){
		if(hide !== false)
			$scope.active.focus = false;
		$rootScope.$broadcast('changeMainContent',item);
	};
}]);



app.controller('ContentCtrl',['$scope', '$rootScope', '$timeout', '$http', 'ContentService', function($scope, $rootScope, $timeout, $http, ContentService){

	$scope.template = "";
	$scope.data = {};
	$scope.selectedItems = [];
	


	$scope.isChangingContent = function(){
		return ContentService.getStatusChanging();
	}

	$scope.toggleSelectedItem = function(item){
		var index = $scope.selectedItems.indexOf(item);
		if(index < 0)
			$scope.selectedItems.push(item);
		else
			$scope.selectedItems.splice(index,1);
	}

	$scope.isSelected = function(item){
		return $scope.selectedItems.indexOf(item) != -1;
	}



	$scope.$on('changeMainContent',function(event,contentId){
		$rootScope.$broadcast('loadingSomething',true);
		ContentService.load(contentId);
	});

	$scope.$on('contentLoaded',function(event,loaded){
		$scope.template = ContentService.template;
		$scope.data     = ContentService.data;
	});

}]);




app.controller('LoadingCtrl',['$scope', function($scope){
	$scope.loadingCounter = 0;
	$scope.$on('loadingSomething',function(event,status){
		$scope.loadingCounter++;
	});
	$scope.$on('loadingDone',function(event,status){
		$scope.loadingCounter--;
	});
}]);




