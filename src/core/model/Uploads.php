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

	private function upload_file($file_object, $name, $ext) {
		$response = [
			'file' => null,
			'type' => null
		];

		$file_path = null;
		$file_parts = explode(";base64,", $file_object);
		$file_base64 = base64_decode($file_parts[1]);

		switch ($ext) {

			//
			// process by file extension
			//

			case 'jpg':
			case 'jpeg':
			case 'png':
				$file_path = PATH_UPLOADS . 'image/';
				$response['type'] = 'image';
				break;

			case 'mp3':
			case 'aac':
				$file_path = PATH_UPLOADS . 'audio/';
				$response['type'] = 'audio';
				break;

			case 'mpeg':
			case 'mp4':
				$file_path = PATH_UPLOADS . 'video/';
				$response['type'] = 'video';
				break;

			case 'doc':
			case 'docx':
			case 'xls':
			case 'xlsx':
			case 'ppt':
			case 'pptx':
			case 'pages':
			case 'numbers':
			case 'pdf':
			case 'pps':
			case 'ppsx':
			$file_path = PATH_UPLOADS . 'document/';
				$response['type'] = 'document';
				break;

			case 'zip':
			case 'rar':
				$file_path = PATH_UPLOADS . 'archive/';
				$response['type'] = 'archive';
				break;

		}


		if ($file_path) {

			// create directory if not created and put file to it
			if (!file_exists($file_path)) mkdir($file_path, 0777, true);

			$file = $file_path . $name . '.' . $ext;

			$response['file'] = file_put_contents($file, $file_base64);

		}

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

		$uploadedFile = self::upload_file($requestData['fileBase64'], $requestData['name'], $requestData['extension']);

		if ($uploadedFile['file'] && $uploadedFile['type']) {

			// prepare
			$query = ('INSERT INTO uploads (type, name, extension, file_name, file_mime, file_size, category, active, deleted) VALUES (?,?,?,?,?,?,?,?,?)');
			$types = 'sssssisii';
			$args = [
				$uploadedFile['type'],
				$requestData['name'],
				$requestData['extension'],
				$requestData['file_name'],
				$requestData['file_mime'],
				$requestData['file_size'],
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
			$response = [
				'message' => 'error_while_upload',
			];
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
