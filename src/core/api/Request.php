<?php


namespace core\api;


use core\service\DataService;


class Request {

	public function getResponse () {
		$DataService = new DataService;

		$urlTrimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
		$url = explode( "/", $urlTrimmed );

		$response = [
			'status' =>         'error',
			'data' =>           null,
		];

		$data = [
			'get' =>            $_GET,
			'post' =>           $_POST,
			'request' =>        $_REQUEST,
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

			case 'get_tags':
				$response['data'] = $DataService -> get('Tags', []);
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
