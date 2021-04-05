<?php


namespace core\service;


use core\model\Settings;
use core\model\Users;
use core\model\Posts;


class DataService {


	public function get ($model, $params) {
		$Users = new Users;
		$Posts = new Posts;
		$Settings = new Settings;

		switch ($model) {

			case 'Users':
				return $Users -> get($params);

			case 'Posts':
				return $Posts -> get($params);

			case 'Settings':
				return $Settings -> get($params);



			default:
				return null;

		}

	}


}
