<?php

define( "PATH_PFX", '../' );
require '../core/index.php';

$request = new core\api\Request;

print_r( json_encode( $request -> getResponse(), true ) );
