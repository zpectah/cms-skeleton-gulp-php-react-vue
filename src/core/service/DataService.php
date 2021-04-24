<?php


namespace core\service;


use core\model\Profile;
use core\model\Settings;
use core\model\Users;
use core\model\Posts;
use core\model\Tags;


class DataService {

	public function get ($model, $data) {
		$Settings = new Settings;
		$Profile = new Profile;
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

		switch ($model) {

			case 'Settings':
				return $Settings -> get();

			case 'Profile':
				return $Profile -> get($data);

			case 'Users':
				return $Users -> get($data);

			case 'Posts':
				return $Posts -> get($data);

			case 'Tags':
				return $Tags -> get($data);



			default:
				return null;

		}

	}

	public function create ($model, $data) {
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

		switch ($model) {

			case 'Users':
				return $Users -> create($data);

			case 'Posts':
				return $Posts -> create($data);

			case 'Tags':
				return $Tags -> create($data);



			default:
				return null;

		}

	}

	public function update ($model, $data) {
		$Settings = new Settings;
		$Profile = new Profile;
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

		switch ($model) {

			case 'Settings':
				return $Settings -> update($data);

			case 'Users':
				return $Users -> update($data);

			case 'Profile':
				return $Profile -> update($data);

			case 'Posts':
				return $Posts -> update($data);

			case 'Tags':
				return $Tags -> update($data);



			default:
				return null;

		}

	}

	public function toggle ($model, $data) {
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

		switch ($model) {

			case 'Users':
				return $Users -> toggle($data);

			case 'Posts':
				return $Posts -> toggle($data);

			case 'Tags':
				return $Tags -> toggle($data);



			default:
				return null;

		}

	}

	public function delete ($model, $data) {
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

		switch ($model) {

			case 'Users':
				return $Users -> delete($data);

			case 'Posts':
				return $Posts -> delete($data);

			case 'Tags':
				return $Tags -> delete($data);



			default:
				return null;

		}

	}


}
