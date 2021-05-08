<?php


namespace core\service;


class EmailService {

	public function sendMessage ($to, $from, $subject, $content, $headers = "") {
		$message_headers = "MIME-Version: 1.0" . "\r\n";
		$message_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$message_headers .= 'From: <' . $from . '>' . "\r\n";
		$message_headers .= $headers;

		$message_content = "<html style='width:100%;height:100%;margin:0;padding:0;font-size:16px;'><head><title>" . $subject . "</title></head><body style='width:100%;height:100%;font-size:1rem;font-weight:normal;color:rgb(25,25,25);background-color:white;'>";
		$message_content .= "<div style='width:100%;padding:1rem 1rem;text-align:center;'><div>";
		$message_content .= $content; // custom content
		$message_content .= "</div></div>";
		$message_content .= "</body></html>";

		return mail($to, $subject, $message_content, $message_headers);
	}

	public function sendStyledMessage ($to, $from, $subject, $content, $headers = "", $context = "default") {
		$message_headers = "MIME-Version: 1.0" . "\r\n";
		$message_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$message_headers .= 'From: <' . $from . '>' . "\r\n";
		$message_headers .= $headers;

		// TODO: layout(frame) type as variable -> $context
		$message_content = "<html style='width:100%;height:100%;margin:0;padding:0;font-size:16px;'><head><title>" . $subject . "</title></head><body style='width:100%;height:100%;font-size:1rem;font-weight:normal;color:rgb(25,25,25);background-color:rgb(250,250,250);'>";
		$message_content .= "<div style='width:100%;padding:3rem 2rem;text-align:center;'><h1 style='margin:0;padding:0 0 2rem 0;font-size:1.75rem;font-weight:normal;'>" . CMS_NAME . ": " . $subject . "</h1><div>";
		$message_content .= $content; // custom content
		$message_content .= "</div></div>";
		$message_content .= "</body></html>";

		return mail($to, $subject, $message_content, $message_headers);
	}

}
