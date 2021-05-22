<?php

$conn = new mysqli("localhost", "root", "root", "skeleton-cms", 3306);

// prepare
$query = ("SELECT * INTO OUTFILE ? FROM posts");
$types = "s";
$args = [
	"/sql_dump/test.sql",
];

// execute
if ($conn -> connect_error) {
	$response = $conn -> connect_error;
} else {
	$stmt = $conn -> prepare($query);
	$stmt -> bind_param($types, ...$args);
	$stmt -> execute();
	$response = [
		"rows" => $stmt -> affected_rows
	];
	$stmt -> close();
}

$conn -> close();

return $response;

?>
