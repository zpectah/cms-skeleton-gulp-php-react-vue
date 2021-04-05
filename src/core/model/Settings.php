<?php


namespace core\model;


class Settings {

	public function get ($params = []) {

		// demo data
		return [
			'settings.option.1' => 'value',
			'settings.option.2' => 'value',
			'settings.option.3' => 'value',
			'settings.option.4' => 'value',
			'settings.option.5' => 'value'
		];
	}

}
