<?php


namespace core\model;


class Pages {

	public function get ($conn, $requestData, $languages) {

		return [];
	}

	public function create ($conn, $requestData, $languages) {

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData, $languages) {

		return [
			'r' => $requestData
		];
	}

	public function toggle ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function delete ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

}
