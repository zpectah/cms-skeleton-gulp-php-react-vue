<?php


namespace core\model;


use mysqli;


class Settings {

	public function get ($params = []) {
		$conn = new mysqli(...CFG_DB_CONN);
		$sql = 'SELECT * FROM settings_cms';
		$result = $conn -> query($sql);
		$response = [];

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$nv = $row['value'];
				if ($row['format'] == 'boolean') $nv = settype($row['value'], "boolean");
				if ($row['format'] == 'array') $nv = explode(",", $row['value']);
				$response[$row['key']] = $nv;
			}
		}

		return $response;
	}

	public function update ($fields = []) {

		foreach ($fields as $item) {

			// Update in cycle ...
			// values back to string ???

		}

	}

}
