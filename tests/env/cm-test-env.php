<?php
/**
 * Plugin Name: CM ZIP Checker – local test environment helpers
 * Description: TEST SITE ONLY. Never install on staging or production.
 */

// No network in the test container: silence core/plugin/theme update checks.
remove_action( 'admin_init', '_maybe_update_core' );
remove_action( 'admin_init', '_maybe_update_plugins' );
remove_action( 'admin_init', '_maybe_update_themes' );
remove_action( 'wp_version_check', 'wp_version_check' );
add_filter( 'pre_site_transient_update_core', '__return_null' );
add_filter( 'pre_site_transient_update_plugins', '__return_null' );
add_filter( 'pre_site_transient_update_themes', '__return_null' );
remove_action( 'load-plugins.php', 'wp_update_plugins' );
remove_action( 'load-themes.php', 'wp_update_themes' );
remove_action( 'load-update-core.php', 'wp_update_plugins' );
add_filter( 'pre_http_request', static function ( $pre, $args, $url ) {
	// A WP_Error makes core retry over HTTP and log a warning; a 503 reply is ignored quietly.
	return false !== strpos( $url, 'api.wordpress.org' ) ? [ 'headers' => [], 'body' => '', 'response' => [ 'code' => 503, 'message' => 'Offline test site' ], 'cookies' => [], 'filename' => null ] : $pre;
}, 10, 3 );

// Flag files let the E2E suite switch scenarios without editing code.
$cm_flags = __DIR__ . '/flags';

// Nonce expiry: 4-second nonce life simulates a page cached longer than WordPress' 12-24h nonce window.
if ( file_exists( "$cm_flags/short-nonce" ) ) {
	add_filter( 'nonce_life', static function () { return 4; } );
}

// Quote prefill configuration, as a site would add it in a snippet: JSON {"zip": "...", "city": "...", "events": bool}.
if ( file_exists( "$cm_flags/prefill.json" ) ) {
	add_filter( 'cm_zip_checker_quote_prefill', static function () use ( $cm_flags ) {
		return json_decode( (string) file_get_contents( "$cm_flags/prefill.json" ), true );
	} );
}

// Staging scenario: accept landing-page URLs written for the production host.
if ( file_exists( "$cm_flags/allow-prod-host" ) ) {
	add_filter( 'cm_zip_checker_allowed_hosts', static function ( $hosts ) { $hosts[] = 'chicagomounting.com'; return $hosts; } );
}

// Sitewide mode (e.g. an Elementor button with data-cm-zip-open in the header).
if ( file_exists( "$cm_flags/always-enqueue" ) ) {
	add_filter( 'cm_zip_checker_always_enqueue', '__return_true' );
}

// Chicago Mounting theme CSS (verbatim excerpt) + assumed Elementor kit colours, optionally with the proposed patch.
add_action( 'wp_enqueue_scripts', static function () use ( $cm_flags ) {
	$base = content_url( 'mu-plugins/cm-test-theme/' );
	if ( file_exists( "$cm_flags/theme-css" ) ) {
		wp_enqueue_style( 'cm-test-kit', $base . 'elementor-kit-vars.css', [], null );
		wp_enqueue_style( 'cm-test-theme', $base . 'chicagomounting-style-excerpt.css', [ 'cm-test-kit' ], null );
		if ( file_exists( "$cm_flags/theme-patch" ) ) {
			wp_enqueue_style( 'cm-test-theme-patch', $base . 'chicagomounting-button-btn.css', [ 'cm-test-theme' ], null );
		}
	}
}, 5 );

// Elementor kit global Buttons / Form Fields styles (stress fixture) on body.elementor-kit-8.
if ( file_exists( "$cm_flags/kit-globals" ) ) {
	add_filter( 'body_class', static function ( $classes ) { $classes[] = 'elementor-kit-8'; return $classes; } );
	add_action( 'wp_enqueue_scripts', static function () {
		wp_enqueue_style( 'cm-test-kit-globals', content_url( 'mu-plugins/cm-test-theme/elementor-kit-globals.css' ), [], null );
	}, 6 );
}

// Site-wide theme classes, as a site would set them in a snippet: JSON {"button": "...", "cta": "...", ...}.
if ( file_exists( "$cm_flags/default-classes.json" ) ) {
	add_filter( 'cm_zip_checker_default_classes', static function ( $classes ) use ( $cm_flags ) {
		return array_merge( $classes, (array) json_decode( (string) file_get_contents( "$cm_flags/default-classes.json" ), true ) );
	} );
}

// Elementor element-cache hit simulation: Elementor does not run the widget (so not the shortcode);
// it re-enqueues the script/style handles recorded when the cache was built (core/base/document.php).
add_action( 'wp_enqueue_scripts', static function () {
	if ( is_page( 'elementor-cache-sim' ) ) {
		wp_enqueue_script( 'cm-zip-checker' );
		wp_enqueue_style( 'cm-zip-checker' );
	}
}, 20 );
