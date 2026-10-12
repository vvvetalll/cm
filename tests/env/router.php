<?php
// php -S router for WordPress pretty permalinks.
$root = $_SERVER['DOCUMENT_ROOT'];
$path = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
$file = realpath( $root . $path );
if ( $file && is_file( $file ) && substr( $file, -4 ) !== '.php' ) { return false; }
if ( $file && is_file( $file ) ) { chdir( dirname( $file ) ); $_SERVER['SCRIPT_NAME'] = $path; $_SERVER['PHP_SELF'] = $path; require $file; return true; }
if ( $file && is_dir( $file ) && is_file( $file . '/index.php' ) ) { chdir( $file ); require $file . '/index.php'; return true; }
$_SERVER['SCRIPT_NAME'] = '/index.php'; $_SERVER['PHP_SELF'] = '/index.php';
chdir( $root ); require $root . '/index.php';
