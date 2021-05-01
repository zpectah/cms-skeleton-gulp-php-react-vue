<?php
header("Access-Control-Allow-Origin: *");
// header("Content-Type: multipart/form-data");
// header("Content-Type: application/json");
// header("Pragma: cache");
// header("Cache-Control: max-age=1200");

const PATH_PFX = '../';
require '../core/index.php';

$request = new core\api\Request;

print_r( json_encode( $request -> getResponse(), JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
