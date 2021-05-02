<?php


namespace core\model;


class Requests {

	public function get ($conn, $requestData) {

		return [];
	}

	public function create ($conn, $requestData) {

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
