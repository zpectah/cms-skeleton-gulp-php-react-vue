<?php


namespace core\service;


class SessionService {

	public function start ($requestData) {

		return [
			'r' => $requestData
		];
	}

	public function close ($requestData) {

		return [
			'r' => $requestData
		];
	}

}
