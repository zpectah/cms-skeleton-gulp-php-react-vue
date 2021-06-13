<?php


namespace core\model\Market;


class Products {

	private function get_language_row($conn, $lang, $id) {
		$response = null;
		$table_name = 'products__' . $lang;

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
			$table_name = 'products__' . $lang;

			// For prevent error while column is blank
			$tmp_description = $requestData[$lang]['description'] ? $requestData[$lang]['description'] : '';
			$tmp_content = $requestData[$lang]['content'] ? $requestData[$lang]['content'] : '';

			// prepare
			$query = ('INSERT INTO ' . $table_name . ' (id, title, description, content) VALUES (?,?,?,?)');
			$types = 'isss';
			$args = [
				$lastId,
				$requestData[$lang]['title'],
				$tmp_description,
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
			$table_name = 'products__' . $lang;

			// prepare
			$query = ('UPDATE ' . $table_name . ' SET title = ?, description = ?, content = ? WHERE id = ?');
			$types = 'sssi';
			$args = [
				$requestData[$lang]['title'],
				$requestData[$lang]['description'],
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
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM products WHERE deleted = ?');
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
				$row['items_related'] = $row['items_related'] ? explode(",", $row['items_related']) : [];
				$row['products_options'] = $row['products_options'] ? explode(",", $row['products_options']) : [];
				$row['attachments'] = $row['attachments'] ? explode(",", $row['attachments']) : [];

				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		$type = $requestData['type'];

		// prepare
		$query = ('INSERT INTO products (
                   type,
                   name,
                   category,
                   tags,
                   item_price,
                   item_discount,
                   item_amount,
                   item_weight,
                   item_length,
                   item_width,
                   item_height,
                   items_related,
                   products_options,
                   attachments,
                   img_main,
                   img_thumbnail,
                   item_new,
                   item_used,
                   item_unboxed,
                   rating,
                   active,
                   deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$types = 'ssssiiiiiiisssssiiiiii';
		$args = [
			$type,
			$requestData['name'],
			$requestData['category'] ? implode(",", $requestData['category']) : '',
			$requestData['tags'] ? implode(",", $requestData['tags']) : '',
			$requestData['item_price'],
			$requestData['item_discount'],
			$requestData['item_amount'],
			$requestData['item_weight'],
			$requestData['item_length'],
			$requestData['item_width'],
			$requestData['item_height'],
			$requestData['items_related'] ? implode(",", $requestData['items_related']) : '',
			$requestData['products_options'] ? implode(",", $requestData['products_options']) : '',
			$requestData['attachments'] ? implode(",", $requestData['attachments']) : '',
			$requestData['img_main'],
			$requestData['img_thumbnail'],
			$requestData['item_new'],
			$requestData['item_used'],
			$requestData['item_unboxed'],
			$requestData['rating'],
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

		// prepare
		$query = ('UPDATE products SET
                   type = ?,
                   name = ?,
                   category = ?,
                   tags = ?,
                   item_price = ?,
                   item_discount = ?,
                   item_amount = ?,
                   item_weight = ?,
                   item_length = ?,
                   item_width = ?,
                   item_height = ?,
                   items_related = ?,
                   products_options = ?,
                   attachments = ?,
                   img_main = ?,
                   img_thumbnail = ?,
                   item_new = ?,
                   item_used = ?,
                   item_unboxed = ?,
                   rating = ?,
                   active = ?
		WHERE id = ?');
		$types = 'ssssiiiiiiisssssiiiiii';
		$args = [
			$type,
			$requestData['name'],
			$requestData['category'] ? implode(",", $requestData['category']) : '',
			$requestData['tags'] ? implode(",", $requestData['tags']) : '',
			$requestData['item_price'],
			$requestData['item_discount'],
			$requestData['item_amount'],
			$requestData['item_weight'],
			$requestData['item_length'],
			$requestData['item_width'],
			$requestData['item_height'],
			$requestData['items_related'] ? implode(",", $requestData['items_related']) : '',
			$requestData['products_options'] ? implode(",", $requestData['products_options']) : '',
			$requestData['attachments'] ? implode(",", $requestData['attachments']) : '',
			$requestData['img_main'],
			$requestData['img_thumbnail'],
			$requestData['item_new'],
			$requestData['item_used'],
			$requestData['item_unboxed'],
			$requestData['rating'],
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
			$query = ('UPDATE products SET active = IF(active=1, 0, 1) WHERE id = ?');
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
			$query = ('UPDATE products SET deleted = 1 WHERE id = ?');
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
