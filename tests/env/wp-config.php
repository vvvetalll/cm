<?php
define( 'DB_NAME', 'wp' );
define( 'DB_USER', '' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', '' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );
define( 'DB_DIR', __DIR__ . '/wp-content/database/' );
define( 'DB_FILE', '.ht.sqlite' );
define( 'AUTH_KEY', 'test-auth-key-local-only-1' );
define( 'SECURE_AUTH_KEY', 'test-secure-auth-key-local-2' );
define( 'LOGGED_IN_KEY', 'test-logged-in-key-local-3' );
define( 'NONCE_KEY', 'test-nonce-key-local-4' );
define( 'AUTH_SALT', 'test-auth-salt-local-5' );
define( 'SECURE_AUTH_SALT', 'test-secure-auth-salt-6' );
define( 'LOGGED_IN_SALT', 'test-logged-in-salt-7' );
define( 'NONCE_SALT', 'test-nonce-salt-local-8' );
$table_prefix = 'wp_';
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', __DIR__ . '/wp-content/debug.log' );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
define( 'WP_HOME', 'http://127.0.0.1:8899' );
define( 'WP_SITEURL', 'http://127.0.0.1:8899' );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_HTTP_BLOCK_EXTERNAL', true );
define( 'DISABLE_WP_CRON', true );
if ( ! defined( 'ABSPATH' ) ) { define( 'ABSPATH', __DIR__ . '/' ); }
require_once ABSPATH . 'wp-settings.php';
