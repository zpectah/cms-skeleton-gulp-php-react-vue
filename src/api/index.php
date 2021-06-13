<?php
header("Access-Control-Allow-Headers: content-type, origin, accept, X-App-Token");
header("Content-Type: multipart/form-data");

const PATH_PFX = '../';
require '../core/index.php';

$request = new core\api\Request;

print_r( json_encode( $request -> getResponse(), JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
