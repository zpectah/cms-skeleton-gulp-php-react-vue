<?php


namespace core\model;


class Translations {

	public function get ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		return [];
	}

	public function create ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData, $languages) {
		$requestData = json_decode(json_encode($requestData), true);

		return [
			'r' => $requestData
		];
	}

	public function toggle ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		return [
			'r' => $requestData
		];
	}

	public function delete ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		return [
			'r' => $requestData
		];
	}

}
