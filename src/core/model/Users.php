<?php


namespace core\model;


use mysqli;


class Users {

	public function get ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = [];

		$query = '/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users';
		$result = $conn -> query($query);

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response[] = $row;
			}
		}

		$conn -> close();

		return $response;
	}

	public function create ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function update ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function toggle ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function delete ($requestData) {

		return [
			'r' => $requestData
		];
	}

}
