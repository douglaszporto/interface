<?php

	if(!isset($_GET["model"]) || empty($_GET["model"])){
		header('HTTP/1.1 403 Forbidden');
		exit();
	}

	require_once dirname(__FILE__) . "/classes/DB.class.php";

	$db      = DB::getInstance();
	$model   = DB::Clean($_GET["model"]);
	$fields  = array();
	$pkfield = "";
	$table   = "";
	$result  = null;
	$data    = array();

	switch($model){
		case 'contaspagar':
			$table = "financeiro_contaspagar";
			break;
	}

	$db->Query("SHOW COLUMNS FROM {$table}");
	while($result = $db->Fetch()){
		$fields[] = $result["Field"];
		if($result["Key"] === "PRI")
			$pkfield = $result["Field"];
	}

	$pkInclusion = empty($pkfield) ? "" : "{$pkfield} as pk,";
	
	$db->Query("
		SELECT
			$pkInclusion
			".implode(", ",$fields)."
		FROM
			{$table}
		LIMIT 30
	");
	while($result = $db->Fetch())
		$data[] = (object)$result;

	echo json_encode($data);

?>