<?php

namespace PHPMVC;

class Log {

	static public function Dump($content, $file){
		$fullFile = dirname(__FILE__) . "/../logs/" . $file;

		try{
			$log = fopen($fullFile, file_exists($fullFile) ? 'a' : 'x');
			fwrite($log,$content."\n");
			fclose($log);
		}catch(\Exception $e){
			// Não há o que fazer.
		}
	}
}

?>