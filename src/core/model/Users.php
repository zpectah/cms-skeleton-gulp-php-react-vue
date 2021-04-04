<?php


namespace core\model;


class Users {

	public function get ($params = []) {
		return [
			[
				'id' => 1,
				'name' => 'Item name 1',
				'description' => '',
				'tags' => [ 'tag1', 'tag36' ],
				'category' => [ 'category2', 'category6' ],
				'active' => true
			],
			[
				'id' => 2,
				'name' => 'Item name 2',
				'description' => '',
				'tags' => [ 'tag5', 'tag12' ],
				'category' => [ 'category1', 'category10' ],
				'active' => true
			],
			[
				'id' => 3,
				'name' => 'Item name 3',
				'description' => '',
				'tags' => [ 'tag2', 'tag4' ],
				'category' => [ 'category2' ],
				'active' => true
			],
			[
				'id' => 4,
				'name' => 'Item name 4',
				'description' => '',
				'tags' => [ 'tag1', 'tag5', 'tag7' ],
				'category' => [ 'category6' ],
				'active' => true
			],
			[
				'id' => 5,
				'name' => 'Item name 5',
				'description' => '',
				'tags' => [ 'tag36' ],
				'category' => [ 'category1', 'category8' ],
				'active' => true
			],
			[
				'id' => 6,
				'name' => 'Item name 6',
				'description' => '',
				'tags' => [ 'tag1', 'tag36' ],
				'category' => [ 'category2', 'category6' ],
				'active' => true
			],
			[
				'id' => 7,
				'name' => 'Item name 7',
				'description' => '',
				'tags' => [ 'tag5', 'tag12' ],
				'category' => [ 'category1', 'category10' ],
				'active' => true
			],
			[
				'id' => 8,
				'name' => 'Item name 8',
				'description' => '',
				'tags' => [ 'tag2', 'tag4' ],
				'category' => [ 'category2' ],
				'active' => true
			],
			[
				'id' => 9,
				'name' => 'Item name 9',
				'description' => '',
				'tags' => [ 'tag1', 'tag5', 'tag7' ],
				'category' => [ 'category6' ],
				'active' => true
			],
			[
				'id' => 10,
				'name' => 'Item name 10',
				'description' => '',
				'tags' => [ 'tag36' ],
				'category' => [ 'category1', 'category8' ],
				'active' => true
			]
		];
	}

}
