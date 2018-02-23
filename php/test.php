<?php

	$request = {
		'work' : 'value_work',
		'life' : 'value_life'
	};
	foreach($request as $request_key => $request_value){
		echo $request_key;
		echo $request_value;
	}

?>