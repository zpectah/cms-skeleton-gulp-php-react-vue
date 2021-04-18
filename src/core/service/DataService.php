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
				return $Settings -> get();

			case 'Tags':
				return $Tags -> get($params);



			default:
				return null;

		}

	}

	public function create ($model, $requestData) {
		$Tags = new Tags;

		switch ($model) {

			case 'Tags':
				return $Tags -> create($requestData);



			default:
				return null;

		}

	}

	public function update ($model, $requestData) {
		$Settings = new Settings;
		$Tags = new Tags;

		switch ($model) {

			case 'Settings':
				return $Settings -> update($requestData);

			case 'Tags':
				return $Tags -> update($requestData);



			default:
				return null;

		}

	}

	public function delete ($model, $requestData) {
		$Tags = new Tags;

		switch ($model) {

			case 'Tags':
				return $Tags -> delete($requestData);



			default:
				return null;

		}

	}


}
