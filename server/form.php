<?php

	$formData = $_REQUEST;
	$response = array(
		'message' => 'Thank you fo your message',
		'success' => true
	);

	//var_dump( $formData );

	if( !$formData['name'] ) {
		$response['message'] = 'Please enter your name';
		$response['success'] = false;
	}
	else if( !$formData['email'] ) {
		$response['message'] = 'Please type in your email';
		$response['success'] = false;
	}
	else if( !$formData['message'] ) {
		$response['message'] = 'Please write a short info text';
		$response['success'] = false;
	}
	else {

		// form input successfully checked

		$message = $formData['name'] . '<br/><br/>';
		$message .= $formData['email'] . '<br/><br/>';
		$message .= $formData['message'];

		$headers = "From: " . strip_tags( $formData['email'] ) . "\r\n";
		$headers .= "Reply-To: ". strip_tags( $formData['email'] ) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		if( @mail('info@tommykrueger.com', 'Donate message from ExoPlanetSystems', $message, $headers) ) {

			$response['message'] = 'Your message has been sent. Thanks.';
			$response['success'] = true;
		}
		else {
			$response['message'] = 'Your message could not be sent.';
			$response['success'] = false;
		}

	}

	echo json_encode( $response );

?>