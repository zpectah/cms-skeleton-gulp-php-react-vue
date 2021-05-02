<?php


namespace core\model;


use core\service\SessionService;


class Profile {

	public function get ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function login ($conn, $requestData) {
		$session = new SessionService;

		// email
		// password

		return [
			'r' => $requestData
		];
	}

	public function logout ($conn, $requestData) {
		$session = new SessionService;

		// email

		return [
			'r' => $requestData
		];
	}

	public function lost_password ($conn, $requestData) {

		// email

		return [
			'r' => $requestData
		];
	}

	public function lost_password_reset ($conn, $requestData) {

		// email

		return [
			'r' => $requestData
		];
	}


}
