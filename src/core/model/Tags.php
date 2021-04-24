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

		// close
		$conn -> close();

		return $response;
	}

	public function create ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);

		// prepare
		$query = 'INSERT INTO tags (name, active) VALUES (?,?)';
		$types = 'si';
		$args = [
			$requestData -> name,
			$requestData -> active
		];

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response = [
				'id' => $stmt -> insert_id
			];
			$stmt -> close();
		}

		// close
		$conn -> close();

		return $response;
	}

	public function update ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);

		// prepare
		$query = 'UPDATE tags SET name = ?, active = ? WHERE id = ?';
		$types = 'sii';
		$args = [
			$requestData -> name,
			$requestData -> active,
			$requestData -> id
		];

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response = [
				'rows' => $stmt -> affected_rows
			];
			$stmt -> close();
		}

		// close
		$conn -> close();

		return $response;
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
