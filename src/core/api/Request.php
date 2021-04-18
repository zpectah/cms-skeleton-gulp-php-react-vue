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
			'status' =>         'error',
			'data' =>           null,
		];

		if ( $url[1] ) switch ($url[1]) {

			case 'get_users':
				$response['data'] = $DataService -> get('Users', []);
				$response['status'] = 'ok';
				break;

			case 'get_posts':
				$response['data'] = $DataService -> get('Posts', []);
				$response['status'] = 'ok';
				break;

			case 'get_settings':
				$response['data'] = $DataService -> get('Settings', []);
				$response['status'] = 'ok';
				break;

			// Tags
			case 'get_tags':
				$response['data'] = $DataService -> get('Tags', []);
				$response['status'] = 'ok';
				break;

			case 'create_tags':
				$response['data'] = $DataService -> create('Tags', $requestData);
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
			//




			case 'update_settings':
				$response['data'] = $DataService -> update('Settings', $requestData);
				$response['status'] = 'ok';
				break;




			//
			default:
				$response['message'] = 'Wrong response';
				break;

		}

		return $response;
	}

}
