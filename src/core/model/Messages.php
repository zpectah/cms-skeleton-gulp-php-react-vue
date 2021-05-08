<?php


namespace core\model;


class Messages {

	public function get ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		return [];
	}

	public function create ($conn, $requestData) {
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
