<?php

sleep(1);

$data = json_decode(file_get_contents('php://input'));

if(!is_object($data) || empty($data) || !isset($data->user) || empty($data->user) || !isset($data->pass) || empty($data->pass)){
	header('HTTP/1.1 403 Forbidden');
	exit;
}


if($data->user === 'root' && $data->pass === '102030'){
	$token = sha1(date('YmdHis').rand());
	echo '{"token":"',$token,'"}';
	session_start();
	$_SESSION["user_token"] = $token;
}else{
	header('HTTP/1.1 401 Unauthorized');
}


?>