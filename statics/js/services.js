app.factory('LoginService', ['$http', '$timeout', '$rootScope', 'MenuService', function($http,$timeout,$rootScope,MenuService){

	return {
		token  : null,
		status : 0,
		statusMsg : "",
		isLogged : function(){
			return localStorage.length > 0 && MenuService.loaded;
		},
		login  : function(user,pass){

			var self = this;
			$http.post(api.login,{"user":user,"pass":pass}).success(function(data,status){
				self.token = data.token;
				localStorage.token = self.token;
				MenuService.load();
			}).error(function(data,status){
				$rootScope.$broadcast('actionLogin',false);
				self.status = status;
				switch(parseInt(self.status,10)){
					case 0   : self.statusMsg = ""; break;
					case 401 : self.statusMsg = "Ops, usuário e senha não conferem"; break;
					case 403 : self.statusMsg = "Hm... Os dados informados são inválidos"; break;
				}
				$timeout(function(){
					self.status = 0;
				},4000);
			});
		},
		logout : function(){
			MenuService.unload();
			this.token = null;
			localStorage.clear();
		},
		setToken : function(tkn){
			this.token = tkn;
		},
		getToken : function(){
			return this.token;
		},
		getStatus : function(){
			return this.status;
		},
		getStatusMessage : function(){
			return this.statusMsg;
		}
	};

}]);


app.factory('MenuService', ['$rootScope', '$http', function($rootScope, $http){

	return {
		menuExpanded : true,
		loaded : false,
		items : [],
		close : function(){
			this.menuExpanded = false;
			$rootScope.$broadcast('menuExpandedStatus',false);
		},
		open : function(){
			this.menuExpanded = true;
			$rootScope.$broadcast('menuExpandedStatus',true);
		},
		toggle : function(){
			this.menuExpanded = !this.menuExpanded;
			$rootScope.$broadcast('menuExpandedStatus',this.menuExpanded);
		},
		load : function(){
			var self = this;
			$http.get(api.menu,{"params":{"token":localStorage.token}}).success(function(data,status){
				$rootScope.$broadcast('actionLogin',false);
				$rootScope.$broadcast('menuLoaded',false);
				self.items  = data;
				self.loaded = true;
				localStorage.menuItems = JSON.stringify(data);
			}).error(function(data,status){
				$rootScope.$broadcast('actionLogin',false);
				$rootScope.$broadcast('menuLoaded',false);
				self.items  = [];
				self.loaded = false;
			});
		},
		unload : function(){
			this.items  = [];
			this.loaded = false;
		}
	};

}]);




app.factory('ContentService', ['$rootScope', '$http', '$timeout', function($rootScope, $http, $timeout){

	return {
		template : null,
		data : {},
		isChanging : false,
		getStatusChanging: function(){
			return this.isChanging;
		},
		load : function(model){
			var self = this;
			$http.get(preference.grid+'/'+model+'/'+localStorage.token).success(function(data,status){
				self.isChanging = true;

				$timeout(function(){
					self.isChanging = false;
					self.template = data.template;
					self.data     = data;
					$rootScope.$broadcast('contentLoaded',false);
					$rootScope.$broadcast('loadingDone',true);
				},300);

			}).error(function(data,status){
				$rootScope.$broadcast('loadingDone',true);
			});
		},
		unload : function(){
		}
	};

}]);