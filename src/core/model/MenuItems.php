<?php


namespace core\model;


class MenuItems {

	public function get ($conn, $requestData) {

		return [];
	}

	public function create ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData) {

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
