<?php


namespace core\service;


class LogService {

	public function getList () {
		return null;
	}

	public function create ($uid, $method, $status) {
		$log  = "User: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").PHP_EOL.
			"Attempt: " . $method . ': ' . $status .
			"User: " . $uid .
			"-------------------------".PHP_EOL;

		if (!file_exists('../logs')) mkdir('../logs', 0777, true);

		return file_put_contents('../logs/' . date("j.n.Y").'.log', $log, FILE_APPEND);
	}

}
