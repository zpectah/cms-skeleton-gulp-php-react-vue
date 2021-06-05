<?php


namespace core\model;


class Users {

	public function get ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = [];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE deleted = ?');
		$types = 'i';
		$args = [ 0 ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		// params
		$f_id = $requestData['id'];
		$f_email = $requestData['email'];

		if ($result -> num_rows > 0) {
			// iterate by params
			if ($f_id) {
				while($row = $result -> fetch_assoc()) {
					if ($f_id == $row['id']) {
						if (!$requestData['withPassword']) unset($row['password']);

						$response = $row;
					}
				}
			} else if ($f_email) {
				while($row = $result -> fetch_assoc()) {
					if ($f_email == $row['email']) {
						if (!$requestData['withPassword']) unset($row['password']);

						$response = $row;
					}
				}
			} else {
				while($row = $result -> fetch_assoc()) {
					if (!$requestData['withPassword']) unset($row['password']);

					$response[] = $row;
				}
			}
		}


		return $response;
	}

	public function create ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('INSERT INTO users (email, password, nickname, first_name, middle_name, last_name, user_level, user_group, img_avatar, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
		$types = 'ssssssissii';
		$args = [
			$requestData['email'],
			password_hash($requestData['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS),
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['user_level'],
			$requestData['user_group'],
			$requestData['img_avatar'],
			$requestData['active'],
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
		$password = $requestData['password'];
		$query = $password ? ('UPDATE users SET email = ?, password = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, img_avatar = ?, active = ? WHERE id = ?')
			: ('UPDATE users SET email = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, img_avatar = ?, active = ? WHERE id = ?');
		$types = $password ? 'ssssssissii' : 'sssssissii';
		$args = $password ? [
			$requestData['email'],
			password_hash($requestData['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS),
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['user_level'],
			$requestData['user_group'],
			$requestData['img_avatar'],
			$requestData['active'],
			$requestData['id']
		] : [
			$requestData['email'],
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['user_level'],
			$requestData['user_group'],
			$requestData['img_avatar'],
			$requestData['active'],
			$requestData['id']
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
		$requestData = json_decode(json_encode($requestData), true);
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

		$id = $requestData['id'];

		if ($id) {
			$response = toggleRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = toggleRow($conn, $item);
			}
		}

		return $response;
	}

	public function delete ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
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

		$id = $requestData['id'];

		if ($id) {
			$response = deleteRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = deleteRow($conn, $item);
			}
		}

		return $response;
	}

}
