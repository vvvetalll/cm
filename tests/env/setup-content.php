<?php
// Usage: php setup-content.php <site_dir> — enables pretty permalinks and creates the test pages.
$_SERVER['HTTP_HOST'] = '127.0.0.1:8899';
require $argv[1] . '/wp-load.php';
wp_set_current_user( 1 ); // Admin has unfiltered_html, so the mock quote page keeps its inline script.
update_option( 'permalink_structure', '/%postname%/' );

// What Elementor's element cache would store for a Shortcode widget set to Cache = "Active".
// The plugin may not be active yet, so load it for this request to render real markup.
if ( ! shortcode_exists( 'cm_zip_checker' ) ) {
	require_once WP_PLUGIN_DIR . '/cm-zip-checker/cm-zip-checker.php';
}
$cached_markup = do_shortcode( '[cm_zip_checker style="compact" location="elementor_cached"]' );
if ( false !== strpos( $cached_markup, '[cm_zip_checker' ) ) {
	fwrite( STDERR, "Could not render cached checker markup.\n" );
	exit( 1 );
}

$quote_page = <<<'HTML'
<form id="quote-form" onsubmit="return false">
<p><label>ZIP <input name="form_fields[zip]" id="form-field-zip"></label></p>
<p><label>City <input name="form_fields[city]" id="form-field-city"></label></p>
<p><label>TV size <select id="tv-size" name="form_fields[size]"><option>55</option><option>65</option></select></label></p>
<p>Estimated price: <output id="price">$0</output></p>
</form>
<img id="slow" src="/wp-includes/images/blank.gif?slow=1" alt="">
<script>
// Mock pricing calculator: counts events it receives from the ZIP/city fields.
window.calcEvents = { input: 0, change: 0 };
['input', 'change'].forEach(function (t) {
  document.getElementById('quote-form').addEventListener(t, function (e) {
    if (e.target.id === 'form-field-zip' || e.target.id === 'form-field-city') { window.calcEvents[t]++; }
  });
});
// Simulates a value already present before the prefill runs (browser autofill / manual entry).
if (location.search.indexOf('manual=1') !== -1) { document.getElementById('form-field-zip').value = '60000'; }
</script>
HTML;

$pages = [
	'zip-test' => "[cm_zip_checker style=\"full\" location=\"test_full\"]\n\n[cm_zip_checker style=\"compact\" location=\"test_compact\" heading=\"Compact <b>check</b>\"]\n\n[cm_zip_checker style=\"minimal\" location=\"test_minimal\"]\n\n<p>Popup trigger: [cm_zip_popup_button label=\"Check ZIP\"]</p>\n\n[cm_zip_checker style=\"popup\" location=\"popup_test\"]\n\n[cm_zip_checker style=\"bogus\" location=\"Bad Location!\"]\n\n<p><a id=\"after\" href=\"#\">after link</a></p>",
	'trigger-only' => "<p>Header-style trigger without a popup source on the page: [cm_zip_popup_button label=\"Check ZIP\" location=\"header\"]</p>",
	'trigger-then-popup' => "[cm_zip_popup_button label=\"Open\"]\n\n[cm_zip_checker style=\"popup\" location=\"explicit_popup\" heading=\"Explicit popup\"]",
	'link-only' => "<p>No shortcode on this page: <a id=\"lo\" href=\"/zip-test/\" data-cm-zip-open>Check your ZIP</a></p>",
	'link-fallback' => "[cm_zip_checker style=\"compact\" location=\"lf\"]\n\n<p><a id=\"lf\" href=\"/zip-test/\" data-cm-zip-open>Open checker</a></p>",
	'quote' => $quote_page,
	'elementor-cache-sim' => $cached_markup,
];
foreach ( $pages as $slug => $content ) {
	$existing = get_page_by_path( $slug );
	$id = wp_insert_post( [ 'ID' => $existing ? $existing->ID : 0, 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => ucwords( str_replace( '-', ' ', $slug ) ), 'post_content' => $content ], true );
	echo "$slug => " . ( is_wp_error( $id ) ? $id->get_error_message() : $id ) . "\n";
}
if ( ! get_user_by( 'login', 'editor' ) ) {
	wp_insert_user( [ 'user_login' => 'editor', 'user_pass' => 'editor-pass-123', 'user_email' => 'editor@example.com', 'role' => 'editor' ] );
}
flush_rewrite_rules();
