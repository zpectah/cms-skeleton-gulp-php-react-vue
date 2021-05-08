<?php


namespace core\model;


use core\service\EmailService;
use core\service\SessionService;
use core\utils\Helpers;


class Profile {

	public function get ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
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
		$requestData = json_decode(json_encode($requestData), true);
		$users = new Users;
		$response = null;

		// TODO: handle profile update

		return $response;
	}

	public function login ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$users = new Users;
		$response = [
			'message' => 'user_not_found'
		];
		$session = new SessionService;

		$email = $requestData['email'];
		$password = $requestData['password'];
		$user = $users -> get($conn, ['email' => $email]);

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
		$requestData = json_decode(json_encode($requestData), true);
		$requests = new Requests;
		$emailService = new EmailService;
		$helpers = new Helpers;
		$response = [
			'message' => 'user_not_found',
			'email' => null,
			'row' => null,
		];

		$user = null;
		$email = $requestData['email'];

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
				$token = $helpers -> getToken(16, '');

				$confirm_url = 'http://skeleton-php-cms/admin/lost-password/token/' . $token; // TODO
				$response['email'] = $emailService -> sendEmailMessage(
					'lostPassword',
					$email,
					"Lost password request",
					"",
					"Confirm password reset with <a href='" . $confirm_url ."'>this link</> "
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
		$requestData = json_decode(json_encode($requestData), true);
		$requests = new Requests;
		$users = new Users;
		$helpers = new Helpers;
		$emailService = new EmailService;
		$response = [
			'message' => 'user_password_reset_error',
		];

		$token = $requestData['token'];
		$request_row = $requests -> get($conn, ['token' => $token]);

		if ($token) {
			if ($request_row) {
				if ($request_row['status'] == 0) {
					$user_row = $users -> get($conn, ['email' => $request_row['value']]);

					if ($user_row) {
						$tmp_password = $helpers -> getToken(4, '');
						$user_row['password'] = $tmp_password;

						$response['email'] = $emailService -> sendEmailMessage(
							'passwordReset',
							$user_row['email'],
							"New password",
							"",
							"This is your new password: <b>" . $tmp_password ."</b> <br /> Keep it safe, or change after login "
						);
						$response['row'] = $requests -> update($conn, [
							'status' => 1,
							'token' => $request_row['token']
						]);
						$response['user'] = $users -> update($conn, $user_row);
						$response['message'] = 'user_password_reset_success';
					}

				} else {
					$response['message'] = 'user_password_already_reset';
				}
			} else {
				$response['message'] = 'request_not_found';
			}
		} else {
			$response['message'] = 'token_not_found';
		}

		return $response;
	}

}
