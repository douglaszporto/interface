app.directive('loginRequired',['$http','$compile','$timeout','LoginService','MenuService',function($http,$compile,$timeout,LoginService,MenuService){
	return {
		restrict : 'E',
		scope : true,
		replace : false,
		controller : ['$scope', function($scope){
			$scope.requestLoginOrDashboard = function(){
				
				if(LoginService.token === null){
					htmlContent = 'login.html';
					getParams   = {};
				}else{
					htmlContent = 'dashboard.html';
					getParams   = {'token':LoginService.token};
				}

				MenuService.items = JSON.parse(localStorage.menuItems || "[]");
				LoginService.token = localStorage.token || null;

				$http.get('views/'+htmlContent,{params:getParams}).success(function(returnedData){

					var hasAnimableElementsInside = $('#content').find('.animable').length > 0;

					var DOMElements  = $('<div class="content-main">'+returnedData+'</div>');
					var linkFunction = $compile(DOMElements);
					var compiledElem = linkFunction($scope);

					if(hasAnimableElementsInside)
						$('#content').find('.animable').each(function(){
							$(this).removeClass('active');
						});

					$timeout(function(){
						$('#content').html(compiledElem);
						$timeout(function(){
							$('#content').find('.animable').each(function(){
								$(this).addClass('active');
							});
						},100);
					},hasAnimableElementsInside ? 400 : 1);

				});
			};

			$scope.$watch(function(){
				return LoginService.isLogged();
			},function(logged){
				$scope.requestLoginOrDashboard();
			});
		}]
	};
}]);




app.directive('interfaceMainContent',['$http','$compile','$timeout','LoginService',function($http,$compile,$timeout,LoginService){
	return {
		restrict : 'A',
		scope : true,
		replace : false,
		link: function(scope, element, attrs, ctrl){

			scope.$watch(function(){
				return scope.template;
			},function(templateURL){
				if(templateURL !== ''){
					$http.get(templateURL).success(function(data){
						
						var DOMElements  = $('<div class="dashboard-content-main-data">'+data+'</div>');
						var linkFunction = $compile(DOMElements);
						var compiledElem = linkFunction(scope);

						$('#dashboard-content-main').html(compiledElem);
					}).error(function(){
						// TOAST!
					});
				}
			});
		}
	};
}]);




app.directive('interfaceGridType',[function(){
	return {
		restrict : 'A',
		scope : true,
		replace : false,
		link: function(scope, element, attrs, ctrl){
			var content = scope.line[scope.field.id];
			var hasMask = false;

			switch(attrs.interfaceGridType){
				case 'money':
					hasMask   = true;
					var value = (parseFloat(content)).toFixed(2);
					var parts = value.toString().split(".");

					parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
					content   = parts.join(",");
					break;
				case 'date':
					hasMask = true;
					content = content.replace(/^(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
					break;
				case 'datemonth':
					hasMask = true;
					content = content.replace(/^(\d{4})-(\d{2})-(\d{2})/g,"$2/$1");
					break;
			}

			console.log('hasMask: '+hasMask+'\t\tcontent:'+content);

			if(hasMask)
				scope.line[scope.field.id] = content;
		}
	};
}]);