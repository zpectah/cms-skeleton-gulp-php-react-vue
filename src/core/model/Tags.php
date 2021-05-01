<?php


namespace core\model;


use mysqli;


class Tags {

	public function get ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = [];

		$query = '/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM tags WHERE deleted = 0';
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

		$conn -> close();

		return $response;
	}

	public function toggle ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function toggleRow ($conn, $id) {
			// prepare
			$query = 'UPDATE tags SET active = IF(active=1, 0, 1) WHERE id = ?';
			$types = 'i';
			$args = [ $id ];

			// execute
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$r = $stmt -> affected_rows;
			$stmt -> close();

			return $r;
		}

		$id = $requestData -> id;

		if ($id) {
			$response = toggleRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = toggleRow($conn, $item['id']);
			}
		}

		$conn -> close();

		return $response;
	}

	public function delete ($requestData) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function deleteRow ($conn, $id) {
			// prepare
			$query = 'UPDATE tags SET deleted = 1 WHERE id = ?';
			$types = 'i';
			$args = [ $id ];

			// execute
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$r = $stmt -> affected_rows;
			$stmt -> close();

			return $r;
		}

		$id = $requestData -> id;

		if ($id) {
			$response = deleteRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = deleteRow($conn, $item['id']);
			}
		}

		$conn -> close();

		return $response;
	}

}
