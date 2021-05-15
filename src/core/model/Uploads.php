<?php


namespace core\model;


class Uploads {

	private function get_language_row($conn, $lang, $id) {
		$response = null;
		$table_name = 'uploads__' . $lang;

		// prepare
		$query = ('SELECT * FROM ' . $table_name . ' WHERE id = ?');
		$types = 'i';
		$args = [ $id ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response = $row;
			}
		}

		return $response;
	}

	private function create_language_rows($conn, $activeLanguages, $lastId, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = [];

		foreach ($activeLanguages as $lang) {
			$table_name = 'uploads__' . $lang;

			// prepare
			$query = ('INSERT INTO ' . $table_name . ' (id, title) VALUES (?,?)');
			$types = 'is';
			$args = [
				$lastId,
				$requestData[$lang]['title']
			];

			// execute
			if ($conn -> connect_error) {
				$response = $conn -> connect_error;
			} else {
				$stmt = $conn -> prepare($query);
				$stmt -> bind_param($types, ...$args);
				$stmt -> execute();
				$response[] = $lang;
				$stmt -> close();
			}
		}

		return $response;
	}

	private function update_language_rows($conn, $activeLanguages, $id, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = null;

		foreach ($activeLanguages as $lang) {
			$table_name = 'uploads__' . $lang;

			// prepare
			$query = ('UPDATE ' . $table_name . ' SET title = ? WHERE id = ?');
			$types = 'si';
			$args = [
				$requestData[$lang]['title'],
				$id
			];

			// execute
			if ($conn -> connect_error) {
				$response = $conn -> connect_error;
			} else {
				$stmt = $conn -> prepare($query);
				$stmt -> bind_param($types, ...$args);
				$stmt -> execute();
				$response[] = $lang;
				$stmt -> close();
			}
		}

		return $response;
	}

	private function upload_file($file_object) {
		$response = null;

		//
		// TODO: upload file to location before
		// if success - continue to save to table ...
		//

		// TODO
		$_response = [
			'extension' => '',
			'file_name' => '',
			'file_mime' => '',
			'file_size' => '',
		];

		return $response;
	}


	public function get ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = [];
		$active_languages = $languages['active'];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM uploads WHERE deleted = ?');
		$types = 'i';
		$args = [ 0 ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				foreach ($active_languages as $lang) {
					$row['lang'][$lang] = self::get_language_row($conn, $lang, $row['id']);
				}
				$row['category'] = $row['category'] ? explode(",", $row['category']) : [];

				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		$uploadedFile = self::upload_file([]);

		$_extension = ''; // TODO ???
		$_file_name = ''; // TODO ???
		$_file_mime = ''; // TODO ???
		$_file_size = ''; // TODO ???

		if ($uploadedFile) {

			// prepare
			$query = ('INSERT INTO uploads (type, name, extension, file_name, file_mime, file_size, category, active, deleted) VALUES (?,?,?,?,?,?,?,?,?)');
			$types = 'sssssssii';
			$args = [
				$requestData['type'],
				$requestData['name'],
				$requestData['extension'], // TODO: should be from $uploadedFile
				$requestData['file_name'], // TODO: should be from $uploadedFile
				$requestData['file_mime'], // TODO: should be from $uploadedFile
				$requestData['file_size'], // TODO: should be from $uploadedFile
				$requestData['category'] ? implode(",", $requestData['category']) : '',
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
				$id = $stmt -> insert_id;
				$response = [
					'id' => $id,
					'lang' => self::create_language_rows($conn, $languages['active'], $id, $requestData['lang']) // created languages ... !!!
				];
				$stmt -> close();
			}

		} else {
			$response = 'error_upload';
		}

		return $response;
	}

	public function update ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		// TODO: update whole object is necessary ...

		// prepare
		$query = ('UPDATE uploads SET type = ?, name = ?, extension = ?, file_name = ?, file_mime = ?, file_size = ?, category = ?, active = ? WHERE id = ?');
		$types = 'ssssssii';
		$args = [
			$requestData['type'],
			$requestData['name'],
			$requestData['extension'],
			$requestData['file_name'],
			$requestData['file_mime'],
			$requestData['file_size'],
			$requestData['category'] ? implode(",", $requestData['category']) : '',
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
				'rows' => $stmt -> affected_rows,
				'lang' => self::update_language_rows($conn, $languages['active'], $requestData['id'], $requestData['lang']),
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
			$query = ('UPDATE uploads SET active = IF(active=1, 0, 1) WHERE id = ?');
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
			$query = ('UPDATE uploads SET deleted = 1 WHERE id = ?');
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
