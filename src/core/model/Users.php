<?php


namespace core\model;


class Users {

	public function get ($requestData) {

		// demo data
		return [
			[
				'id' => 1,
				'name' => 'Item name 1',
				'nickname' => 'Nickname 1',
				'name_first' => 'First name',
				'name_surname' => 'Surname',
				'email' => 'email1@email.zap',
				'password' => '4fg6h5d4f6gh54df65g4h6df5g4h6d5f4gh65dfg4h654dfg654dh',
				'active' => 1
			],
			[
				'id' => 2,
				'name' => 'Item name 2',
				'nickname' => 'Nickname 2',
				'name_first' => 'First name',
				'name_surname' => 'Surname',
				'email' => 'email2@email.zap',
				'password' => '4fg6h5d4f6gh54df65g4h6df5g4h6d5f4gh65dfg4h654dfg654dh',
				'active' => 0
			],
			[
				'id' => 3,
				'name' => 'Item name 3',
				'nickname' => 'Nickname 3',
				'name_first' => 'First name',
				'name_surname' => 'Surname',
				'email' => 'email3@email.zap',
				'password' => '4fg6h5d4f6gh54df65g4h6df5g4h6d5f4gh65dfg4h654dfg654dh',
				'active' => 1
			],
			[
				'id' => 4,
				'name' => 'Item name 4',
				'nickname' => 'Nickname 4',
				'name_first' => 'First name',
				'name_surname' => 'Surname',
				'email' => 'email4@email.zap',
				'password' => '4fg6h5d4f6gh54df65g4h6df5g4h6d5f4gh65dfg4h654dfg654dh',
				'active' => 1
			],
			[
				'id' => 5,
				'name' => 'Item name 5',
				'nickname' => 'Nickname 5',
				'name_first' => 'First name',
				'name_surname' => 'Surname',
				'email' => 'email5@email.zap',
				'password' => '4fg6h5d4f6gh54df65g4h6df5g4h6d5f4gh65dfg4h654dfg654dh',
				'active' => 1
			]
		];
	}

	public function create ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function update ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function toggle ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function delete ($requestData) {

		return [
			'r' => $requestData
		];
	}

}
