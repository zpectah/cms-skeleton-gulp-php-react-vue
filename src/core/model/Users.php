<?php


namespace core\model;


class Users {

	public function get ($conn, $requestData) {
		$response = [];

		$query = '/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users';
		$result = $conn -> query($query);

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function toggle ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function delete ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

}
