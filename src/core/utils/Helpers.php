<?php


namespace core\utils;


class Helpers {

	public function createFolder ($directory, $permissions = 0777) {
		if (!file_exists($directory)) {
			$mask = umask(0);
			mkdir($directory, $permissions, true);
			umask($mask);
		}
	}

	public function getRandomString ($length = 10, $type = 'all') {
		$chars_nums = '0123456789';
		$chars_lower = 'abcdefghijklmnopqrstuvwxyz';
		$chars_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		switch ($type) {

			case 'nums':
				$chars = $chars_nums;
				break;

			case 'lower':
				$chars = $chars_lower;
				break;

			case 'upper':
				$chars = $chars_upper;
				break;

			case 'all':
			default:
				$chars = $chars_nums . $chars_lower . $chars_upper;
				break;

		}

		$charactersLength = strlen($chars);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $chars[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

	public function getToken ($length = 4, $separator = '-') {
		return self::getRandomString(($length/2), 'lower') . $separator . self::getRandomString($length, 'nums') . $separator . self::getRandomString(($length*2));
	}

	public function getClientIpAddress() {
		if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else{
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}

}
