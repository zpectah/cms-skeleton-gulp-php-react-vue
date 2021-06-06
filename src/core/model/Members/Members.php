<?php


namespace core\model\Members;


class Members {

	public function get ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = [];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM members WHERE deleted = ?');
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

					$row['member_phone'] = $row['member_phone'] ? explode(",", $row['member_phone']) : [];
					$row['member_email'] = $row['member_email'] ? explode(",", $row['member_email']) : [];

					$response[] = $row;
				}
			}
		}


		return $response;
	}

	public function create ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		$password = $requestData['password'] ? password_hash($requestData['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS) : '';

		// prepare
		$query = ('INSERT INTO members (email, password, nickname, first_name, middle_name, last_name, member_group, img_avatar, member_country, member_city, member_address, member_zip, member_phone, member_email, description, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$types = 'sssssssssssssssii';
		$args = [
			$requestData['email'],
			$password,
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['member_group'],
			$requestData['img_avatar'],
			$requestData['member_country'],
			$requestData['member_city'],
			$requestData['member_address'],
			$requestData['member_zip'],
			$requestData['member_phone'] ? implode(",", $requestData['member_phone']) : '',
			$requestData['member_email'] ? implode(",", $requestData['member_email']) : '',
			$requestData['description'],
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
		$query = $password ? ('UPDATE members SET email = ?, password = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, member_group = ?, img_avatar = ?, member_country = ?, member_city = ?, member_address = ?, member_zip = ?, member_phone = ?, member_email = ?, description = ?, active = ? WHERE id = ?')
			: ('UPDATE members SET email = ?, nickname = ?, first_name = ?, middle_name = ?, last_name = ?, member_group = ?, img_avatar = ?, member_country = ?, member_city = ?, member_address = ?, member_zip = ?, member_phone = ?, member_email = ?, description = ?, active = ? WHERE id = ?');
		$types = $password ? 'sssssssssssssssii' : 'ssssssssssssssii';
		$args = $password ? [
			$requestData['email'],
			password_hash($requestData['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS),
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['member_group'],
			$requestData['img_avatar'],
			$requestData['member_country'],
			$requestData['member_city'],
			$requestData['member_address'],
			$requestData['member_zip'],
			$requestData['member_phone'] ? implode(",", $requestData['member_phone']) : '',
			$requestData['member_email'] ? implode(",", $requestData['member_email']) : '',
			$requestData['description'],
			$requestData['active'],
			$requestData['id']
		] : [
			$requestData['email'],
			$requestData['nickname'],
			$requestData['first_name'],
			$requestData['middle_name'],
			$requestData['last_name'],
			$requestData['member_group'],
			$requestData['img_avatar'],
			$requestData['member_country'],
			$requestData['member_city'],
			$requestData['member_address'],
			$requestData['member_zip'],
			$requestData['member_phone'] ? implode(",", $requestData['member_phone']) : '',
			$requestData['member_email'] ? implode(",", $requestData['member_email']) : '',
			$requestData['description'],
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
			$query = ('UPDATE members SET active = IF(active=1, 0, 1) WHERE id = ?');
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
			$query = ('UPDATE members SET deleted = 1 WHERE id = ?');
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
