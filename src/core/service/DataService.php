<?php


namespace core\service;


use core\model\Users;
use core\model\Posts;


class DataService {


	public function get ($model, $params) {
		$Users = new Users;
		$Posts = new Posts;

		switch ($model) {

			case 'Users':
				return $Users -> get($params);

			case 'Posts':
				return $Posts -> get($params);



			default:
				return null;

		}

	}


}
