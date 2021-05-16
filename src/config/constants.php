<?php

require_once PATH_PFX . 'config/database.php';
require_once PATH_PFX . 'config/env.php'; // (!) Created after build (dev/prod)

$JSON_GLOBAL = json_decode(file_get_contents(PATH_PFX . 'config/global.json'), true);
$JSON_ENV = json_decode(file_get_contents(PATH_PFX . 'config/environmental.json'), true);
$JSON_OPTIONS = json_decode(file_get_contents(PATH_PFX . 'config/options.json'), true);
$JSON_NUMS = json_decode(file_get_contents(PATH_PFX . 'config/nums.json'), true);



/*
 * Common system definitions
 */
const PASS_CRYPT =                                        PASSWORD_ARGON2I;
const PASS_CRYPT_OPTIONS = [
	'memory_cost' => 2048,
	'time_cost' => 4,
	'threads' => 3
];
define( "CMS_NAME",                                       $JSON_GLOBAL['CMS']['META']['name']);



/*
 * Environmental constants
 */
const ENV =                                               BUILD['env'];
const TIMESTAMP =                                         BUILD['timestamp'];



/*
 * Config objects
 */
define( "CFG_ENV",                                        $JSON_ENV[ ENV ] );
define( "CFG_DB",                                         $DB[ ENV ]['SQL'] );
const CFG_DB_CONN =                                       [CFG_DB['server'], CFG_DB['user'], CFG_DB['password'], CFG_DB['name'], CFG_DB['port']];



/*
 * Path
 */
const PATH_BASE =                                         '../';
define( "PATH_UPLOADS",                                   PATH_PFX . $JSON_GLOBAL['PATH']['uploads'] );
define( "PATH_LOGS",                                      PATH_PFX . $JSON_GLOBAL['PATH']['logs'] );
define( "PATH_TMP",                                       PATH_PFX . $JSON_GLOBAL['PATH']['tmp'] );
define( "PATH_CACHE",                                     PATH_PFX . $JSON_GLOBAL['PATH']['cache'] );
define( "PATH_PREFIX_LOST_PASSWORD",                      $JSON_GLOBAL['LOCATION']['admin_lostPasswordToken_prefix'] );



/*
 * LOCATION
 */
define( "LOC_ADMIN_LOGIN",                                $JSON_GLOBAL['LOCATION']['admin_login'] );
define( "LOC_ADMIN_LOST_PASSWORD",                        $JSON_GLOBAL['LOCATION']['admin_lostPassword'] );



/*
 * Uploads
 */
define( "OPTIONS_UPLOADS",                                $JSON_OPTIONS['uploads'] );
define( "UPLOADS_IMAGE_FORMATS",                          $JSON_OPTIONS['uploads']['image']['format'] );



/*
 * Index endpoints defaults
 */
define( "VIEW", [
	'ADMIN' => [
		'url' =>                                              CFG_ENV['ROOT_PATH'] . $JSON_GLOBAL['path']['admin'],
		'styles' =>                                           CFG_ENV['ADMIN']['STYLES'],
		'scripts' =>                                          CFG_ENV['ADMIN']['SCRIPTS'],
		'meta' => [
			'title' =>                                          $JSON_GLOBAL['CMS']['META']['name'],
			'description' =>                                    $JSON_GLOBAL['CMS']['META']['description'],
			'keywords' =>                                       $JSON_GLOBAL['CMS']['META']['keywords'],
			'robots' =>                                         $JSON_GLOBAL['CMS']['META']['robots'],
			'lang' =>                                           $JSON_GLOBAL['CMS']['META']['lang'],
			'author' =>                                         $JSON_GLOBAL['CMS']['META']['author'],
		],
		"using_external_css" =>                               $JSON_GLOBAL['CMS']['USING_EXTERNAL_CSS'],
	],
	'WEB' => [
		'url' =>                                              CFG_ENV['ROOT_PATH'] . $JSON_GLOBAL['path']['web'],
		'styles' =>                                           CFG_ENV['WEB']['STYLES'],
		'scripts' =>                                          CFG_ENV['WEB']['SCRIPTS'],
		'meta' => [
			'title' =>                                          $JSON_GLOBAL['PROJECT']['META']['name'],
			'description' =>                                    $JSON_GLOBAL['PROJECT']['META']['description'],
			'keywords' =>                                       $JSON_GLOBAL['PROJECT']['META']['keywords'],
			'robots' =>                                         $JSON_GLOBAL['PROJECT']['META']['robots'],
			'lang' =>                                           $JSON_GLOBAL['PROJECT']['META']['lang'],
			'author' =>                                         $JSON_GLOBAL['PROJECT']['META']['author'],
		],
	],
	'Api' => [
		'url' =>                                              CFG_ENV['ROOT_PATH'] . $JSON_GLOBAL['path']['api'],
	]
] );
