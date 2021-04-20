<?php


namespace core\model;


use mysqli;


class Tags {

	public function get ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = [];

		$sql = 'SELECT * FROM tags';
		$result = $conn -> query($sql);

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response[] = $row;
			}
		}

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
