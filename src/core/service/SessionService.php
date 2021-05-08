<?php


namespace core\service;


class SessionService {

	public function get ($type) {
		session_start();
		$response = $_SESSION;

		if ($type == 'user') $response = $_SESSION["userCMS"];
		if ($type == 'member') $response = null;

		return $response;
	}

	public function start ($type, $email) {
		session_start();
		$response = null;

		if ($type == 'user') $response = $_SESSION["userCMS"] = $email;
		if ($type == 'member') $response = null;

		return $response;
	}

	public function close () {
		session_start();

		return [
			session_unset(),
			session_destroy()
		];
	}

}
