<?php


namespace core\handler;


class Installer {

	private function create_language_tables () {}

	private function create_table ($conn, $query, $key) {
		$response = null;

		// execute only
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param('', ...[]);
			$stmt -> execute();
			$response[$key] = $stmt -> affected_rows;
			$stmt -> close();
		}

		return $response;
	}

	private function install_members_tables ($conn) {
		$response = null;

		$query = ('CREATE TABLE `members` (
				`id` int(11) NOT NULL AUTO_INCREMENT,
				`email` text NOT NULL,
				`password` text NOT NULL,
				`nickname` text NOT NULL,
				`first_name` text NOT NULL,
				`middle_name` text NOT NULL,
				`last_name` text NOT NULL,
				`member_group` text NOT NULL,
				`member_country` text NOT NULL,
				`member_city` text NOT NULL,
				`member_address` text NOT NULL,
				`member_zip` text NOT NULL,
				`member_phone` text NOT NULL,
				`member_email` text NOT NULL,
				`description` text NOT NULL,
				`img_avatar` longtext NOT NULL,
				`active` int(11) NOT NULL,
				`deleted` int(11) NOT NULL,
				PRIMARY KEY (`id`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');

		$response[] = self::create_table($conn, $query, 'members');

		return $response;
	}

	private function install_market_tables ($conn, $languages) {
		$response = null;
		$active_languages = $languages['active'];

		$query_Deliveries = ('CREATE TABLE `deliveries` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`item_price` float NOT NULL,
			`item_weight_limit` float NOT NULL,
			`img_main` text NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_Distributors = ('CREATE TABLE `distributors` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`img_main` text NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_Payments = ('CREATE TABLE `payments` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`item_price` float NOT NULL,
			`item_weight_limit` float NOT NULL,
			`img_main` text NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_Producers = ('CREATE TABLE `producers` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`img_main` text NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_Products = ('CREATE TABLE `products` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`type` varchar(32) NOT NULL,
			`name` text NOT NULL,
			`category` text NOT NULL,
			`tags` text NOT NULL,
			`item_price` float NOT NULL,
			`item_discount` float NOT NULL,
			`item_amount` int(11) NOT NULL,
			`item_weight` float NOT NULL,
			`item_length` float NOT NULL,
			`item_width` float NOT NULL,
			`item_height` float NOT NULL,
			`items_related` text NOT NULL,
			`attachments` text NOT NULL,
			`img_main` text NOT NULL,
			`img_thumbnail` text NOT NULL,
			`products_options` text NOT NULL,
			`item_new` int(11) NOT NULL,
			`item_used` int(11) NOT NULL,
			`item_unboxed` int(11) NOT NULL,
			`rating` int(11) NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_ProductsOptions = ('CREATE TABLE `productsoptions` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`option_value` text NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');
		$query_Stores = ('CREATE TABLE `stores` (
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` text NOT NULL,
			`type` varchar(32) NOT NULL,
			`store_address` text NOT NULL,
			`store_city` text NOT NULL,
			`store_country` text NOT NULL,
			`store_zip` text NOT NULL,
			`store_location` text NOT NULL,
			`store_email` text NOT NULL,
			`store_phone` text NOT NULL,
			`img_main` text NOT NULL,
			`img_thumbnail` text NOT NULL,
			`rating` int(11) NOT NULL,
			`active` int(11) NOT NULL,
			`deleted` int(11) NOT NULL,
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8');

		$response['deliveries'] = self::create_table($conn, $query_Deliveries, 'deliveries');
		$response['distributors'] = self::create_table($conn, $query_Distributors, 'distributors');
		$response['payments'] = self::create_table($conn, $query_Payments, 'payments');
		$response['producers'] = self::create_table($conn, $query_Producers, 'producers');
		$response['products'] = self::create_table($conn, $query_Products, 'products');
		$response['productsoptions'] = self::create_table($conn, $query_ProductsOptions, 'productsoptions');
		$response['stores'] = self::create_table($conn, $query_Stores, 'stores');

		foreach ($active_languages as $lang) {

			$deliveries_tableName = 'deliveries__' . $lang;
			$payments_tableName = 'payments__' . $lang;
			$products_tableName = 'products__' . $lang;
			$productsOptions_tableName = 'productsoptions__' . $lang;
			$stores_tableName = 'stores__' . $lang;

			$query_Deliveries__lang = ('CREATE TABLE ' . $deliveries_tableName .' (
				`id` int(11) NOT NULL,
				`title` text NOT NULL,
				`description` text NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');
			$query_Payments__lang = ('CREATE TABLE ' . $payments_tableName .' (
				`id` int(11) NOT NULL,
				`title` text NOT NULL,
				`description` text NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');
			$query_Products__lang = ('CREATE TABLE ' . $products_tableName .' (
				`id` int(11) NOT NULL,
				`title` text NOT NULL,
				`description` text NOT NULL,
				`content` text NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');
			$query_ProductsOptions__lang = ('CREATE TABLE ' . $productsOptions_tableName .' (
				`id` int(11) NOT NULL,
				`title` text NOT NULL,
				`description` text NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');
			$query_Stores__lang = ('CREATE TABLE ' . $stores_tableName .' (
				`id` int(11) NOT NULL,
				`title` text NOT NULL,
				`description` text NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8');

			$response[$deliveries_tableName] = self::create_table($conn, $query_Deliveries__lang, $deliveries_tableName);
			$response[$payments_tableName] = self::create_table($conn, $query_Payments__lang, $payments_tableName);
			$response[$products_tableName] = self::create_table($conn, $query_Products__lang, $products_tableName);
			$response[$productsOptions_tableName] = self::create_table($conn, $query_ProductsOptions__lang, $productsOptions_tableName);
			$response[$stores_tableName] = self::create_table($conn, $query_Stores__lang, $stores_tableName);

		}

		return $response;
	}


	public function install_module ($conn, $requestData, $languages) {
		$response = null;
		$args = null;

		// prepare
		$query = ('UPDATE settings_cms SET value = ? WHERE name = ?');
		$types = 'ss';
		switch ($requestData -> module) {

			case 'Members':
				$args = [
					'true',
					'module_members_installed'
				];

				$response['module'] = self::install_members_tables($conn);
				break;

			case 'Market':
				$args = [
					'true',
					'module_market_installed'
				];
				$response['module'] = self::install_market_tables($conn, $languages);
				break;

		}

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else if ($args) {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response['rows'] = $stmt -> affected_rows;
			$stmt -> close();
		}

		return $response;
	}

	public function install_language ($conn, $requestData) {
		$response = null;
		$installed = [];

		/*
		1. iterate all languages and install tables
		2. save new languages to settings table
		*/

		foreach ($requestData -> toInstall as $lang) {

			// TODO
			// proceed table installation ...

			$installed[] = $lang;

		}

		// prepare
		$query = ('UPDATE settings_cms SET value = ? WHERE name = ?');
		$types = 'ss';
		$args = [
			implode(",", $requestData -> installed),
			'language_installed'
		];

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else if ($args) {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response['rows'] = $stmt -> affected_rows;
			$response['installed'] = $installed;
			$stmt -> close();
		}

		return $response;
	}

}
