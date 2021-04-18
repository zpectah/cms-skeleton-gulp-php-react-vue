<?php
header("Access-Control-Allow-Origin: *");
// header("Content-Type: multipart/form-data");
// header("Content-Type: application/json");

const PATH_PFX = '../';
require '../core/index.php';

$request = new core\api\Request;

print_r( json_encode( $request -> getResponse(), true ) );
