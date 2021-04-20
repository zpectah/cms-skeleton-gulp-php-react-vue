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

			case 'Settings':
				return $Settings -> get();

			case 'Users':
				return $Users -> get($params);

			case 'Posts':
				return $Posts -> get($params);

			case 'Tags':
				return $Tags -> get($params);



			default:
				return null;

		}

	}

	public function create ($model, $data) {
		$Tags = new Tags;

		switch ($model) {

			case 'Tags':
				return $Tags -> create($data);



			default:
				return null;

		}

	}

	public function update ($model, $data) {
		$Settings = new Settings;
		$Tags = new Tags;

		switch ($model) {

			case 'Settings':
				return $Settings -> update($data);

			case 'Tags':
				return $Tags -> update($data);



			default:
				return null;

		}

	}

	public function toggle ($model, $data) {
		$Tags = new Tags;

		switch ($model) {

			case 'Tags':
				return $Tags -> toggle($data);



			default:
				return null;

		}

	}

	public function delete ($model, $data) {
		$Tags = new Tags;

		switch ($model) {

			case 'Tags':
				return $Tags -> delete($data);



			default:
				return null;

		}

	}


}
