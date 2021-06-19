<?php


namespace core\service;


// use core\handler\Handyman;
use core\handler\Installer;
use core\handler\SqlDumper;
use core\model\Categories;
use core\model\Market\Deliveries;
use core\model\Market\Distributors;
use core\model\Market\Payments;
use core\model\Market\Producers;
use core\model\Market\Products;
use core\model\Market\ProductsOptions;
use core\model\Market\Stores;
use core\model\Members\Members;
use core\model\Menu;
use core\model\MenuItems;
use core\model\Messages;
use core\model\Requests;
use core\model\Translations;
use core\model\Profile;
use core\model\Settings;
use core\model\Uploads;
use core\model\Users;
use core\model\Posts;
use core\model\Pages;
use core\model\Tags;
use mysqli;


class DataService {

	// model

	public function get ($model, $data = null) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		// module: App
		$Profile = new Profile;
		$Settings = new Settings;
		$Users = new Users;
		$Posts = new Posts;
		$Pages = new Pages;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		// module: Members
		$Members = new Members;

		// module: Market
		$Deliveries = new Deliveries;
		$Distributors = new Distributors;
		$Payments = new Payments;
		$Producers = new Producers;
		$Products = new Products;
		$ProductsOptions = new ProductsOptions;
		$Stores = new Stores;

		$languages = $Settings -> get_languages($conn);
		$modules = $Settings -> get_modules($conn);

		switch ($model) {

			case 'Settings':
				$response = $Settings -> get($conn);
				break;

			case 'Profile':
				$response = $Profile -> get($conn);
				break;

			case 'Users':
				$response = $Users -> get($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> get($conn, $languages);
				break;

			case 'Pages':
				$response = $Pages -> get($conn, $languages);
				break;

			case 'Tags':
				$response = $Tags -> get($conn);
				break;

			case 'Translations':
				$response = $Translations -> get($conn, $languages);
				break;

			case 'Requests':
				$response = $Requests -> get($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> get($conn);
				break;

			case 'Categories':
				$response = $Categories -> get($conn, $languages);
				break;

			case 'Uploads':
				$response = $Uploads -> get($conn, $languages);
				break;

			case 'Menu':
				$response = $Menu -> get($conn);
				break;

			case 'MenuItems':
				$response = $MenuItems -> get($conn, $languages);
				break;

			// module: Members
			case 'Members':
				if ($modules['module_members_installed'] == 'true') {
					$response = $Members -> get($conn, $data);
				} else {
					$response = [];
				}
				break;

			// module: Market
			case 'Deliveries':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Deliveries -> get($conn, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Distributors':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Distributors -> get($conn);
				} else {
					$response = [];
				}
				break;

			case 'Payments':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Payments -> get($conn, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Producers':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Producers -> get($conn);
				} else {
					$response = [];
				}
				break;

			case 'Products':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Products -> get($conn, $languages);
				} else {
					$response = [];
				}
				break;

			case 'ProductsOptions':
				if ($modules['module_market_installed'] == 'true') {
					$response = $ProductsOptions -> get($conn, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Stores':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Stores -> get($conn, $languages);
				} else {
					$response = [];
				}
				break;

		}

		$conn -> close();

		return $response;
	}

	public function create ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$logs = new LogService;

		// module: App
		$Profile = new Profile;
		$Settings = new Settings;
		$Users = new Users;
		$Posts = new Posts;
		$Pages = new Pages;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		// module: Members
		$Members = new Members;

		// module: Market
		$Deliveries = new Deliveries;
		$Distributors = new Distributors;
		$Payments = new Payments;
		$Producers = new Producers;
		$Products = new Products;
		$ProductsOptions = new ProductsOptions;
		$Stores = new Stores;


		$languages = $Settings -> get_languages($conn);
		$modules = $Settings -> get_modules($conn);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'create',
			$model
		);

