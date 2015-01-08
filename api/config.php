<?php

if(getenv('OPENSHIFT_APP_NAME') === false){
	define('MIDDLE_VERSION'   , date('YmdHis'));
	define('MIDDLE_DOMAIN'    , '//local.interface/');
	define('MIDDLE_NAME'      , 'Interface');
	define('BACKEND_PROTOCOL' , 'http:');
	define('BACKEND_URL'      , '//local.interface/');
	define('BACKEND_GRID'     , '//local.interface/api/grid/$1?token=$2');

	define('DB_HOST'     , '127.0.0.1');
	define('DB_USER'     , 'root'     );
	define('DB_PASS'     , '102030'   );
	define('DB_DATABASE' , 'api'      );
	define('DB_DRIVER'   , 'mysql'    );
	define('DB_CHARSET'  , 'UTF-8'    );
}else{
	define('MIDDLE_VERSION'   , date('YmdHis'));
	define('MIDDLE_DOMAIN'    , '//interface-douglaszanotta.rhcloud.com/');
	define('MIDDLE_NAME'      , 'Interface');
	define('BACKEND_PROTOCOL' , 'http:');
	define('BACKEND_URL'      , '//interface-douglaszanotta.rhcloud.com/');
	define('BACKEND_GRID'     , '//interface-douglaszanotta.rhcloud.com/api/grid/$1?token=$2');

	define('DB_HOST'     , getenv('OPENSHIFT_MYSQL_DB_HOST'));
	define('DB_USER'     , getenv('OPENSHIFT_MYSQL_DB_USERNAME'));
	define('DB_PASS'     , getenv('OPENSHIFT_MYSQL_DB_PASSWORD'));
	define('DB_DATABASE' , 'api'      );
	define('DB_DRIVER'   , 'mysql'    );
	define('DB_CHARSET'  , 'UTF-8'    );
}

?>