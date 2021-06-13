<?php


namespace core\api;


use core\service\DataService;


class Request {

	public function getResponse () {
		$DataService = new DataService;

		$urlTrimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
		$url = explode( "/", $urlTrimmed );

		$requestData = json_decode(file_get_contents('php://input'));

		if ( $url[1] ) switch ($url[1]) {

			// Settings
			case 'get_settings':
				$response['data'] = $DataService -> get('Settings', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_settings':
				$response['data'] = $DataService -> update('Settings', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Profile
			case 'get_profile':
				$response['data'] = $DataService -> get('Profile', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_profile':
				$response['data'] = $DataService -> update('Profile', $requestData);
				$response['status'] = 'ok';
				return $response;

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
				$response['data'] = $DataService -> get('Users', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_users':
				$response['data'] = $DataService -> create('Users', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_users':
				$response['data'] = $DataService -> toggle('Users', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_users':
				$response['data'] = $DataService -> update('Users', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_users':
				$response['data'] = $DataService -> delete('Users', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Posts
			case 'get_posts':
				$response['data'] = $DataService -> get('Posts', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_posts':
				$response['data'] = $DataService -> create('Posts', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_posts':
				$response['data'] = $DataService -> toggle('Posts', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_posts':
				$response['data'] = $DataService -> update('Posts', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_posts':
				$response['data'] = $DataService -> delete('Posts', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Pages
			case 'get_pages':
				$response['data'] = $DataService -> get('Pages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_pages':
				$response['data'] = $DataService -> create('Pages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_pages':
				$response['data'] = $DataService -> toggle('Pages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_pages':
				$response['data'] = $DataService -> update('Pages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_pages':
				$response['data'] = $DataService -> delete('Pages', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Tags
			case 'get_tags':
				$response['data'] = $DataService -> get('Tags', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_tags':
				$response['data'] = $DataService -> create('Tags', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_tags':
				$response['data'] = $DataService -> toggle('Tags', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_tags':
				$response['data'] = $DataService -> update('Tags', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_tags':
				$response['data'] = $DataService -> delete('Tags', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Translations
			case 'get_translations':
				$response['data'] = $DataService -> get('Translations', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_translations':
				$response['data'] = $DataService -> create('Translations', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_translations':
				$response['data'] = $DataService -> toggle('Translations', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_translations':
				$response['data'] = $DataService -> update('Translations', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_translations':
				$response['data'] = $DataService -> delete('Translations', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Requests
			case 'get_requests':
				$response['data'] = $DataService -> get('Requests', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_requests':
				$response['data'] = $DataService -> create('Requests', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_requests':
				$response['data'] = $DataService -> delete('Requests', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Messages
			case 'get_messages':
				$response['data'] = $DataService -> get('Messages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_messages':
				$response['data'] = $DataService -> create('Messages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_messages':
				$response['data'] = $DataService -> delete('Messages', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_messages':
				$response['data'] = $DataService -> toggle('Messages', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Categories
			case 'get_categories':
				$response['data'] = $DataService -> get('Categories', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_categories':
				$response['data'] = $DataService -> create('Categories', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_categories':
				$response['data'] = $DataService -> toggle('Categories', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_categories':
				$response['data'] = $DataService -> update('Categories', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_categories':
				$response['data'] = $DataService -> delete('Categories', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Uploads
			case 'get_uploads':
				$response['data'] = $DataService -> get('Uploads', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_uploads':
				$response['data'] = $DataService -> create('Uploads', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_uploads':
				$response['data'] = $DataService -> toggle('Uploads', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_uploads':
				$response['data'] = $DataService -> update('Uploads', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_uploads':
				$response['data'] = $DataService -> delete('Uploads', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Menu
			case 'get_menu':
				$response['data'] = $DataService -> get('Menu', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_menu':
				$response['data'] = $DataService -> create('Menu', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_menu':
				$response['data'] = $DataService -> toggle('Menu', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_menu':
				$response['data'] = $DataService -> update('Menu', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_menu':
				$response['data'] = $DataService -> delete('Menu', $requestData);
				$response['status'] = 'ok';
				return $response;


			// MenuItems
			case 'get_menuItems':
				$response['data'] = $DataService -> get('MenuItems', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_menuItems':
				$response['data'] = $DataService -> create('MenuItems', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_menuItems':
				$response['data'] = $DataService -> toggle('MenuItems', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_menuItems':
				$response['data'] = $DataService -> update('MenuItems', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_menuItems':
				$response['data'] = $DataService -> delete('MenuItems', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Members
			case 'get_members':
				$response['data'] = $DataService -> get('Members', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_members':
				$response['data'] = $DataService -> create('Members', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_members':
				$response['data'] = $DataService -> toggle('Members', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_members':
				$response['data'] = $DataService -> update('Members', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_members':
				$response['data'] = $DataService -> delete('Members', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Deliveries
			case 'get_deliveries':
				$response['data'] = $DataService -> get('Deliveries', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_deliveries':
				$response['data'] = $DataService -> create('Deliveries', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_deliveries':
				$response['data'] = $DataService -> toggle('Deliveries', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_deliveries':
				$response['data'] = $DataService -> update('Deliveries', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_deliveries':
				$response['data'] = $DataService -> delete('Deliveries', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Distributors
			case 'get_distributors':
				$response['data'] = $DataService -> get('Distributors', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_distributors':
				$response['data'] = $DataService -> create('Distributors', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_distributors':
				$response['data'] = $DataService -> toggle('Distributors', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_distributors':
				$response['data'] = $DataService -> update('Distributors', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_distributors':
				$response['data'] = $DataService -> delete('Distributors', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Payments
			case 'get_payments':
				$response['data'] = $DataService -> get('Payments', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_payments':
				$response['data'] = $DataService -> create('Payments', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_payments':
				$response['data'] = $DataService -> toggle('Payments', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_payments':
				$response['data'] = $DataService -> update('Payments', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_payments':
				$response['data'] = $DataService -> delete('Payments', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Producers
			case 'get_producers':
				$response['data'] = $DataService -> get('Producers', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_producers':
				$response['data'] = $DataService -> create('Producers', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_producers':
				$response['data'] = $DataService -> toggle('Producers', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_producers':
				$response['data'] = $DataService -> update('Producers', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_producers':
				$response['data'] = $DataService -> delete('Producers', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Products
			case 'get_products':
				$response['data'] = $DataService -> get('Products', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_products':
				$response['data'] = $DataService -> create('Products', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_products':
				$response['data'] = $DataService -> toggle('Products', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_products':
				$response['data'] = $DataService -> update('Products', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_products':
				$response['data'] = $DataService -> delete('Products', $requestData);
				$response['status'] = 'ok';
				return $response;


			// ProductsOptions
			case 'get_productsOptions':
				$response['data'] = $DataService -> get('ProductsOptions', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_productsOptions':
				$response['data'] = $DataService -> create('ProductsOptions', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_productsOptions':
				$response['data'] = $DataService -> toggle('ProductsOptions', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_productsOptions':
				$response['data'] = $DataService -> update('ProductsOptions', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_productsOptions':
				$response['data'] = $DataService -> delete('ProductsOptions', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Stores
			case 'get_stores':
				$response['data'] = $DataService -> get('Stores', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'create_stores':
				$response['data'] = $DataService -> create('Stores', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'toggle_stores':
				$response['data'] = $DataService -> toggle('Stores', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'update_stores':
				$response['data'] = $DataService -> update('Stores', $requestData);
				$response['status'] = 'ok';
				return $response;

			case 'delete_stores':
				$response['data'] = $DataService -> delete('Stores', $requestData);
				$response['status'] = 'ok';
				return $response;


			// Installer
			case 'install_language':
				$response['data'] = $DataService -> install_language($requestData);
				$response['status'] = 'ok';
				return $response;

			case 'install_module':
				$response['data'] = $DataService -> install_module($requestData);
				$response['status'] = 'ok';
				return $response;


			// Handyman
			case 'repair_language_tables':
				$response['data'] = $DataService -> repair_language_tables($requestData);
				$response['status'] = 'ok';
				return $response;


			// SqlDumper
			case 'export_table_dump':
				return $DataService -> export_table_dump($requestData);

			case 'import_table_data':
				$response['data'] = $DataService -> import_table_data($requestData);
				$response['status'] = 'ok';
				return $response;


			// ...
			default:
				return [
					'message' => 'Wrong response',
					'status' => 'error',
					'data' => null,
				];

		}

		// return $response;
	}

}
