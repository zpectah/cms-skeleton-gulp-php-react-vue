<?php


namespace core\handler;


use Ifsnop\Mysqldump as IMysqldump;


class SqlDumper {

	public function export_table_dump() {
		$date = date_create();
		$filePrefix = CMS_NAME . '_dump_' . date_timestamp_get($date);

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

			print_r('-- Filename: ' . $file . '');
			exit;
		} catch (\Exception $e) {
			return $e -> getMessage();
		}

	}

	public function import_table_data($requestData) {
		$response = null;

		// TODO: import data scheme + data

		return $response;
	}

}
