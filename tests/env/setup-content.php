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

// Theme button system, Elementor-like widgets, WooCommerce and plain controls: used to check that neither the
// proposed theme patch nor the plugin CSS changes anything they should not.
$regression = <<<'HTML'
<div id="reg">
<p><a id="r-link-primary" class="btn btn-primary btn-md" href="#r">Link primary</a> <a id="r-link-outline" class="btn btn-outline btn-sm" href="#r">Link outline</a> <a id="r-link-light" class="btn btn-outline-light btn-lg" href="#r">Light</a> <a id="r-link-readmore" class="btn btn-readmore" href="#r">Read more</a></p>
<div class="elementor elementor-1"><div class="elementor-element e-con"><div class="elementor-element btn btn-primary btn-md elementor-widget elementor-widget-button"><div class="elementor-widget-container"><div class="elementor-button-wrapper"><a id="r-el-primary" class="elementor-button elementor-button-link elementor-size-sm" href="#r"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">Elementor primary</span></span></a></div></div></div>
<div class="elementor-element elementor-widget elementor-widget-button"><div class="elementor-widget-container"><a id="r-el-plain" class="elementor-button elementor-size-sm" href="#r">Elementor plain</a></div></div>
<div class="elementor-element elementor-widget elementor-widget-form"><form class="elementor-form" onsubmit="return false"><button id="r-el-submit" type="submit" class="elementor-button elementor-size-sm">Send</button></form></div></div></div>
<p><button id="r-plain" type="button">Plain button</button> <input id="r-submit" type="submit" value="Input submit"></p>
<div class="woocommerce"><a id="r-woo" class="button" href="#r">Woo link</a> <button id="r-woo-btn" type="button" class="button">Woo button</button></div>
<p><button id="r-btn-primary" class="btn btn-primary btn-md" type="button">Button primary</button> <button id="r-btn-outline" class="btn btn-outline btn-sm" type="button">Button outline</button> <button id="r-btn-disabled" class="btn btn-primary btn-md" type="button" disabled>Disabled</button></p>
</div>
HTML;

$pages = [
	'zip-test' => "[cm_zip_checker style=\"full\" location=\"test_full\"]\n\n[cm_zip_checker style=\"compact\" location=\"test_compact\" heading=\"Compact <b>check</b>\"]\n\n[cm_zip_checker style=\"minimal\" location=\"test_minimal\"]\n\n<p>Popup trigger: [cm_zip_popup_button label=\"Check ZIP\"]</p>\n\n[cm_zip_checker style=\"popup\" location=\"popup_test\"]\n\n[cm_zip_checker style=\"bogus\" location=\"Bad Location!\"]\n\n<p><a id=\"after\" href=\"#\">after link</a></p>",
	'trigger-only' => "<p>Header-style trigger without a popup source on the page: [cm_zip_popup_button label=\"Check ZIP\" location=\"header\"]</p>",
	'trigger-then-popup' => "[cm_zip_popup_button label=\"Open\"]\n\n[cm_zip_checker style=\"popup\" location=\"explicit_popup\" heading=\"Explicit popup\"]",
	'link-only' => "<p>No shortcode on this page: <a id=\"lo\" href=\"/zip-test/\" data-cm-zip-open>Check your ZIP</a></p>",
	'link-fallback' => "[cm_zip_checker style=\"compact\" location=\"lf\"]\n\n<p><a id=\"lf\" href=\"/zip-test/\" data-cm-zip-open>Open checker</a></p>",
	'quote' => $quote_page,
	'styling' => "[cm_zip_checker style=\"compact\" location=\"plain\"]\n\n[cm_zip_checker style=\"compact\" location=\"themed\" button_class=\"btn btn-primary btn-md\" cta_class=\"btn btn-outline btn-md\" input_class=\"cm-test-input\"]\n\n[cm_zip_checker style=\"minimal\" location=\"evil\" button_class='btn\" onclick=\"alert(1)' cta_class=\"btn <b>x</b> hover:bg-red btn btn\" input_class=\"\"]\n\n[cm_zip_checker style=\"minimal\" location=\"optout\" button_class=\"\" cta_class=\"\"]\n\n<p>[cm_zip_popup_button label=\"Open\" button_class=\"btn btn-primary btn-sm\"]</p>\n\n[cm_zip_checker style=\"popup\" location=\"styling_popup\"]",
	'text-editor' => '<div class="elementor elementor-2"><div class="elementor-element e-con"><div class="elementor-element elementor-widget elementor-widget-text-editor"><div class="elementor-widget-container">[cm_zip_checker style="compact" location="in_text_editor"]</div></div><div class="elementor-element elementor-widget elementor-widget-shortcode"><div class="elementor-widget-container"><div class="elementor-shortcode">[cm_zip_checker style="compact" location="in_shortcode_widget" button_class="btn btn-primary btn-md" cta_class="btn btn-primary btn-md"]</div></div></div></div></div>',
	'cm-match' => '<p class="cm-ref"><a id="ref" class="btn btn-primary btn-md" href="#ref">Check Service Area</a> <a id="ref-cta" class="btn btn-primary btn-md" href="#ref">Get a Free Quote</a> <button id="kit-probe" type="button">Kit probe</button></p>' . "\n\n" . '[cm_zip_checker style="full" location="m_full"]' . "\n\n" . '[cm_zip_checker style="compact" location="m_compact"]' . "\n\n" . '[cm_zip_checker style="minimal" location="m_minimal"]' . "\n\n" . '<p>[cm_zip_popup_button label="Check Service Area"]</p>',
	'theme-regression' => $regression,
	'theme-regression-plugin' => $regression . "\n\n" . '[cm_zip_checker style="compact" location="reg_plain"]' . "\n\n" . '[cm_zip_checker style="compact" location="reg_themed" button_class="btn btn-primary btn-md" cta_class="btn btn-primary btn-md"]',
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
