<?php


namespace core\service;


use mysqli;

use core\model\Profile;
use core\model\Settings;
use core\model\Users;
use core\model\Posts;
use core\model\Tags;


class DataService {

	public function get ($model, $data) {
		$conn = new mysqli(...CFG_DB_CONN);
		$response = null;

		$Settings = new Settings;
		$Profile = new Profile;
		$Users = new Users;
		$Posts = new Posts;
		$Tags = new Tags;

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

		}

		$conn -> close();

		return $response;
	}


}
