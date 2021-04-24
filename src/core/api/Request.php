<?php


namespace core\api;


use core\service\DataService;


class Request {

	public function getResponse () {
		$DataService = new DataService;

		$urlTrimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
		$url = explode( "/", $urlTrimmed );

		$requestData = json_decode(file_get_contents('php://input'));
		$response = [
			'status' => 'error',
			'data' => null,
		];

		if ( $url[1] ) switch ($url[1]) {

			// Settings
			case 'get_settings':
				$response['data'] = $DataService -> get('Settings', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_settings':
				$response['data'] = $DataService -> update('Settings', $requestData);
				$response['status'] = 'ok';
				break;


			// Profile
			case 'get_profile':
				$response['data'] = $DataService -> get('Profile', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_profile':
				$response['data'] = $DataService -> update('Profile', $requestData);
				$response['status'] = 'ok';
				break;

			// TODO: _login / _logout / _lostPassword

			// Users
			case 'get_users':
				$response['data'] = $DataService -> get('Users', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_users':
				$response['data'] = $DataService -> create('Users', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_users':
				$response['data'] = $DataService -> toggle('Users', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_users':
				$response['data'] = $DataService -> update('Users', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_users':
				$response['data'] = $DataService -> delete('Users', $requestData);
				$response['status'] = 'ok';
				break;


			// Posts
			case 'get_posts':
				$response['data'] = $DataService -> get('Posts', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_posts':
				$response['data'] = $DataService -> create('Posts', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_posts':
				$response['data'] = $DataService -> toggle('Posts', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_posts':
				$response['data'] = $DataService -> update('Posts', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_posts':
				$response['data'] = $DataService -> delete('Posts', $requestData);
				$response['status'] = 'ok';
				break;


			// Tags
			case 'get_tags':
				$response['data'] = $DataService -> get('Tags', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_tags':
				$response['data'] = $DataService -> create('Tags', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_tags':
				$response['data'] = $DataService -> toggle('Tags', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_tags':
				$response['data'] = $DataService -> update('Tags', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_tags':
				$response['data'] = $DataService -> delete('Tags', $requestData);
				$response['status'] = 'ok';
				break;




			// ...
			default:
				$response['message'] = 'Wrong response';
				break;

		}

		return $response;
	}

}
