<?php 

///DATABASES
	///USER -> id,username,password

	///FUTURE VIEW -> id,username,aspect,positive,negative

	///GOALS ->	id,user,name,aspect,usefulness,strategy,description,conclusion,completed (Maybe I should change these as well as form questions)

	///ACTIONS -> id,user,aspect,goal,name,scope,reason,challenge,description,conclusion,completed (Maybe I should change these as well as form questions)

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
		///LOAD ACTIONS  
		///LOAD GOALS  
		///LOAD FUTURE VIEW

///USER CONTROL
	///LOGIN
	///REGISTER
	///LOGOUT


	$host = 'localhost';
	$user = 'root';
	$pass = '';
	$db = 'angularjs_life_aspects_new';

	$conn = new mysqli($host,$user,$pass,$db);

	header('Content-Type: application/json');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$action = $request->action;


	/*foreach($request as $request_key => $request_value){
		//echo $request;
		//echo $request_key;
		echo $request_value;
	}*/

	switch($action){

		///LOAD and UPDATE FUTURE VIEW FIELDS

			case 'update_future_view':
				$username = $request->username;
				$aspect = $request->aspect;
				$positive = $request->positive;
				$negative = $request->negative;

				$query = "UPDATE future_view SET positive='".$positive."',negative='".$negative."' WHERE username='".$username."' AND aspect='".$aspect."'";
				$conn->query($query);

				break;


			case 'load_future_view':
				$username = $request->username;

				$query = "SELECT * FROM future_view WHERE username='".$username."'";

				$result = $conn->query($query);

				if($result){
					$result_query = '';
					$rows_count = 0;
					$total_result_rows = $result->num_rows;
					while($result_row = $result->fetch_assoc()){
						$total_property_count = count((array)$result_row);
						$property_count = 0;
						$result_query .= '{';
						foreach($result_row as $result_key => $result_value){
							$result_query .= '"'.$result_key.'" : "'.$result_value.'"';
							$property_count++;
							if($property_count<$total_property_count){
								$result_query .= ',';				
							}
						}
						$result_query .= '}';
						$rows_count++;
						if($rows_count<$total_result_rows){
							$result_query .= ',';
						}						
					}
					echo "[".$result_query."]";
				}

				break;

		///CONTENT
			case 'load':

				$table_name = $request->table_name;
				
				$search_query = get_search_query($action,$table_name,$request);

				$query = "SELECT * FROM ".$table_name." WHERE ".$search_query." ORDER BY id DESC";	

				$result = $conn->query($query);


				if($result){
					$result_query = '';
					$rows_count = 0;
					$total_result_rows = $result->num_rows;
					while($result_row = $result->fetch_assoc()){
						$total_property_count = count((array)$result_row);
						$property_count = 0;
						$result_query .= '{';
						foreach($result_row as $result_key => $result_value){
							$result_query .= '"'.$result_key.'" : "'.$result_value.'"';
							$property_count++;
							if($property_count<$total_property_count){
								$result_query .= ',';				
							}
						}
						$result_query .= '}';
						$rows_count++;
						if($rows_count<$total_result_rows){
							$result_query .= ',';
						}						
					}

					//echo $search_query;
					echo "[".$result_query."]";
				}

				
				break;


			case 'update':
			
				$id = $request->id;
				$table_name = $request->table_name;

				$query_set = '';
				$count = 0;
				$total_count = count((array)$request);
				foreach($request as $request_key => $request_value){
					$count++;
					if($request_key!='action' && $request_key!='id' && $request_key!='table_name'){
						$query_set .= $request_key."='".$request_value."'";		
						if($count<$total_count){
							$query_set .= ',';				
						}						
					}
				}

				$query = "UPDATE ".$table_name." SET ".$query_set." WHERE id='".$id."'";

				$result = $conn->query($query);
				//echo $query;
				if($result){
					echo json_encode('[{"result" : "1"}]');
				}else{
					echo json_encode('[{"result" : "0"}]');
				}

				break;


			case 'create':
	
				$table_name = $request->table_name;

				$search_query = get_search_query($action,$table_name,$request);

				$query = "SELECT * FROM ".$table_name." WHERE ".$search_query;
				//echo $query;
				$result = $conn->query($query);

			
				if($result->num_rows){
					echo json_encode('[{"result" : "0"}]');
				}else{
					$query_keys = '';
					$query_values = '';
					$count = 0;
					$total_count = count((array)$request);
					foreach($request as $request_key => $request_value){
						$count++;
						if($request_key!='action' && $request_key!='table_name'){
							$query_keys .= $request_key;
							$query_values .= "'".$request_value."'";			
							if($count<$total_count){
								$query_keys .= ',';
								$query_values .= ',';				
							}						
						}
					}

					$query = "INSERT INTO ".$table_name."(".$query_keys.") VALUES(".$query_values.")";					
				
					$result = $conn->query($query);
					
					//echo $query;
					echo json_encode('[{"result" : "1"}]');
				}					


				break;


			case 'delete':

				$id = $request->id;
				$table_name = $request->table_name;

				$query = "DELETE FROM ".$table_name." WHERE id='".$id."'";

				$conn->query($query);
				
				break;


		///USER CONTROL
	
			case 'login':
				$username = $request->username;
				$password = $request->password;

				$query = "SELECT * FROM users WHERE username='".$username."' AND password='".$password."'";
				$result = $conn->query($query);

				if($result->num_rows){
					echo json_encode('[{"result" : "1"}]');
				}else{
					echo json_encode('[{"result" : "0"}]');
				}
				break;

		
			case 'register':

				$username = $request->username;
				$password = $request->password;

				$query = "SELECT * FROM users WHERE username='".$username."'";
				$result = $conn->query($query);

				if($result->num_rows){
					echo json_encode('[{"result" : "0"}]');
				}else{
					$query = "INSERT INTO users(username,password,admin) VALUES('" .$username. "','". $password ."','0')";	
					$result = $conn->query($query);	
					create_future_view_entries($conn,$username);
					echo json_encode('[{"result" : "1"}]');				
				}

				break;	

		
			case 'logout':

				session_destroy();
				break;


	}



	function create_future_view_entries($conn,$username){
		
		$query = '';
		$query .= "INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','career','','');";
		$query .= "INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','family','','');";
		$query .= "INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','social','','');";
		$query .= "INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','learning','','');";
		$query .= "INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','health','','')";
		$conn->multi_query($query);
		/*
		$query ="INSERT INTO future_view(username,aspect,positive,negative) VALUES('" .$username. "','career','','');";
		$conn->query($query);
		*/
	}

	function get_search_query($search_action,$table_name,$request){

		$search_query = '';
		$search_query_count = 0;
		$search_query_total = 2;			
		if($search_action=='create'){$search_query_total++;}
		if($table_name=='actions'){$search_query_total++;}

		if(isset($request->search_string)){
			$search_query =  "name LIKE '%".$request->search_string."%' AND ";
		}

		foreach($request as $request_key => $request_value){
			if($request_key=='username' || $request_key=='aspect'  || $request_key=='goal' || ($search_action=='create' && $request_key=='name')){
				$search_query_count++;
				$search_query .= $request_key.'="'.$request_value.'"';
				if($search_query_count<$search_query_total){
					$search_query .= " AND ";
				}			
			}	
		}			

		return $search_query;
	}

?>