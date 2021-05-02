<?php


namespace core\service;


class EmailService {

	public function sendEmail ($to, $headers, $content) {

		return [
			'to' => $to,
			'headers' => $headers,
			'content' => $content
		];
	}

}
