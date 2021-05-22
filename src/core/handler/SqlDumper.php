<?php


namespace core\handler;


// https://github.com/ifsnop/mysqldump-php
use Ifsnop\Mysqldump as IMysqldump;


class SqlDumper {

	public function export_table_dump($requestData) {
		$response = null;

		try {
			$dump = new IMysqldump\Mysqldump('mysql:host=' . CFG_DB['server'] .';dbname=' . CFG_DB['name'], CFG_DB['user'], CFG_DB['password']);
			$dump -> start(PATH_BASE . 'sql_dump/dump.sql');
			$response = 'Should be ok';
		} catch (\Exception $e) {
			$response = 'mysqldump-php error: ' . $e -> getMessage();
		}

		return $response;
	}

	public function import_table_data($requestData) {
		$response = null;

		// TODO: import data scheme + data

		return $response;
	}

}
