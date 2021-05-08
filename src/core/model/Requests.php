<?php


namespace core\model;


class Requests {

	public function get ($conn, $requestData) {
		$response = [];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM requests');
		$types = '';
		$args = [];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		// params
		$requestData = json_decode(json_encode($requestData), true);
		$f_id = $requestData['id'];
		$f_token = $requestData['token'];

		if ($result -> num_rows > 0) {
			// iterate by params
			if ($f_id) {
				while($row = $result -> fetch_assoc()) {
					if ($f_id == $row['id']) $response = $row;
				}
			} else if ($f_token) {
				while($row = $result -> fetch_assoc()) {
					if ($f_token == $row['token']) $response = $row;
				}
			} else {
				while($row = $result -> fetch_assoc()) {
					$response[] = $row;
				}
			}
		}

		return $response;
	}

	public function create ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('INSERT INTO requests (type, context, value, token, status) VALUES (?,?,?,?,?)');
		$types = 'ssssi';
		$args = [
			$requestData['type'],
			$requestData['context'],
			$requestData['value'],
			$requestData['token'],
			0
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

		return $response;
	}

	public function update ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('UPDATE requests SET status = ? WHERE token = ?');
		$types = 'is';
		$args = [
			$requestData['status'],
			$requestData['token']
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

		return $response;
	}

	public function delete ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('UPDATE requests SET status = ? WHERE token = ?');
		$types = 'is';
		$args = [
			2,
			$requestData['token']
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

		return $response;
	}

}
