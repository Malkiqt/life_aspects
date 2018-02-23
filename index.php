<html>

<head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="style/style.css">

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script type='text/javascript' src='angular/myApp.js'></script>
	<script type='text/javascript' src='angular/myController.js'></script>
	<script type='text/javascript' src='angular/myDirectives.js'></script>
</head>

<body>

	<div ng-app='myApp' ng-controller='myController'>

		<search:modal></search:modal>
		
		<div>		
			<div id='navbar'>
				<div id='content_buttons' class='navbar_div col-md-10 col-md-push-1 col-xs-12'>
					<div ng-show='logged' ng-repeat='(aspect_key,aspect_value) in aspects' class='menu_button_container col-md-2 col-xs-12'>
						<button ng-click='select_aspect(aspect_key);content_button_clicked("aspect",aspect_key)' class='styled_button selected_{{aspect_value.selected}} menu_button'>
							{{ aspect_key }}
						</button>
					</div>	
					<div id='search_container' ng-show='current_content'  class='menu_button_container col-md-2 col-xs-12'>
						<!--<button ng-click='search=!search' class='menu_button'>-->
						<button ng-click='modal_show=true' id='search_trigger' class='menu_button styled_button'>
							Search
						</button>
					</div>
				</div>
				<div  id='logout_container' class='navbar_div menu_button_container col-md-1 col-md-push-1 col-xs-12'>
					<button ng-show='logged' ng-click='logout()' class='menu_button styled_button' id='logout'>Logout</button>
				</div>	
			</div>			
		</div>

		<div id='main_content' class='col-md-10 col-md-push-1 col-xs-12'>
			<div ng-show='logged'>
				<aspect:content ng-show='should_show("aspect")'></aspect:content>
				<goal:content ng-show='should_show("goal")'></goal:content>
				<action:content ng-show='should_show("action")'></action:content>
			</div>
			<div ng-show='!logged'>
				<logged:out:content></logged:out:content>
			</div>
		</div>
		<div ng-show='current_content' >
			<div id='toggle_dashboard' class='col-md-1 col-md-push-1 col-xs-12'>		
				<button ng-click='main_button_clicked()' id='main_button' class='styled_button'>{{ button_value[current_content][show_dashboard] }}</button>
			</div>
		</div>
	</div>
		
</body>

</html>



