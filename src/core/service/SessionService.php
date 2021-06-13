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

	public function get_token () {
		session_start();

		return $_SESSION['cms_token'];
	}

	public function start ($type, $email) {
		session_start();
		$response = null;

		$_SESSION['cms_token'] = bin2hex(random_bytes(32));

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
