<?php

	if(!isset($_GET["model"]) || empty($_GET["model"])){
		header('HTTP/1.1 403 Forbidden');
		exit();
	}

	if(!isset($_GET["user"]) || empty($_GET["user"])){
		header('HTTP/1.1 403 Forbidden');
		exit();
	}

	require_once dirname(__FILE__) . "/classes/DB.class.php";

	$model  = DB::Clean($_GET["model"]);
	$result = null;
	$title  = "";

	$db = DB::getInstance();
	$db->Query("
		SELECT 
			title 
		FROM 
			grid
		WHERE
			grid_id = '{$model}'
	");
	$result = $db->Fetch();
	if(empty($result)){
		header('HTTP/1.1 404 Not Found');
		exit();
	}
	$title = $result["title"];

	$gridFromBackend   = json_decode(file_get_contents(str_replace(array('$1','$2'),array($_GET["model"],$_GET["user"]),BACKEND_PROTOCOL.BACKEND_GRID)));
	$fieldsFromBackend = array_keys((array)$gridFromBackend[0]);


	$fields = array();
	$db->Query("
		SELECT 
			column_id AS id,
			title,
			width,
			type,
			alignment
		FROM 
			columns
		WHERE
			grid_id = '{$model}' AND
			column_id IN ('".(implode("','",$fieldsFromBackend))."')
	");
	while($result = $db->Fetch())
		$fields[] = (object)$result;


?>
{
	"title" : "<?php echo $title; ?>",
	"template" : "views/grid.html",
	"fields" : <?php echo json_encode($fields); ?>,
	"data" : <?php echo json_encode($gridFromBackend); ?>
}