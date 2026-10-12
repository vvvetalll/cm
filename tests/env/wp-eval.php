<?php
// TEST ONLY. Usage: php wp-eval.php <site_dir> <php-code> — runs code inside WordPress (used to reset fixtures).
$_SERVER['HTTP_HOST'] = '127.0.0.1:8899';
require $argv[1] . '/wp-load.php';
eval( $argv[2] );
