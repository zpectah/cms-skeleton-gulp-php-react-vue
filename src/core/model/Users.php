<?php


namespace core\model;


class Users {

	public function get ($conn, $requestData) {
		$response = [];

		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE deleted = 0');
		$result = $conn -> query($query);

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				unset($row['password']);
				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData) {
		// prepare
		$query = ('INSERT INTO users (email, password, nickname, first_name, middle_name, last_name, user_level, user_group, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?)');
		$types = 'ssssssisii';
		$args = [
			$requestData -> email,
			$requestData -> password,
			$requestData -> nickname,
			$requestData -> first_name,
			$requestData -> middle_name,
			$requestData -> last_name,
			$requestData -> user_level,
			$requestData -> user_group,
			$requestData -> active,
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
		// prepare
		$password = $requestData -> password;
		$query = $password ? ('UPDATE users SET email = ?, password = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, active = ? WHERE id = ?') : ('UPDATE users SET email = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, active = ? WHERE id = ?');
		$types = $password ? 'ssssssisii' : 'sssssisii';
		$args = $password ? [
			$requestData -> email,
			$requestData -> password,
			$requestData -> nickname,
			$requestData -> first_name,
			$requestData -> middle_name,
			$requestData -> last_name,
			$requestData -> user_level,
			$requestData -> user_group,
			$requestData -> active,
			$requestData -> id
		] : [
			$requestData -> email,
			$requestData -> nickname,
			$requestData -> first_name,
			$requestData -> middle_name,
			$requestData -> last_name,
			$requestData -> user_level,
			$requestData -> user_group,
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

		return $response;
	}

	public function toggle ($conn, $requestData) {
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function toggleRow ($conn, $id) {
			// prepare
			$query = ('UPDATE users SET active = IF(active=1, 0, 1) WHERE id = ?');
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

		return $response;
	}

	public function delete ($conn, $requestData) {
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function deleteRow ($conn, $id) {
			// prepare
			$query = ('UPDATE users SET deleted = 1 WHERE id = ?');
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

		return $response;
	}

}
