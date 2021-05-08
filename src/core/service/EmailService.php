<?php


namespace core\service;


class EmailService {

	public function sendEmailMessage ($context, $to, $subject, $headers, $content) {

		$message_headers = "MIME-Version: 1.0" . "\r\n";
		$message_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$message_headers .= 'From: <webmaster@example.com>' . "\r\n";
		$message_headers .= $headers;

		// TODO: layout(frame) type as variable -> $context
		$message_content = "<html style='width:100%;height:100%;margin:0;padding:0;font-size:16px;'><head><title>" . $subject . "</title></head><body style='width:100%;height:100%;font-size:1rem;font-weight:normal;color:rgb(25,25,25);background-color:rgb(250,250,250);'>";
		$message_content .= "<div style='width:100%;padding:3rem 2rem;text-align:center;'><div>";
		$message_content .= $content; // custom content
		$message_content .= "</div></div>";
		$message_content .= "</body></html>";

//		return [
//			'to' => $to,
//			'subject' => $subject,
//			'headers' => $message_headers,
//			'content' => $message_content
//		];

		return mail($to, $subject, $message_content, $message_headers);
	}

}
