<?php


namespace core\service;


use core\model\Settings;
use core\model\Users;
use core\model\Posts;
use core\model\Tags;


class DataService {


	public function get ($model, $params) {
		$Users = new Users;
		$Posts = new Posts;
		$Settings = new Settings;
		$Tags = new Tags;

		switch ($model) {

			case 'Users':
				return $Users -> get($params);

			case 'Posts':
				return $Posts -> get($params);

			case 'Settings':
				return $Settings -> get($params);

			case 'Tags':
				return $Tags -> get($params);



			default:
				return null;

		}

	}

	public function create () {}

	public function update () {}

	public function delete () {}


}
