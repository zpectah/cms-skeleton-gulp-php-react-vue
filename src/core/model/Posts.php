<?php


namespace core\model;


class Posts {

//	public function __get ($conn, $requestData) {
//
//		// demo data
//		return [
//			[
//				'id' => 1,
//				'name' => 'Item name 1',
//				'tags' => [ 'tag1', 'tag36' ],
//				'category' => [ 'category2', 'category6' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 2,
//				'name' => 'Item name 2',
//				'tags' => [ 'tag5', 'tag12' ],
//				'category' => [ 'category1', 'category10' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 2',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 3,
//				'name' => 'Item name 3',
//				'tags' => [ 'tag2', 'tag4' ],
//				'category' => [ 'category2' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 3',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 4,
//				'name' => 'Item name 4',
//				'tags' => [ 'tag1', 'tag5', 'tag7' ],
//				'category' => [ 'category6' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 4',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 0
//			],
//			[
//				'id' => 5,
//				'name' => 'Item name 5',
//				'tags' => [ 'tag36' ],
//				'category' => [ 'category1', 'category8' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 5',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 6,
//				'name' => 'Item name 6',
//				'tags' => [ 'tag1', 'tag36' ],
//				'category' => [ 'category2', 'category6' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 6',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 0
//			],
//			[
//				'id' => 7,
//				'name' => 'Item name 7',
//				'tags' => [ 'tag5', 'tag12' ],
//				'category' => [ 'category1', 'category10' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 7',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 8,
//				'name' => 'Item name 8',
//				'tags' => [ 'tag2', 'tag4' ],
//				'category' => [ 'category2' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 8',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			],
//			[
//				'id' => 9,
//				'name' => 'Item name 9',
//				'tags' => [ 'tag1', 'tag5', 'tag7' ],
//				'category' => [ 'category6' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 9',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 0
//			],
//			[
//				'id' => 10,
//				'name' => 'Item name 10',
//				'tags' => [ 'tag36' ],
//				'category' => [ 'category1', 'category8' ],
//				'lang' => [
//					'en' => [
//						'title' => 'Item title 10',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					],
//					'cs' => [
//						'title' => 'Item title 1',
//						'perex' => "Tristique neque hur'q ut venenatis nisi posuere facilisis nulla fermentum vel accumsan felis dictum augue. In nec ut morbi cras tristique et pulvinar vestibulum metus eros luctus Dhak'tah luctus proin.",
//						'content' => "Dignissim non ultrices baktag amet eros sed felis ac dictum sed tortor adipiscing cubilia faucibus. Orci eu eu lacinia augue lacinia venenatis velit d'blok a at he' HImaH ac cubilia augue. Adipiscing nisi pulvinar pellentesque a dignissim cras amet lacinia ipsum dignissim ante primis pellentesque consectetur. Jak'tahla morbi baH proin lacinia eros morbi in velit bat'leth morbi eros tristique morbi lorem.",
//					]
//				],
//				'active' => 1
//			]
//		];
//	}

	private function get_language_rows($conn, $lang, $id) {
		$response = [];
		$table_name = 'posts__' . $lang;

		// prepare
		$query = ('SELECT * FROM ' . $table_name . ' WHERE iid = ?');
		$types = 'i';
		$args = [ $id ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response = $row;
			}
		}

		return $response;
	}

	public function get ($conn, $requestData, $languages) {
		$response = [];
		$active_languages = $languages['active'];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM posts WHERE deleted = ?');
		$types = 'i';
		$args = [ 0 ];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {

				// TODO
				$row['lang'] = [];

				foreach ($active_languages as $lang) {
					$row['lang'][$lang] = self::get_language_rows($conn, $lang, $row['id']);
				}

				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData, $languages) {

		return [
			'r' => $requestData
		];
	}

	public function update ($conn, $requestData, $languages) {

		return [
			'r' => $requestData
		];
	}

	public function toggle ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

	public function delete ($conn, $requestData) {

		return [
			'r' => $requestData
		];
	}

}
