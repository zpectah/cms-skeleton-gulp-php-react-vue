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

			case 'install_language':
				$response['data'] = $DataService -> install_language($requestData);
				$response['status'] = 'ok';
				break;

			case 'install_module':
				$response['data'] = $DataService -> install_module($requestData);
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

			case 'user_login':
				$response['data'] = $DataService -> user_login($requestData);
				$response['status'] = 'ok';
				break;

			case 'user_logout':
				$response['data'] = $DataService -> user_logout();
				$response['status'] = 'ok';
				break;

			case 'user_lost_password':
				$response['data'] = $DataService -> user_lost_password($requestData);
				$response['status'] = 'ok';
				break;

			case 'user_lost_password_reset':
				$response['data'] = $DataService -> user_lost_password_reset($requestData);
				$response['status'] = 'ok';
				break;


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


			// Pages
			case 'get_pages':
				$response['data'] = $DataService -> get('Pages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_pages':
				$response['data'] = $DataService -> create('Pages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_pages':
				$response['data'] = $DataService -> toggle('Pages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_pages':
				$response['data'] = $DataService -> update('Pages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_pages':
				$response['data'] = $DataService -> delete('Pages', $requestData);
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


			// Translations
			case 'get_translations':
				$response['data'] = $DataService -> get('Translations', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_translations':
				$response['data'] = $DataService -> create('Translations', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_translations':
				$response['data'] = $DataService -> toggle('Translations', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_translations':
				$response['data'] = $DataService -> update('Translations', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_translations':
				$response['data'] = $DataService -> delete('Translations', $requestData);
				$response['status'] = 'ok';
				break;


			// Requests
			case 'get_requests':
				$response['data'] = $DataService -> get('Requests', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_requests':
				$response['data'] = $DataService -> create('Requests', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_requests':
				$response['data'] = $DataService -> delete('Requests', $requestData);
				$response['status'] = 'ok';
				break;


			// Messages
			case 'get_messages':
				$response['data'] = $DataService -> get('Messages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_messages':
				$response['data'] = $DataService -> create('Messages', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_messages':
				$response['data'] = $DataService -> delete('Messages', $requestData);
				$response['status'] = 'ok';
				break;

			// Categories
			case 'get_categories':
				$response['data'] = $DataService -> get('Categories', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_categories':
				$response['data'] = $DataService -> create('Categories', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_categories':
				$response['data'] = $DataService -> toggle('Categories', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_categories':
				$response['data'] = $DataService -> update('Categories', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_categories':
				$response['data'] = $DataService -> delete('Categories', $requestData);
				$response['status'] = 'ok';
				break;


			// Uploads
			case 'get_uploads':
				$response['data'] = $DataService -> get('Uploads', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_uploads':
				$response['data'] = $DataService -> create('Uploads', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_uploads':
				$response['data'] = $DataService -> toggle('Uploads', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_uploads':
				$response['data'] = $DataService -> update('Uploads', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_uploads':
				$response['data'] = $DataService -> delete('Uploads', $requestData);
				$response['status'] = 'ok';
				break;


			// Menu
			case 'get_menu':
				$response['data'] = $DataService -> get('Menu', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_menu':
				$response['data'] = $DataService -> create('Menu', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_menu':
				$response['data'] = $DataService -> toggle('Menu', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_menu':
				$response['data'] = $DataService -> update('Menu', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_menu':
				$response['data'] = $DataService -> delete('Menu', $requestData);
				$response['status'] = 'ok';
				break;


			// MenuItems
			case 'get_menuItems':
				$response['data'] = $DataService -> get('MenuItems', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_menuItems':
				$response['data'] = $DataService -> create('MenuItems', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_menuItems':
				$response['data'] = $DataService -> toggle('MenuItems', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_menuItems':
				$response['data'] = $DataService -> update('MenuItems', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_menuItems':
				$response['data'] = $DataService -> delete('MenuItems', $requestData);
				$response['status'] = 'ok';
				break;


			// Members
			case 'get_members':
				$response['data'] = $DataService -> get('Members', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_members':
				$response['data'] = $DataService -> create('Members', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_members':
				$response['data'] = $DataService -> toggle('Members', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_members':
				$response['data'] = $DataService -> update('Members', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_members':
				$response['data'] = $DataService -> delete('Members', $requestData);
				$response['status'] = 'ok';
				break;


			// Campaigns
			case 'get_campaigns':
				$response['data'] = $DataService -> get('Campaigns', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_campaigns':
				$response['data'] = $DataService -> create('Campaigns', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_campaigns':
				$response['data'] = $DataService -> toggle('Campaigns', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_campaigns':
				$response['data'] = $DataService -> update('Campaigns', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_campaigns':
				$response['data'] = $DataService -> delete('Campaigns', $requestData);
				$response['status'] = 'ok';
				break;


			// Deliveries
			case 'get_deliveries':
				$response['data'] = $DataService -> get('Deliveries', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_deliveries':
				$response['data'] = $DataService -> create('Deliveries', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_deliveries':
				$response['data'] = $DataService -> toggle('Deliveries', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_deliveries':
				$response['data'] = $DataService -> update('Deliveries', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_deliveries':
				$response['data'] = $DataService -> delete('Deliveries', $requestData);
				$response['status'] = 'ok';
				break;


			// Distributors
			case 'get_distributors':
				$response['data'] = $DataService -> get('Distributors', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_distributors':
				$response['data'] = $DataService -> create('Distributors', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_distributors':
				$response['data'] = $DataService -> toggle('Distributors', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_distributors':
				$response['data'] = $DataService -> update('Distributors', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_distributors':
				$response['data'] = $DataService -> delete('Distributors', $requestData);
				$response['status'] = 'ok';
				break;


			// Payments
			case 'get_payments':
				$response['data'] = $DataService -> get('Payments', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_payments':
				$response['data'] = $DataService -> create('Payments', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_payments':
				$response['data'] = $DataService -> toggle('Payments', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_payments':
				$response['data'] = $DataService -> update('Payments', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_payments':
				$response['data'] = $DataService -> delete('Payments', $requestData);
				$response['status'] = 'ok';
				break;


			// Producers
			case 'get_producers':
				$response['data'] = $DataService -> get('Producers', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_producers':
				$response['data'] = $DataService -> create('Producers', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_producers':
				$response['data'] = $DataService -> toggle('Producers', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_producers':
				$response['data'] = $DataService -> update('Producers', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_producers':
				$response['data'] = $DataService -> delete('Producers', $requestData);
				$response['status'] = 'ok';
				break;


			// Products
			case 'get_products':
				$response['data'] = $DataService -> get('Products', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_products':
				$response['data'] = $DataService -> create('Products', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_products':
				$response['data'] = $DataService -> toggle('Products', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_products':
				$response['data'] = $DataService -> update('Products', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_products':
				$response['data'] = $DataService -> delete('Products', $requestData);
				$response['status'] = 'ok';
				break;


			// Stores
			case 'get_stores':
				$response['data'] = $DataService -> get('Stores', $requestData);
				$response['status'] = 'ok';
				break;

			case 'create_stores':
				$response['data'] = $DataService -> create('Stores', $requestData);
				$response['status'] = 'ok';
				break;

			case 'toggle_stores':
				$response['data'] = $DataService -> toggle('Stores', $requestData);
				$response['status'] = 'ok';
				break;

			case 'update_stores':
				$response['data'] = $DataService -> update('Stores', $requestData);
				$response['status'] = 'ok';
				break;

			case 'delete_stores':
				$response['data'] = $DataService -> delete('Stores', $requestData);
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