		switch ($model) {

			case 'Users':
				$response = $Users -> create($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> create($conn, $data, $languages);
				break;

			case 'Pages':
				$response = $Pages -> create($conn, $data, $languages);
				break;

			case 'Tags':
				$response = $Tags -> create($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> create($conn, $data, $languages);
				break;

			case 'Requests':
				$response = $Requests -> create($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> create($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> create($conn, $data, $languages);
				break;

			case 'Uploads':
				$response = $Uploads -> create($conn, $data, $languages);
				break;

			case 'Menu':
				$response = $Menu -> create($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> create($conn, $data, $languages);
				break;

			// module: Members
			case 'Members':
				if ($modules['module_members_installed'] == 'true') {
					$response = $Members -> create($conn, $data);
				} else {
					$response = [];
				}
				break;

			// module: Market
			case 'Deliveries':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Deliveries -> create($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Distributors':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Distributors -> create($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Payments':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Payments -> create($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Producers':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Producers -> create($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Products':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Products -> create($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'ProductsOptions':
				if ($modules['module_market_installed'] == 'true') {
					$response = $ProductsOptions -> create($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Stores':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Stores -> create($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

		}

		$conn -> close();

		return $response;
	}

	public function update ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$logs = new LogService;

		// module: App
		$Profile = new Profile;
		$Settings = new Settings;
		$Users = new Users;
		$Posts = new Posts;
		$Pages = new Pages;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		// module: Members
		$Members = new Members;

		// module: Market
		$Deliveries = new Deliveries;
		$Distributors = new Distributors;
		$Payments = new Payments;
		$Producers = new Producers;
		$Products = new Products;
		$ProductsOptions = new ProductsOptions;
		$Stores = new Stores;

		$languages = $Settings -> get_languages($conn);
		$modules = $Settings -> get_modules($conn);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'update',
			$model . ' ' . $data -> id
		);

		switch ($model) {

			case 'Settings':
				$response = $Settings -> update($conn, $data);
				break;

			case 'Users':
				$response = $Users -> update($conn, $data);
				break;

			case 'Profile':
				$response = $Profile -> update($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> update($conn, $data, $languages);
				break;

			case 'Pages':
				$response = $Pages -> update($conn, $data, $languages);
				break;

			case 'Tags':
				$response = $Tags -> update($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> update($conn, $data, $languages);
				break;

			case 'Requests':
				$response = $Requests -> update($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> update($conn, $data, $languages);
				break;

			case 'Uploads':
				$response = $Uploads -> update($conn, $data, $languages);
				break;

			case 'Menu':
				$response = $Menu -> update($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> update($conn, $data, $languages);
				break;

			// module: Members
			case 'Members':
				if ($modules['module_members_installed'] == 'true') {
					$response = $Members -> update($conn, $data);
				} else {
					$response = [];
				}
				break;

			// module: Market
			case 'Deliveries':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Deliveries -> update($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Distributors':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Distributors -> update($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Payments':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Payments -> update($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Producers':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Producers -> update($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Products':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Products -> update($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'ProductsOptions':
				if ($modules['module_market_installed'] == 'true') {
					$response = $ProductsOptions -> update($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

			case 'Stores':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Stores -> update($conn, $data, $languages);
				} else {
					$response = [];
				}
				break;

		}

		$conn -> close();

		return $response;
	}

	public function toggle ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$logs = new LogService;

		// module: App
		$Profile = new Profile;
		$Settings = new Settings;
		$Users = new Users;
		$Posts = new Posts;
		$Pages = new Pages;
		$Tags = new Tags;
		$Translations = new Translations;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;
		$Messages = new Messages;

		// module: Members
		$Members = new Members;

		// module: Market
		$Deliveries = new Deliveries;
		$Distributors = new Distributors;
		$Payments = new Payments;
		$Producers = new Producers;
		$Products = new Products;
		$ProductsOptions = new ProductsOptions;
		$Stores = new Stores;

		$modules = $Settings -> get_modules($conn);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'toggle',
			$model
		);

		switch ($model) {

			case 'Users':
				$response = $Users -> toggle($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> toggle($conn, $data);
				break;

			case 'Pages':
				$response = $Pages -> toggle($conn, $data);
				break;

			case 'Tags':
				$response = $Tags -> toggle($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> toggle($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> toggle($conn, $data);
				break;

			case 'Uploads':
				$response = $Uploads -> toggle($conn, $data);
				break;

			case 'Menu':
				$response = $Menu -> toggle($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> toggle($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> toggle($conn, $data);
				break;

			// module: Members
			case 'Members':
				if ($modules['module_members_installed'] == 'true') {
					$response = $Members -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			// module: Market
			case 'Deliveries':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Deliveries -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Distributors':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Distributors -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Payments':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Payments -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Producers':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Producers -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Products':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Products -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'ProductsOptions':
				if ($modules['module_market_installed'] == 'true') {
					$response = $ProductsOptions -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Stores':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Stores -> toggle($conn, $data);
				} else {
					$response = [];
				}
				break;

		}

		$conn -> close();

		return $response;
	}

	public function delete ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$logs = new LogService;

		// module: App
		$Profile = new Profile;
		$Settings = new Settings;
		$Users = new Users;
		$Posts = new Posts;
		$Pages = new Pages;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		// module: Members
		$Members = new Members;

		// module: Market
		$Deliveries = new Deliveries;
		$Distributors = new Distributors;
		$Payments = new Payments;
		$Producers = new Producers;
		$Products = new Products;
		$ProductsOptions = new ProductsOptions;
		$Stores = new Stores;

		$modules = $Settings -> get_modules($conn);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'delete',
			$model
		);

		switch ($model) {

			case 'Users':
				$response = $Users -> delete($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> delete($conn, $data);
				break;

			case 'Pages':
				$response = $Pages -> delete($conn, $data);
				break;

			case 'Tags':
				$response = $Tags -> delete($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> delete($conn, $data);
				break;

			case 'Requests':
				$response = $Requests -> delete($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> delete($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> delete($conn, $data);
				break;

			case 'Uploads':
				$response = $Uploads -> delete($conn, $data);
				break;

			case 'Menu':
				$response = $Menu -> delete($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> delete($conn, $data);
				break;

			// module: Members
			case 'Members':
				if ($modules['module_members_installed'] == 'true') {
					$response = $Members -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			// module: Market
			case 'Deliveries':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Deliveries -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Distributors':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Distributors -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Payments':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Payments -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Producers':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Producers -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Products':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Products -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'ProductsOptions':
				if ($modules['module_market_installed'] == 'true') {
					$response = $ProductsOptions -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

			case 'Stores':
				if ($modules['module_market_installed'] == 'true') {
					$response = $Stores -> delete($conn, $data);
				} else {
					$response = [];
				}
				break;

		}

		$conn -> close();

		return $response;
	}

	//
	// system

	public function user_login ($data) {
		$conn = new mysqli(...CFG_DB_CONN);

		$Profile = new Profile;

		$response = $Profile -> login($conn, $data);

		$conn -> close();

		return $response;
	}

	public function user_logout () {
		$Profile = new Profile;

		return $Profile -> logout();
	}

	public function user_lost_password ($data) {
		$conn = new mysqli(...CFG_DB_CONN);

		$Profile = new Profile;
		$logs = new LogService;

		$response = $Profile -> lost_password($conn, $data);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'lost-password',
			'ok'
		);

		$conn -> close();

		return $response;
	}

	public function user_lost_password_reset ($data) {
		$conn = new mysqli(...CFG_DB_CONN);

		$Profile = new Profile;

		$response = $Profile -> lost_password_reset($conn, $data);

		$conn -> close();

		return $response;
	}

	//
	//

	public function install_language ($data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$Settings = new Settings;
		$Installer = new Installer;
		$Profile = new Profile;
		$logs = new LogService;

		$modules = $Settings -> get_modules($conn);
		$languages = $Settings -> get_languages($conn);

		$response = $Installer -> install_language($conn, $data, $modules, $languages);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'language-install',
			'ok'
		);

		$conn -> close();

		return $response;
	}

	public function install_module ($data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$Settings = new Settings;
		$Installer = new Installer;
		$Profile = new Profile;
		$logs = new LogService;

		$languages = $Settings -> get_languages($conn);

		$response = $Installer -> install_module($conn, $data, $languages);

		$logs -> create(
			$Profile -> get($conn)['id'],
			'module-install',
			'ok'
		);

		$conn -> close();

		return $response;
	}

	//
	//

	public function export_table_dump () {
		$conn = new mysqli(...CFG_DB_CONN);

		$SqlDumper = new SqlDumper;
		$Profile = new Profile;
		$logs = new LogService;

		$id = $Profile -> get($conn)['id'];

		$logs -> create(
			$id,
			'sql-export',
			'ok'
		);

		if ($id) {
			return $SqlDumper -> export_table_dump();
		} else {
			return null;
		}

	}

	public function import_table_data ($data) {
		$SqlDumper = new SqlDumper;

		$response = $SqlDumper -> import_table_data($data);

		return $response;
	}



}
