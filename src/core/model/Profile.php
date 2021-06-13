<?php


namespace core\model;


use core\service\EmailService;
use core\service\SessionService;
use core\utils\Helpers;


class Profile {

	public function get ($conn) {
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

		return $users -> update($conn, $requestData);
	}

	public function login ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$users = new Users;
		$session = new SessionService;
		$response = [
			'message' => 'user_not_found'
		];

		$email = $requestData['email'];
		$password = $requestData['password'];
		$user = $users -> get($conn, ['email' => $email, 'withPassword' => true]);

		if ($user) {
			$passwordMatches = password_verify($password, $user['password']);

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
		$users = new Users;
		$response = [
			'message' => 'user_not_found',
		];

		$email = $requestData['email'];
		$user = $users -> get($conn, ['email' => $email]);

		if ($user) {
			if ($user['active'] == 0) {
				$response['message'] = 'user_not_active';
			} else if ($user['deleted'] == 1) {
				$response['message'] = 'user_is_deleted';
			} else {
				$token = $helpers -> getToken(16, '');
				// $token = md5($email . TIMESTAMP);
				$project_root = CFG_ENV['ROOT_PATH'];
				$confirm_url = $project_root . PATH_PREFIX_LOST_PASSWORD . $token;

				$response['email'] = $emailService -> sendStyledMessage(
					$email,
					"Lost password request",
					"<div>Confirm password reset<br /><a href='" . $confirm_url ."' target='_blank'>this link</a></div>",
					null,
					'lostPassword'
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
						$tmp_password = $helpers -> getToken(3, '');
						$hash_password = password_hash($tmp_password, PASS_CRYPT, PASS_CRYPT_OPTIONS);
						$user_row['password'] = $hash_password;

						$response['email'] = $emailService -> sendStyledMessage(
							$user_row['email'],
							"New password",
							"<div>This is your new password: <b>" . $tmp_password ."</b> <br /> Keep it safe, or change after login</div>",
							null,
							'passwordReset'
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
