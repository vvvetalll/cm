<?php
// Usage: php install.php <site_dir>
define( 'WP_INSTALLING', true );
$_SERVER['HTTP_HOST'] = '127.0.0.1:8899';
require $argv[1] . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/upgrade.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';
$r = wp_install( 'CM Test', 'admin', 'admin@example.com', false, '', 'admin-pass-123' );
echo is_wp_error( $r ) ? $r->get_error_message() : "installed user_id={$r['user_id']}\n";
