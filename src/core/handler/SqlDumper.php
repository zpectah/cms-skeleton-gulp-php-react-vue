<?php


namespace core\handler;


// https://github.com/ifsnop/mysqldump-php
use Ifsnop\Mysqldump as IMysqldump;


class SqlDumper {

	public function export_table_dump($requestData) {
		$date = date_create();
		$filePrefix = 'sqlDump__' . date_timestamp_get($date);

		try {
			$dump = new IMysqldump\Mysqldump('mysql:host=' . CFG_DB['server'] .';dbname=' . CFG_DB['name'], CFG_DB['user'], CFG_DB['password']);
			$dump -> start( $filePrefix . '.sql');
			$file = $dump -> fileName;

			header('Content-Type: application/force-download');
			header('Content-Disposition: attachment; filename='.basename($file));
			ob_clean();
			flush();
			readfile($file);
			@unlink($file);

			$response = $file;
		} catch (\Exception $e) {
			$response = $e -> getMessage();
		}

		return $response;
	}

	public function import_table_data($requestData) {
		$response = null;

		// TODO: import data scheme + data

		return $response;
	}

}
