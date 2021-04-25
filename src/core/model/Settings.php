<?php


namespace core\model;


use mysqli;


class Settings {

	public function get () {
		$conn = new mysqli(...CFG_DB_CONN);
		$sql = 'SELECT SQL_CACHE * FROM settings_cms';
		$result = $conn -> query($sql);
		$response = [];

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				switch ($row['format']) {

					case 'boolean':
						$nv = $row['value'] == 'true';
						break;

					case 'array':
						$nv = $row['value'] ? explode(",", $row['value']) : [];
						break;

					case 'json':
					default:
						$nv = $row['value'];
						break;

				}

				$response[$row['name']] = $nv;
			}
		}

		$conn -> close();

		return $response;
	}

	public function update ($fields) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = [];

		foreach ($fields as $k => $value) {
			$query = "SELECT * FROM settings_cms WHERE name = '$k'";
			$result = $conn -> query($query);
			while ($row = $result -> fetch_assoc() ) {
				switch ($row['format']) {

					case 'array':
						$new_value = $value ? implode(",", $value) : '';
						break;

					case 'boolean':
						$new_value = $value ? 'true' : 'false';
						break;

					case 'json':
					default:
						$new_value = $value;
						break;

				}

				$sql = "UPDATE settings_cms SET value='$new_value' WHERE name='$k'";

				if ($conn -> query($sql)) {
					$response[$k] = 'OK';
				} else {
					$response[$k] = $conn -> error;
				}

			}
		}

		$conn -> close();

		return $response;
	}

}
