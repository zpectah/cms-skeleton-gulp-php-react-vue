<?php


namespace core\model;


class Posts {

	private function get_language_row($conn, $lang, $id) {
		$response = null;
		$table_name = 'posts__' . $lang;

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
			$table_name = 'posts__' . $lang;

			// For prevent error while column is blank
			$tmp_perex = $requestData[$lang]['perex'] ? $requestData[$lang]['perex'] : '';
			$tmp_content = $requestData[$lang]['content'] ? $requestData[$lang]['content'] : '';

			// prepare
			$query = ('INSERT INTO ' . $table_name . ' (id, title, perex, content) VALUES (?,?,?,?)');
			$types = 'isss';
			$args = [
				$lastId,
				$requestData[$lang]['title'],
				$tmp_perex,
				$tmp_content
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
			$table_name = 'posts__' . $lang;

			// prepare
			$query = ('UPDATE ' . $table_name . ' SET title = ?, perex = ?, content = ? WHERE id = ?');
			$types = 'sssi';
			$args = [
				$requestData[$lang]['title'],
				$requestData[$lang]['perex'],
				$requestData[$lang]['content'],
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


	public function get ($conn, $languages) {
		$response = [];
		$active_languages = $languages['active'];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM posts WHERE deleted = ?');
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
				$row['tags'] = $row['tags'] ? explode(",", $row['tags']) : [];
				$row['media'] = $row['media'] ? explode(",", $row['media']) : [];
				$row['event_location'] = $row['event_location'] ? explode(",", $row['event_location']) : [0,0];
				$row['attachments'] = $row['attachments'] ? explode(",", $row['attachments']) : [];

				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		$type = $requestData['type'];

		if ($type == 'event') {
			$event_start = $requestData['event_start'];
			$event_end = $requestData['event_end'];
			$event_location = $requestData['event_location'] ? implode(",", $requestData['event_location']) : '';
		} else {
			$event_start = '';
			$event_end = '';
			$event_location = '';
		}

		// prepare
		$query = ('INSERT INTO posts (
                   type,
                   name,
                   category,
                   tags,
                   event_start,
                   event_end,
                   event_location,
                   event_address,
                   event_country,
                   event_city,
                   event_zip,
                   post_options,
                   media,
                   attachments,
                   img_main,
                   img_thumbnail,
                   published,
                   author,
                   rating,
                   authorized,
                   active,
                   deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$types = 'sssssssssssssssssiiiii';
		$args = [
			$type,
			$requestData['name'],
			$requestData['category'] ? implode(",", $requestData['category']) : '',
			$requestData['tags'] ? implode(",", $requestData['tags']) : '',
			$event_start,
			$event_end,
			$event_location,
			$requestData['event_address'],
			$requestData['event_country'],
			$requestData['event_city'],
			$requestData['event_zip'],
			$requestData['post_options'],
			$requestData['media'] ? implode(",", $requestData['media']) : '',
			$requestData['attachments'] ? implode(",", $requestData['attachments']) : '',
			$requestData['img_main'],
			$requestData['img_thumbnail'],
			$requestData['published'],
			$requestData['author'],
			$requestData['rating'],
			$requestData['authorized'],
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

		return $response;
	}

	public function update ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		$type = $requestData['type'];

		if ($type == 'event') {
			$event_start = $requestData['event_start'];
			$event_end = $requestData['event_end'];
			$event_location = $requestData['event_location'] ? implode(",", $requestData['event_location']) : '';
		} else {
			$event_start = '';
			$event_end = '';
			$event_location = '';
		}

		// prepare
		$query = ('UPDATE posts SET
                 type = ?,
                 name = ?,
                 category = ?,
                 tags = ?,
                 event_start = ?,
                 event_end = ?,
                 event_location = ?,
                 event_address = ?,
                 event_country = ?,
                 event_city = ?,
                 event_zip = ?,
                 post_options = ?,
                 media = ?,
                 attachments = ?,
                 img_main = ?,
                 img_thumbnail = ?,
                 published = ?,
                 rating = ?,
                 authorized = ?,
                 active = ?
		WHERE id = ?');
		$types = 'sssssssssssssssssiiii';
		$args = [
			$type,
			$requestData['name'],
			$requestData['category'] ? implode(",", $requestData['category']) : '',
			$requestData['tags'] ? implode(",", $requestData['tags']) : '',
			$event_start,
			$event_end,
			$event_location,
			$requestData['event_address'],
			$requestData['event_country'],
			$requestData['event_city'],
			$requestData['event_zip'],
			$requestData['post_options'],
			$requestData['media'] ? implode(",", $requestData['media']) : '',
			$requestData['attachments'] ? implode(",", $requestData['attachments']) : '',
			$requestData['img_main'],
			$requestData['img_thumbnail'],
			$requestData['published'],
			$requestData['rating'],
			$requestData['authorized'],
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
			$query = ('UPDATE posts SET active = IF(active=1, 0, 1) WHERE id = ?');
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
			$query = ('UPDATE posts SET deleted = 1 WHERE id = ?');
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
