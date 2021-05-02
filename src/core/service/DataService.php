<?php


namespace core\service;


use core\model\Categories;
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
use core\model\Tags;
use mysqli;


class DataService {

	// model

	public function get ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Settings = new Settings;
		$Profile = new Profile;
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		switch ($model) {

			case 'Settings':
				$response = $Settings -> get($conn);
				break;

			case 'Profile':
				$response = $Profile -> get($conn, $data);
				break;

			case 'Users':
				$response = $Users -> get($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> get($conn, $data);
				break;

			case 'Tags':
				$response = $Tags -> get($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> get($conn, $data);
				break;

			case 'Requests':
				$response = $Requests -> get($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> get($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> get($conn, $data);
				break;

			case 'Uploads':
				$response = $Uploads -> get($conn, $data);
				break;

			case 'Menu':
				$response = $Menu -> get($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> get($conn, $data);
				break;

		}

		$conn -> close();

		return $response;
	}

	public function create ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		switch ($model) {

			case 'Users':
				$response = $Users -> create($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> create($conn, $data);
				break;

			case 'Tags':
				$response = $Tags -> create($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> create($conn, $data);
				break;

			case 'Requests':
				$response = $Requests -> create($conn, $data);
				break;

			case 'Messages':
				$response = $Messages -> create($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> create($conn, $data);
				break;

			case 'Uploads':
				$response = $Uploads -> create($conn, $data);
				break;

			case 'Menu':
				$response = $Menu -> create($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> create($conn, $data);
				break;

		}

		$conn -> close();

		return $response;
	}

	public function update ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Settings = new Settings;
		$Profile = new Profile;
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;
		$Translations = new Translations;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

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
				$response = $Posts -> update($conn, $data);
				break;

			case 'Tags':
				$response = $Tags -> update($conn, $data);
				break;

			case 'Translations':
				$response = $Translations -> update($conn, $data);
				break;

			case 'Categories':
				$response = $Categories -> update($conn, $data);
				break;

			case 'Uploads':
				$response = $Uploads -> update($conn, $data);
				break;

			case 'Menu':
				$response = $Menu -> update($conn, $data);
				break;

			case 'MenuItems':
				$response = $MenuItems -> update($conn, $data);
				break;

		}

		$conn -> close();

		return $response;
	}

	public function toggle ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;
		$Translations = new Translations;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		switch ($model) {

			case 'Users':
				$response = $Users -> toggle($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> toggle($conn, $data);
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

		}

		$conn -> close();

		return $response;
	}

	public function delete ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;
		$Translations = new Translations;
		$Requests = new Requests;
		$Messages = new Messages;
		$Categories = new Categories;
		$Uploads = new Uploads;
		$Menu = new Menu;
		$MenuItems = new MenuItems;

		switch ($model) {

			case 'Users':
				$response = $Users -> delete($conn, $data);
				break;

			case 'Posts':
				$response = $Posts -> delete($conn, $data);
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

	public function user_logout ($data) {
		$conn = new mysqli(...CFG_DB_CONN);

		$Profile = new Profile;

		$response = $Profile -> logout($conn, $data);

		$conn -> close();

		return $response;
	}

	public function user_lost_password ($data) {
		$conn = new mysqli(...CFG_DB_CONN);

		$Profile = new Profile;

		$response = $Profile -> lost_password($conn, $data);

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



}
