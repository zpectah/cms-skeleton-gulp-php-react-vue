<?php


namespace core\model;


use core\service\EmailService;
use core\service\SessionService;
use core\utils\Helpers;


class Profile {

	public function get ($conn, $requestData) {
		$response = null;
		$session = new SessionService;

		$email = $session -> get('user');

		if ($email) {
			// prepare
			$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE email = ?');
			$types = 's';
			$args = [ $email ];

			// execute
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$result = $stmt -> get_result();
			$stmt -> close();

			if ($result -> num_rows > 0) {
				while($row = $result -> fetch_assoc()) {
					unset($row['password']);

					$response = $row;
				}
			}
		}

		return $response;
	}

	public function update ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function login ($conn, $requestData) {
		$response = [
			'message' => 'user_not_found'
		];
		$session = new SessionService;

		$user = null;
		$email = $requestData -> email;
		$password = $requestData -> password;

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE email = ?');
		$types = 's';
		$args = [ $email ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$user = $row;
			}
		}

		if ($user) {
			$passwordMatches = $user['password'] == $password; // TODO
			$response['message'] = 'user_password_not_match';

			if ($user['active'] == 0) {
				$response['message'] = 'user_not_active';
			} else if ($user['deleted'] == 1) {
				$response['message'] = 'user_is_deleted';
			} else if ($passwordMatches) {
				$response['message'] = 'user_login_success';
				$response['session'] = $session -> start('user', $email);
			}

		}

		return $response;
	}

	public function logout () {
		$session = new SessionService;

		return $session -> close();
	}

	public function lost_password ($conn, $requestData) {
		$requests = new Requests;
		$emailService = new EmailService;
		$helpers = new Helpers;
		$response = [
			'message' => 'user_not_found',
			'email' => null,
			'row' => null,
		];

		$user = null;
		$email = $requestData -> email;

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE email = ?');
		$types = 's';
		$args = [ $email ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$user = $row;
			}
		}

		if ($user) {

			if ($user['active'] == 0) {
				$response['message'] = 'user_not_active';
			} else if ($user['deleted'] == 1) {
				$response['message'] = 'user_is_deleted';
			} else {

				// proceed first step

				// create request token !!!
				// send email message -> email with token (create url with it)
				// create new row in requests

				$token = $helpers -> getToken(16, '');

				$response['email'] = $emailService -> sendEmail(
					$email,
					[],
					"some content and token " . $token
				);
				$response['row'] = $requests -> create($conn, [
					'type' => 'user',
					'context' => 'lostPassword',
					'value' => $email,
					'token' => $token
				]);

				$response['message'] = 'request_was_send';
			}

		}

		return $response;
	}

	public function lost_password_reset ($conn, $requestData) {

		// email

		// proceed second step

		return [
			'r' => $requestData
		];
	}


}
