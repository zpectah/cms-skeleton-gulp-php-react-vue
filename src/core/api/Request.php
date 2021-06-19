<?php


namespace core\api;


use core\service\DataService;
use core\service\SessionService;


class Request {

	private function isAuthorized () {
		$SessionService = new SessionService;

		$token = $SessionService -> get_token();
		$request_token = $_SERVER['HTTP_X_APP_TOKEN'];

		return $token == $request_token;
	}

	public function getResponse () {
		$DataService = new DataService;

		$authorized = self::isAuthorized();
		$unauthorizedResponse = [
			'message' => 'No request token',
			'status' => 'error',
			'data' => null,
		];
		$urlTrimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
		$url = explode( "/", $urlTrimmed );

		$requestData = json_decode(file_get_contents('php://input'));

		if ( $url[1] ) switch ($url[1]) {

			// Settings
			case 'get_settings':
				if ($authorized) {
					$response['data'] = $DataService -> get('Settings');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_settings':
				if ($authorized) {
					$response['data'] = $DataService -> update('Settings', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Profile
			case 'get_profile':
				if ($authorized) {
					$response['data'] = $DataService -> get('Profile');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_profile':
				if ($authorized) {
					$response['data'] = $DataService -> update('Profile', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'user_login':
				$response['data'] = $DataService -> user_login($requestData);
				$response['status'] = 'ok';
				return $response;

			case 'user_logout':
				$response['data'] = $DataService -> user_logout();
				$response['status'] = 'ok';
				return $response;

			case 'user_lost_password':
				$response['data'] = $DataService -> user_lost_password($requestData);
				$response['status'] = 'ok';
				return $response;

			case 'user_lost_password_reset':
				$response['data'] = $DataService -> user_lost_password_reset($requestData);
				$response['status'] = 'ok';
				return $response;


			// Users
			case 'get_users':
				if ($authorized) {
					$response['data'] = $DataService -> get('Users', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_users':
				if ($authorized) {
					$response['data'] = $DataService -> create('Users', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_users':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Users', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_users':
				if ($authorized) {
					$response['data'] = $DataService -> update('Users', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_users':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Users', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Posts
			case 'get_posts':
				if ($authorized) {
					$response['data'] = $DataService -> get('Posts');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_posts':
				if ($authorized) {
					$response['data'] = $DataService -> create('Posts', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_posts':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Posts', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_posts':
				if ($authorized) {
					$response['data'] = $DataService -> update('Posts', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_posts':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Posts', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Pages
			case 'get_pages':
				if ($authorized) {
					$response['data'] = $DataService -> get('Pages');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_pages':
				if ($authorized) {
					$response['data'] = $DataService -> create('Pages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_pages':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Pages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_pages':
				if ($authorized) {
					$response['data'] = $DataService -> update('Pages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_pages':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Pages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Tags
			case 'get_tags':
				if ($authorized) {
					$response['data'] = $DataService -> get('Tags');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_tags':
				if ($authorized) {
					$response['data'] = $DataService -> create('Tags', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_tags':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Tags', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_tags':
				if ($authorized) {
					$response['data'] = $DataService -> update('Tags', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_tags':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Tags', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Translations
			case 'get_translations':
				if ($authorized) {
					$response['data'] = $DataService -> get('Translations');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_translations':
				if ($authorized) {
					$response['data'] = $DataService -> create('Translations', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_translations':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Translations', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_translations':
				if ($authorized) {
					$response['data'] = $DataService -> update('Translations', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_translations':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Translations', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Requests
			case 'get_requests':
				if ($authorized) {
					$response['data'] = $DataService -> get('Requests', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_requests':
				if ($authorized) {
					$response['data'] = $DataService -> create('Requests', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_requests':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Requests', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Messages
			case 'get_messages':
				if ($authorized) {
					$response['data'] = $DataService -> get('Messages');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_messages':
				if ($authorized) {
					$response['data'] = $DataService -> create('Messages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_messages':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Messages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_messages':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Messages', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Categories
			case 'get_categories':
				if ($authorized) {
					$response['data'] = $DataService -> get('Categories');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_categories':
				if ($authorized) {
					$response['data'] = $DataService -> create('Categories', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_categories':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Categories', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_categories':
				if ($authorized) {
					$response['data'] = $DataService -> update('Categories', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_categories':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Categories', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Uploads
			case 'get_uploads':
				if ($authorized) {
					$response['data'] = $DataService -> get('Uploads');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_uploads':
				if ($authorized) {
					$response['data'] = $DataService -> create('Uploads', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_uploads':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Uploads', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_uploads':
				if ($authorized) {
					$response['data'] = $DataService -> update('Uploads', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_uploads':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Uploads', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Menu
			case 'get_menu':
				if ($authorized) {
					$response['data'] = $DataService -> get('Menu');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_menu':
				if ($authorized) {
					$response['data'] = $DataService -> create('Menu', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_menu':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Menu', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_menu':
				if ($authorized) {
					$response['data'] = $DataService -> update('Menu', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_menu':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Menu', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// MenuItems
			case 'get_menuItems':
				if ($authorized) {
					$response['data'] = $DataService -> get('MenuItems');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_menuItems':
				if ($authorized) {
					$response['data'] = $DataService -> create('MenuItems', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_menuItems':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('MenuItems', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_menuItems':
				if ($authorized) {
					$response['data'] = $DataService -> update('MenuItems', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_menuItems':
				if ($authorized) {
					$response['data'] = $DataService -> delete('MenuItems', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Members
			case 'get_members':
				if ($authorized) {
					$response['data'] = $DataService -> get('Members', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_members':
				if ($authorized) {
					$response['data'] = $DataService -> create('Members', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_members':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Members', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_members':
				if ($authorized) {
					$response['data'] = $DataService -> update('Members', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_members':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Members', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Deliveries
			case 'get_deliveries':
				if ($authorized) {
					$response['data'] = $DataService -> get('Deliveries');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_deliveries':
				if ($authorized) {
					$response['data'] = $DataService -> create('Deliveries', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_deliveries':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Deliveries', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_deliveries':
				if ($authorized) {
					$response['data'] = $DataService -> update('Deliveries', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_deliveries':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Deliveries', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Distributors
			case 'get_distributors':
				if ($authorized) {
					$response['data'] = $DataService -> get('Distributors');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_distributors':
				if ($authorized) {
					$response['data'] = $DataService -> create('Distributors', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_distributors':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Distributors', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_distributors':
				if ($authorized) {
					$response['data'] = $DataService -> update('Distributors', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_distributors':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Distributors', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Payments
			case 'get_payments':
				if ($authorized) {
					$response['data'] = $DataService -> get('Payments');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_payments':
				if ($authorized) {
					$response['data'] = $DataService -> create('Payments', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_payments':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Payments', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_payments':
				if ($authorized) {
					$response['data'] = $DataService -> update('Payments', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_payments':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Payments', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Producers
			case 'get_producers':
				if ($authorized) {
					$response['data'] = $DataService -> get('Producers');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_producers':
				if ($authorized) {
					$response['data'] = $DataService -> create('Producers', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_producers':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Producers', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_producers':
				if ($authorized) {
					$response['data'] = $DataService -> update('Producers', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_producers':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Producers', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Products
			case 'get_products':
				if ($authorized) {
					$response['data'] = $DataService -> get('Products');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_products':
				if ($authorized) {
					$response['data'] = $DataService -> create('Products', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_products':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Products', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_products':
				if ($authorized) {
					$response['data'] = $DataService -> update('Products', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_products':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Products', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// ProductsOptions
			case 'get_productsOptions':
				if ($authorized) {
					$response['data'] = $DataService -> get('ProductsOptions');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_productsOptions':
				if ($authorized) {
					$response['data'] = $DataService -> create('ProductsOptions', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_productsOptions':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('ProductsOptions', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_productsOptions':
				if ($authorized) {
					$response['data'] = $DataService -> update('ProductsOptions', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_productsOptions':
				if ($authorized) {
					$response['data'] = $DataService -> delete('ProductsOptions', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Stores
			case 'get_stores':
				if ($authorized) {
					$response['data'] = $DataService -> get('Stores');
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'create_stores':
				if ($authorized) {
					$response['data'] = $DataService -> create('Stores', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'toggle_stores':
				if ($authorized) {
					$response['data'] = $DataService -> toggle('Stores', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'update_stores':
				if ($authorized) {
					$response['data'] = $DataService -> update('Stores', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'delete_stores':
				if ($authorized) {
					$response['data'] = $DataService -> delete('Stores', $requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// Installer
			case 'install_language':
				if ($authorized) {
					$response['data'] = $DataService -> install_language($requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}

			case 'install_module':
				if ($authorized) {
					$response['data'] = $DataService -> install_module($requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// SqlDumper
			case 'export_table_dump':
				return $DataService -> export_table_dump();

			case 'import_table_data':
				if ($authorized) {
					$response['data'] = $DataService -> import_table_data($requestData);
					$response['status'] = 'ok';
					return $response;
				} else {
					return $unauthorizedResponse;
				}


			// ...
			default:
				return [
					'message' => 'Wrong response',
					'status' => 'error',
					'data' => null,
				];

		}

	}

}
