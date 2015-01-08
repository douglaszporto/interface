app.directive('attributeLabel',[function(){
	return {
		restrict : 'A',
		scope : false,
		replace : false,
		link: function(scope, element, attrs, ctrl){
			var label = $('<div />').addClass('component-label').html(attrs.attributeLabel);
			$(element).prepend(label);

			$(element).find('input, textarea, select').focus(function(){
				$(this).parent().find('.component-label').addClass('active').addClass('colored');
			});

			$(element).find('input, textarea, select').blur(function(){
				var label = $(this).parent().find('.component-label');
				label.removeClass('colored');
				if($(this).val() === '')
					label.removeClass('active');
			});
		}
	};
}]);

app.directive('attributeLoader',[function(){
	return {
		restrict : 'A',
		replace : false,
		scope : false,
		link: function(scope, element, attrs, ctrl){
			var loader = $('<div />').addClass('component-action-button-loader').addClass('loader').html('&nbsp;');
			$(element).append(loader).click(function(){
				$(this).addClass('running');
			});

			scope.$on(attrs.attributeLoader,function(event,loading){
				if(loading)
					$(element).addClass('running');
				else
					$(element).removeClass('running');
			});
		}
	};
}]);


app.directive('componentTextfield',[function(){
	return {
		restrict : 'E',
		template : '<div class="component-container"><input type="text" class="component-textfield" ng-model="value"/></div>',
		replace : true,
		scope : {
			value: '=ngModel'
		}
	};
}]);

app.directive('componentPassword',[function(){
	return {
		restrict : 'E',
		template : '<div class="component-container"><input type="password" class="component-textfield" ng-model="value"/></div>',
		replace : true,
		scope : {
			value: '=ngModel'
		}
	};
}]);

app.directive('componentActionButton',[function(){
	return {
		restrict : 'E',
		template : '<button><span class="component-action-button-label"></span></button>',
		replace : true,
		scope : {
			label: '@'
		},
		link: function(scope, element, attrs, ctrl){
			$(element).addClass('component-action-button').find('.component-action-button-label').html(scope.label);
		}
	};
}]);

app.directive('interfaceOpbarButton',[function(){
	return {
		restrict : 'E',
		template : '<div class="content-main-opbar-button-wrapper"><div class="content-main-opbar-button"><span class="content-main-opbar-button-icon"></span></div><span class="content-main-opbar-button-hint"></span></div>',
		replace : true,
		scope : {
			icon: '@',
			hint: '@'
		},
		link: function(scope, element, attrs, ctrl){
			var btn = $(element).find('.content-main-opbar-button');

			btn.parent().find('.content-main-opbar-button-icon').html(scope.icon);
			btn.parent().find('.content-main-opbar-button-hint').html(scope.hint);

			btn.mouseenter(function(){
				$(this).parent().find('.content-main-opbar-button-hint').addClass('active');
			}).mouseleave(function(){
				$(this).parent().find('.content-main-opbar-button-hint').removeClass('active');
			});
		}
	};
}]);