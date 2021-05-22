<?php


namespace core\handler;


class Installer {

	public function install_module ($conn, $requestData) {
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
				// TODO
				// proceed table installation ...
				break;

			case 'Crm':
				$args = [
					'true',
					'module_crm_installed'
				];
				// TODO
				// proceed table installation ...
				break;

			case 'Market':
				$args = [
					'true',
					'module_market_installed'
				];
				// TODO
				// proceed table installation ...
				break;

		}

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else if ($args) {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response = [
				'rows' => $stmt -> affected_rows
			];
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
			$response = [
				'rows' => $stmt -> affected_rows,
				'installed' => $installed
			];
			$stmt -> close();
		}

		return $response;
	}

}
