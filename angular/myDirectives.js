app.directive('searchModal',function(){
	return{
		restrict : 'E',
		scope: false,
	    templateUrl: './templates/modals/search_modal.html',
		link: function (scope, el) {
			el.on('click', function (e) {
				var modal_content = document.querySelector('#modal_content');
					if( (modal_content !== e.target) && (!modal_content.contains(e.target)) ){	
					scope.$apply(function(){
						scope.modal_show = false;
					});
				}
			});
		}
	}
});


app.directive('loggedOutContent',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/main_content/logged_out_content.html'
	}
});

app.directive('aspectContent',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/main_content/aspect_content.html'
	}
});


app.directive('goalContent',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/main_content/goal_content.html'
	}
});


app.directive('actionContent',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/main_content/action_content.html'
	}
});


app.directive('goal',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/containers/goal.html'
	}
});


app.directive('action',function(){
	return{
		restrict : 'E',
	    scope: false,
	    templateUrl: './templates/containers/action.html'
	}
});


