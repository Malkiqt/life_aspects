app.controller('myController',function($scope,$http){

///CONTENT
	///CONTENT CREATION
		///CREATE GOAL
		///CREATE ACTION
	///CONTENT UPDATE
		///UPDATE FUTURE VIEW
		///UPDATE GOAL
		///UPDATE ACTION
	///CONTENT DELETE
		///DELETE GOAL
		///DELETE ACTION
	///LOAD CONTENT
		///LOAD ACTIONS  ///Load as objects,so we can pass it to 'current_action' and have all the properties at hand
		///LOAD GOALS  ///Load as objects,so we can pass it to 'current_goal' and have all the properties at hand 

///USER CONTROL
	///LOGIN
	///REGISTER
	///LOGOUT

///!!!!!!!!!!!Server communication!!!!!!!!!!!!!!!


	$scope.search_result = function(search_input){
		if($scope.current_content=='goal'){
			$scope.load_actions(search_input);
		}else{
			$scope.load_goals(search_input);
		}	
	};	

	$scope.load_actions = function(search_string){

		var data = {
			'action' : 'load' ,
			'table_name' : 'actions',
			'username' : $scope.username ,
			'aspect' : $scope.content_info['aspect'],
			'goal' : $scope.content_info['goal']
		};

		if(search_string !== 'undefined'){
			data.search_string = search_string;
		}

		send_ajax(data,
			function success(response){

				var stringified_data = JSON.stringify(response.data);
				var result_data = JSON.parse(stringified_data);
				var count = 0;
				$scope.actions = [];

				for(data of result_data){
					$scope.actions.push( {} );
					for(var prop_name in data){
						$scope.actions[count][prop_name] = data[prop_name];
					}
					$scope.actions[count]['completed'] = parseInt($scope.actions[count]['completed']);
					count++;
				}
			},
			function error(error){
				alert(error);
			}
		);
	};
	$scope.load_goals = function(search_string){
	
		var data = {
			'action' : 'load' ,
			'table_name' : 'goals',
			'username' : $scope.username ,
			'aspect' : $scope.content_info['aspect']
		};
		if(search_string !== 'undefined'){
			data.search_string = search_string;
		}
		send_ajax(data,
			function success(response){

				var stringified_data = JSON.stringify(response.data);
				var result_data = JSON.parse(stringified_data);
				var count = 0;
				$scope.goals = [];

				for(data of result_data){
					$scope.goals.push( {} );
					for(var prop_name in data){
						$scope.goals[count][prop_name] = data[prop_name];
					}
					$scope.goals[count]['extended'] = false;
					$scope.goals[count]['completed'] = parseInt($scope.goals[count]['completed']);
					count++;
				}
			},
			function error(error){
				alert(error);
			}
		);
	};



	$scope.create_goal = function(name,usefulness,strategy,description){
		var data = {
			'action' : 'create' ,
			'table_name' : 'goals',
			'username' : $scope.username ,
			'aspect' : $scope.content_info['aspect'],
			'name' : name ,
			'usefulness' : usefulness,
			'strategy' : strategy,
			'description' : description,
			'conclusion' : '',
			'completed' : '0'
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Goal with this name already exists.');
				}else{
					alert('Goal Created');
					$scope.load_goals();
				}
			},	
			function error(error){
				alert(error);
			}
		);
	};
	$scope.create_action = function(name,scope,reason,challenge,description,deadline){
		var data = {
			'action' : 'create' ,
			'table_name' : 'actions',
			'username' : $scope.username ,
			'aspect' : $scope.content_info['aspect'],
			'goal' : $scope.content_info['goal'],
			'name' : name ,
			'scope' : scope,
			'challenge' : challenge,
			'reason' : reason,
			'description' : description,
			'deadline' : deadline,
			'conclusion' : '',
			'completed' : 0
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Action with this name already exists.');
				}else{
					alert('Action Created');
					$scope.load_actions();
				}
			},	
			function error(error){
				alert(error);
			}
		);
	};

	$scope.delete_goal = function(this_id){
		$scope.current_id = this_id;
		var data = {
			'action' : 'delete' ,
			'table_name' : 'goals',
			'id' : this_id
		};
		send_ajax(data,
			function(response){
				alert('Goal Deleted');
				$scope.load_goals();
			},
			function(error){
				alert(error);
			}
		);
	};
	$scope.delete_action = function(this_id){
		$scope.current_id = this_id;
		var data = {
			'action' : 'delete' ,
			'table_name' : 'actions',
			'id' : this_id
		};
		send_ajax(data,
			function(response){
				alert('Action Deleted');
				$scope.load_actions();
			},
			function(error){
				alert(error);
			}
		);
	};

	$scope.update_goal = function(id,name,usefulness,strategy,description,conclusion,completed){
		(completed) ? completed=1 : completed=0;
		var data = {
			'action' : 'update' ,
			'table_name' : 'goals',
			'id' : id,
			'name' : name ,
			'usefulness' : usefulness,
			'strategy' : strategy,
			'description' : description,
			'conclusion' : conclusion,
			'completed' : completed
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Could not update goal');
				}else{
					alert('Goal Updated');
					$scope.load_goals();
				}
			},	
			function error(error){
				alert(error);
			}
		);
	};
	$scope.update_action = function(id,name,scope,reason,challenge,description,deadline,conclusion,completed){
		(completed) ? completed=1 : completed=0;
		var data = {
			'action' : 'update' ,
			'table_name' : 'actions',
			'id' : id,
			'name' : name ,
			'scope' : scope,
			'challenge' : challenge,
			'reason' : reason,
			'description' : description,
			'deadline' : deadline,
			'conclusion' : conclusion,
			'completed' : completed
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Could not update action');
				}else{
					alert('Action Updated');
					$scope.load_actions();
				}
			},	
			function error(error){
				alert(error);
			}
		);
	};

	$scope.load_future_view = function(){
		var data = {
			'action' : 'load_future_view' ,
			'username' : $scope.username 
		};
		send_ajax(data,
			function success(response){
				var stringified_data = JSON.stringify(response.data);
				var result_data = JSON.parse(stringified_data);
				for(data of result_data){
					$scope.aspects[data['aspect']]['positive_view'] = data['positive'];
					$scope.aspects[data['aspect']]['negative_view'] = data['negative'];
				}
			},
			function error(error){
				alert(error);
			}
		);
	};
	$scope.update_future_views = function(){
		for(aspect in $scope.aspects){
			var data = {
				'action' : 'update_future_view',
				'username' : $scope.username,
				'aspect' : aspect,
				'positive' : $scope.aspects[aspect].positive_view,
				'negative' : $scope.aspects[aspect].negative_view
			}
			send_ajax(data,
				function success(response){
					alert('future view updated');
				},function error(error){
					alert(error);
				}
			);
		}	
	};
	$scope.update_future_view = function(){
		var data = {
			'action' : 'update_future_view',
			'username' : $scope.username,
			'aspect' : $scope.content_info['aspect'],
			'positive' : $scope.aspects[$scope.content_info['aspect']].positive_view,
			'negative' : $scope.aspects[$scope.content_info['aspect']].negative_view
		}
		send_ajax(data,
			function success(response){
				//alert('future view updated');
			},function error(error){
				alert(error);
			}
		);
	};


	$scope.register = function(username,password){
		var data = {
			'action' : 'register' ,
			'username' : username ,
			'password' : password
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Username already exists');
				}else{
					alert('Successfuly registered');
				}	
			},	
			function error(error){
				alert(error);
			}
		);
	};
	$scope.login = function(username,password){
		var data = {
			'action' : 'login' ,
			'username' : username ,
			'password' : password
		};
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Wrong Username or Password');
				}else{
					$scope.username = username;
					$scope.logged = true;
					$scope.load_future_view();
				}	
			},	
			function error(error){
				alert(error);
			}
		);
	};
	$scope.logout = function(){
		initialize();
		/*var data = {
			'action' : 'logout'
		}
		send_ajax(data,
			function success(response){
				var result_data = JSON.parse(response.data);
				if(result_data[0].result == 0){
					alert('Problem logging out');
				}else{
					alert('Logged Out');
					$scope.logged = false;
					$scope.username = '';
					$scope.content_info['aspect'] = '';
					$scope.content_info['goal'] = '';
					$scope.content_info['action'] = '';
				}
			},function error(error){
				alert(error);
			}
		);*/	
	};




	function send_ajax(data,success_callback,error_callback){
		$http({
			method: 'POST',
			url: 'php/process.php',	
			data: data	
		}).then(function(response){
			success_callback(response);
		},function(error){
			error_callback(error);
		});	
	};



	$scope.select_aspect = function(this_aspect){
		for(aspect in $scope.aspects){
			$scope.aspects[aspect].selected = false;
		}
		$scope.aspects[this_aspect].selected = true;
		$scope.current_aspect = this_aspect;
	};

	$scope.main_button_clicked = function(){
		if($scope.current_content=='action'){
			$scope.current_content = 'goal';
			$scope.show_dashboard = true;
		}else{
			$scope.show_dashboard = !$scope.show_dashboard;
		}		
	};

	$scope.content_button_clicked = function(type,name){
		$scope.current_content = type;
		$scope.content_info[type] = name;
		$scope.show_dashboard = true;
		if(type=='aspect'){
			$scope.load_goals();
		}else if(type='goal'){
			$scope.load_actions();
		}
		
	};

	$scope.should_show = function(content){
		if($scope.current_content == content){
			return true;
		}else{
			return false;
		}
	};

	$scope.set_obj = function(type,obj){
		if(type=='action'){
			$scope.current_action_obj = {};
			for(prop in obj){
				$scope.current_action_obj[prop] = obj[prop];
			}
		}else if(type=='goal'){
			$scope.current_goal_obj = {};
			for(prop in obj){
				$scope.current_goal_obj[prop] = obj[prop];
			}			
		}
	};




	function initialize(){
		//track if should display logged out or logged in content
		$scope.logged = true;
		$scope.username = 'gospodinat';
		$scope.load_future_view(); // If auto Logged In


		//$scope.modal =  {};
		$scope.modal_show = false;

		//track if dashboard or create is displayed
		$scope.show_dashboard = true;

		//track which page we're on
		$scope.current_content = '';
		$scope.current_aspect = '';
		$scope.current_goal = '';


		$scope.button_value = {
			'aspect' : {
				'false' : 'Show Goals',
				'true' : 'Create Goal'
			},
			'goal' : {
				'false' : 'Show Actions',
				'true' : 'Create Action'
			},
			'action' : {
				'false' : 'Go Back',
				'true' : 'Go Back'
			}	
		}


		$scope.content_info = {
			'aspect' : '',
			'goal' : '',
			'action' : ''
		}

		//This Object will take the selected Goal object from Goals Parent Object..
		$scope.current_goal_obj = {};
		//This Object will take the selected Action object from Actions Parent Object..
		$scope.current_action_obj = {};

		//This Will Contain the Aspects;
		$scope.aspects = {
			'career' : {
				'positive_view' : '',
				'negative_view' : '',
				'selected' : 'false'
			},
			'family' : {
				'positive_view' : '',
				'negative_view' : '',
				'selected' : 'false'
			},
			'social' : {
				'positive_view' : '',
				'negative_view' : '',
				'selected' : 'false'
			},
			'learning' : {
				'positive_view' : '',
				'negative_view' : '',
				'selected' : 'false'
			},
			'health' : { 
				'positive_view' : '',
				'negative_view' : '',
				'selected' : 'false'
			}
		};

		//This Will Contain the Different Goals and Each one's properties..;
		$scope.goals = [];
		$scope.actions = [];
		$scope.completed_message = [];
		$scope.completed_message['0'] = 'Mark as Completed';
		$scope.completed_message['1'] = 'Mark as Uncompleted';
		$scope.completed_message['false'] = 'Mark as Completed';
		$scope.completed_message['true'] = 'Mark as Uncompleted';
		
	}



	initialize();



});