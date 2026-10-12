<?php
/**
 * Plugin Name: Chicago Mounting ZIP Checker
 * Description: Reusable ZIP service-area checker with a CSV-managed list and Elementor-compatible shortcodes.
 * Version: 0.2.1
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Text Domain: cm-zip-checker
 */
if (!defined('ABSPATH')) { exit; }

final class CM_Zip_Checker {
    const OPTION = 'cm_zip_checker_records';
    const VERSION = '0.2.1';
    const CLASS_KEYS = ['button', 'cta', 'input', 'trigger'];
    const IMPORT_LIMIT = 5000;
    private static $popup_source_rendered = false;
    private static $popup_location = 'popup';
    private static $custom_css = false;
    public static function init() {
        add_action('admin_menu', [__CLASS__, 'admin_menu']);
        add_action('admin_post_cm_zip_import', [__CLASS__, 'import_csv']);
        add_action('admin_post_cm_zip_export', [__CLASS__, 'export_csv']);
        add_action('admin_post_cm_zip_save', [__CLASS__, 'save_record']);
        add_action('admin_post_cm_zip_delete', [__CLASS__, 'delete_record']);
        add_shortcode('cm_zip_checker', [__CLASS__, 'shortcode']);
        add_shortcode('cm_zip_popup_button', [__CLASS__, 'popup_trigger_shortcode']);
        add_action('wp_ajax_cm_zip_lookup', [__CLASS__, 'lookup']);
        add_action('wp_ajax_nopriv_cm_zip_lookup', [__CLASS__, 'lookup']);
        add_action('wp_enqueue_scripts', [__CLASS__, 'frontend_assets']);
        // Elementor editor renders newly added widgets via AJAX, so load the assets in the preview up front.
        add_action('elementor/preview/enqueue_scripts', [__CLASS__, 'enqueue']);
    }
    private static function records() {
        $records = get_option(self::OPTION, []);
        return is_array($records) ? $records : [];
    }
    private static function valid_zip($value) {
        return is_string($value) && preg_match('/^[0-9]{5}$/D', $value);
    }
    private static function valid_status($value) {
        return in_array($value, ['served', 'conditional'], true);
    }
    private static function clean_record($raw) {
        $zip = isset($raw['zip']) ? trim((string) $raw['zip']) : '';
        if (!self::valid_zip($zip)) { return null; }
        $status = isset($raw['status']) ? strtolower(trim((string) $raw['status'])) : 'conditional';
        if (!self::valid_status($status)) { return null; }
        $city = sanitize_text_field($raw['city'] ?? '');
        $state = strtoupper(sanitize_text_field($raw['state'] ?? 'IL'));
        if (!preg_match('/^[A-Z]{2}$/D', $state)) { return null; }
        $url = self::local_page_path($raw['landing_page'] ?? '');
        if ($url === null) { return null; }
        return ['zip'=>$zip,'city'=>$city,'state'=>$state,'status'=>$status,
            'landing_page'=>$url,'note'=>sanitize_text_field($raw['note'] ?? '')];
    }
    /**
     * Landing pages are stored as root-relative paths ("/tv-installation-in-glenview/") so the same
     * records work on staging and production. Absolute URLs are accepted only for this site's host
     * (www and non-www) or hosts added via the cm_zip_checker_allowed_hosts filter.
     * Returns '' for empty input and null for anything that is not a local page.
     */
    private static function local_page_path($value) {
        $value = trim((string) $value);
        if ($value === '') { return ''; }
        $is_relative = $value[0] === '/' && substr($value, 0, 2) !== '//';
        $url = $is_relative ? $value : esc_url_raw($value, ['http', 'https']);
        $parts = $url ? wp_parse_url($url) : false;
        if (!$parts) { return null; }
        if (!$is_relative && (empty($parts['host']) || !self::is_site_host($parts['host']))) { return null; }
        $path = '/' . ltrim($parts['path'] ?? '', '/');
        if (isset($parts['query'])) { $path .= '?' . $parts['query']; }
        if (isset($parts['fragment'])) { $path .= '#' . $parts['fragment']; }
        $path = esc_url_raw($path);
        return ($path !== '' && $path[0] === '/') ? $path : null;
    }
    private static function is_site_host($host) {
        $normalize = static function ($h) { return preg_replace('/^www\./', '', strtolower((string) $h)); };
        $allowed = (array) apply_filters('cm_zip_checker_allowed_hosts', [wp_parse_url(home_url(), PHP_URL_HOST)]);
        return in_array($normalize($host), array_map($normalize, $allowed), true);
    }
    public static function admin_menu() {
        add_menu_page('CM ZIP Checker', 'CM ZIP Checker', 'manage_options', 'cm-zip-checker', [__CLASS__, 'admin_page'], 'dashicons-location-alt', 81);
    }
    private static function redirect_admin($message, $args = []) {
        wp_safe_redirect(add_query_arg(['page'=>'cm-zip-checker','cm_msg'=>$message] + $args, admin_url('admin.php')));
        exit;
    }
    // Admin notices are looked up by code so a crafted link cannot place arbitrary text in the admin screen.
    private static function admin_message() {
        // phpcs:disable WordPress.Security.NonceVerification.Recommended -- display-only status codes.
        $code = isset($_GET['cm_msg']) ? sanitize_key(wp_unslash($_GET['cm_msg'])) : '';
        $messages = [
            'saved' => 'ZIP saved.',
            'deleted' => 'ZIP deleted.',
            'invalid_record' => 'Invalid ZIP, status, state, or landing page. Landing pages must be pages on this site, e.g. /tv-installation-in-glenview/.',
            'invalid_zip' => 'Invalid ZIP.',
            'bad_file' => 'Invalid file or file larger than 1MB.',
            'unreadable' => 'Cannot read CSV.',
            'no_header' => 'Missing CSV header.',
            'bad_header' => 'CSV is missing required headers.',
        ];
        if ($code === 'imported') {
            $text = sprintf('Imported/updated %d ZIP records; skipped %d invalid rows (bad ZIP, status, state, or non-local landing page).',
                isset($_GET['added']) ? absint($_GET['added']) : 0, isset($_GET['skipped']) ? absint($_GET['skipped']) : 0);
            if (!empty($_GET['truncated'])) { $text .= sprintf(' Import stopped at the %s-row limit; split the file and import the rest.', number_format_i18n(self::IMPORT_LIMIT)); }
            return $text;
        }
        // phpcs:enable
        return $messages[$code] ?? '';
    }
    public static function admin_page() {
        if (!current_user_can('manage_options')) { wp_die('Not authorized.'); }
        $records = self::records();
        ksort($records, SORT_STRING);
        echo '<div class="wrap"><h1>Chicago Mounting ZIP Checker</h1><p>Coverage must be verified before marking ZIP codes Served. An unlisted ZIP is treated as unknown.</p>';
        $message = self::admin_message();
        if ($message !== '') { echo '<div class="notice notice-info"><p>'.esc_html($message).'</p></div>'; }
        echo '<h2>Add / Update ZIP</h2><form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('cm_zip_save');
        echo '<input type="hidden" name="action" value="cm_zip_save"><p><label>ZIP <input name="zip" maxlength="5" pattern="[0-9]{5}" required></label> <label>City <input name="city" maxlength="120"></label> <label>State <input name="state" value="IL" maxlength="2" size="2" required></label> <label>Status <select name="status"><option value="conditional">Conditional</option><option value="served">Served</option></select></label></p>';
        echo '<p><label>Local page <input type="text" name="landing_page" size="55" placeholder="/tv-installation-in-glenview/"></label> <label>Private note <input name="note" size="35"></label></p>';
        submit_button('Save ZIP'); echo '</form>';
        $custom = self::custom_css();
        echo '<h2>Appearance</h2><p>'.($custom
            ? 'Site stylesheet loaded after the base styles: <code>'.esc_html($custom['path']).'</code>'
            : 'No site stylesheet. To customise the look, create <code>wp-content/uploads/cm-zip-checker/custom.css</code> (starter: <code>'.esc_html(plugin_dir_path(__FILE__)).'starter/chicagomounting.css</code>). It is kept on plugin updates.').'</p>';
        echo '<h2>CSV Import / Export</h2><p>Header: <code>zip,city,state,status,landing_page,note</code>. Existing ZIP records with matching codes are updated. Invalid rows are skipped. Landing pages are stored as site-relative paths. Import limit: '.esc_html(number_format_i18n(self::IMPORT_LIMIT)).' rows.</p>';
        echo '<form method="post" enctype="multipart/form-data" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('cm_zip_import'); echo '<input type="hidden" name="action" value="cm_zip_import"><input type="file" name="csv" accept=".csv,text/csv" required> ';
        submit_button('Import CSV', 'secondary', 'submit', false); echo '</form>';
        echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">'; wp_nonce_field('cm_zip_export'); echo '<input type="hidden" name="action" value="cm_zip_export">'; submit_button('Export CSV', 'secondary', 'submit', false); echo '</form>';
        echo '<h2>Records ('.count($records).')</h2><p>Quick edit by entering the same ZIP in the form above.</p><table class="widefat striped"><thead><tr><th>ZIP</th><th>City</th><th>State</th><th>Status</th><th>Landing Page</th><th>Note</th><th>Action</th></tr></thead><tbody>';
        foreach ($records as $r) {
            echo '<tr><td>'.esc_html($r['zip']).'</td><td>'.esc_html($r['city']).'</td><td>'.esc_html($r['state']).'</td><td>'.esc_html($r['status']).'</td><td>'.esc_html($r['landing_page']).'</td><td>'.esc_html($r['note']).'</td><td>';
            echo '<form method="post" action="'.esc_url(admin_url('admin-post.php')).'">'; wp_nonce_field('cm_zip_delete_'.$r['zip']);
            echo '<input type="hidden" name="action" value="cm_zip_delete"><input type="hidden" name="zip" value="'.esc_attr($r['zip']).'">';
            echo '<button class="button button-small" type="submit" onclick="return confirm(\'Delete this ZIP?\')">Delete</button></form></td></tr>';
        }
        echo '</tbody></table></div>';
    }
    private static function admin_guard($nonce) {
        if (!current_user_can('manage_options')) { wp_die('Access denied', '', ['response'=>403]); }
        check_admin_referer($nonce);
    }
    public static function save_record() {
        self::admin_guard('cm_zip_save');
        $raw = wp_unslash($_POST);
        $r = self::clean_record($raw);
        if (!$r) { self::redirect_admin('invalid_record'); }
        $records = self::records(); $records[$r['zip']] = $r;
        update_option(self::OPTION, $records, false);
        self::redirect_admin('saved');
    }
    public static function delete_record() {
        $zip = isset($_POST['zip']) ? sanitize_text_field(wp_unslash($_POST['zip'])) : '';
        self::admin_guard('cm_zip_delete_'.$zip);
        if (!self::valid_zip($zip)) { self::redirect_admin('invalid_zip'); }
        $records = self::records(); unset($records[$zip]); update_option(self::OPTION, $records, false);
        self::redirect_admin('deleted');
    }
    public static function import_csv() {
        self::admin_guard('cm_zip_import');
        if (empty($_FILES['csv']['tmp_name']) || !is_uploaded_file($_FILES['csv']['tmp_name']) || (int)$_FILES['csv']['size'] > 1024*1024) {
            self::redirect_admin('bad_file');
        }
        $f = fopen($_FILES['csv']['tmp_name'], 'r');
        if (!$f) { self::redirect_admin('unreadable'); }
        // Explicit RFC 4180 settings: identical parsing on PHP 7.4-8.4+ and no PHP 8.4 "$escape" deprecation.
        $header = fgetcsv($f, 0, ',', '"', '');
        if (!$header || $header === [null]) { fclose($f); self::redirect_admin('no_header'); }
        $header = array_map(static function($v) { return strtolower(trim(preg_replace('/^\xEF\xBB\xBF/', '', (string) $v))); }, $header);
        $required = ['zip','city','state','status'];
        if (array_diff($required, $header)) { fclose($f); self::redirect_admin('bad_header'); }
        $records = self::records(); $added=0; $skipped=0; $lines=0; $truncated=false;
        while (($data = fgetcsv($f, 0, ',', '"', '')) !== false) {
            if ($data === [null]) { continue; } // Blank line.
            if ($lines >= self::IMPORT_LIMIT) { $truncated = true; break; }
            $lines++;
            if (count($header) !== count($data)) { $skipped++; continue; }
            $r = self::clean_record(array_combine($header, array_map([__CLASS__, 'unguard_csv_value'], $data)));
            if (!$r) { $skipped++; continue; }
            $records[$r['zip']] = $r; $added++;
        }
        fclose($f); update_option(self::OPTION, $records, false);
        self::redirect_admin('imported', ['added'=>$added,'skipped'=>$skipped,'truncated'=>$truncated ? 1 : 0]);
    }
    // Reverses the export formula guard below so an export -> import round trip keeps values unchanged.
    private static function unguard_csv_value($v) {
        return preg_replace('/^\'(?=\s*[=+@\-])/', '', (string) $v);
    }
    public static function export_csv() {
        self::admin_guard('cm_zip_export');
        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="cm-zip-checker.csv"');
        $out = fopen('php://output', 'w');
        $columns = ['zip','city','state','status','landing_page','note'];
        fputcsv($out, $columns, ',', '"', '');
        foreach (self::records() as $r) {
            $row = [];
            foreach ($columns as $col) {
                $v = (string)($r[$col] ?? '');
                // Avoid spreadsheet formula execution on CSV open.
                if ($v !== '' && preg_match('/^[\s]*[=+@\-]/', $v)) { $v = "'".$v; }
                $row[] = $v;
            }
            fputcsv($out, $row, ',', '"', '');
        }
        fclose($out); exit;
    }
    private static function quote_url() {
        return (string) apply_filters('cm_zip_checker_quote_url', home_url('/quote/'));
    }
    /**
     * Optional quote-form prefill. Disabled unless field selectors are supplied, e.g.:
     * add_filter('cm_zip_checker_quote_prefill', fn() => ['zip' => '#form-field-zip', 'city' => '#form-field-city']);
     * Set 'events' => true only if the quote calculator must react to the prefilled value.
     */
    private static function prefill_config() {
        $p = apply_filters('cm_zip_checker_quote_prefill', []);
        if (!is_array($p) || empty($p['zip']) || !is_string($p['zip'])) { return null; }
        return ['zip'=>$p['zip'], 'city'=>(isset($p['city']) && is_string($p['city'])) ? $p['city'] : '', 'events'=>!empty($p['events'])];
    }
    private static function is_quote_page() {
        $quote = untrailingslashit((string) wp_parse_url(self::quote_url(), PHP_URL_PATH));
        $current = isset($_SERVER['REQUEST_URI']) ? untrailingslashit((string) wp_parse_url(esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])), PHP_URL_PATH)) : '';
        return $quote !== '' && $quote === $current;
    }
    // Registered once with its config so Elementor's element cache (which re-enqueues by handle) and multiple instances work.
    private static function register_assets() {
        if (wp_script_is('cm-zip-checker', 'registered')) { return; }
        // Two layers: plugin base styles, then the optional site stylesheet. 'cm-zip-checker' is an alias that pulls
        // both in order, so anything enqueuing that handle (shortcodes, Elementor's element cache) gets both.
        wp_register_style('cm-zip-checker-base', plugins_url('assets/zip-checker.css', __FILE__), [], self::VERSION);
        $layers = ['cm-zip-checker-base'];
        $custom = self::custom_css();
        if ($custom) {
            wp_register_style('cm-zip-checker-custom', set_url_scheme($custom['url']), ['cm-zip-checker-base'], (string) filemtime($custom['path']));
            $layers[] = 'cm-zip-checker-custom';
        }
        wp_register_style('cm-zip-checker', false, $layers, self::VERSION);
        wp_register_script('cm-zip-checker', plugins_url('assets/zip-checker.js', __FILE__), [], self::VERSION, true);
        $config = ['ajaxUrl'=>admin_url('admin-ajax.php'), 'quoteUrl'=>self::quote_url()];
        $prefill = self::prefill_config();
        if ($prefill) { $config['prefill'] = $prefill; }
        wp_localize_script('cm-zip-checker', 'CMZipCheckerConfig', $config);
    }
    public static function frontend_assets() {
        self::register_assets();
        // Sitewide mode: any element with data-cm-zip-open (e.g. an Elementor button) can open the modal on every page.
        if (apply_filters('cm_zip_checker_always_enqueue', false)) { self::enqueue(); add_action('wp_footer', [__CLASS__, 'footer_popup_source'], 5); }
        elseif (self::prefill_config() && self::is_quote_page()) { wp_enqueue_script('cm-zip-checker'); }
    }
    public static function enqueue() {
        self::register_assets();
        wp_enqueue_style('cm-zip-checker');
        wp_enqueue_script('cm-zip-checker');
    }
    /**
     * Site stylesheet, loaded after the base styles on pages that show the checker. It lives outside the
     * plugin (default: wp-content/uploads/cm-zip-checker/custom.css) so plugin updates never overwrite it.
     * Relocate or disable with the cm_zip_checker_custom_css filter (['path' => ..., 'url' => ...] or false).
     */
    private static function custom_css() {
        if (self::$custom_css !== false) { return self::$custom_css; }
        $uploads = wp_upload_dir(null, false);
        $default = empty($uploads['error']) ? [
            'path' => trailingslashit($uploads['basedir']).'cm-zip-checker/custom.css',
            'url' => trailingslashit($uploads['baseurl']).'cm-zip-checker/custom.css',
        ] : null;
        $css = apply_filters('cm_zip_checker_custom_css', $default);
        $valid = is_array($css) && !empty($css['path']) && !empty($css['url']) && is_string($css['path']) && is_string($css['url'])
            && substr($css['path'], -4) === '.css' && is_file($css['path']) && is_readable($css['path']);
        self::$custom_css = $valid ? ['path'=>$css['path'], 'url'=>$css['url']] : null;
        return self::$custom_css;
    }
    /**
     * Optional theme classes for the controls, e.g. "btn btn-primary". Site-wide defaults come from the
     * cm_zip_checker_default_classes filter; shortcode attributes override them (an empty value turns them off).
     * Tokens that sanitize_html_class() would alter are dropped, duplicates removed.
     */
    private static function theme_classes($overrides = []) {
        $defaults = apply_filters('cm_zip_checker_default_classes', array_fill_keys(self::CLASS_KEYS, ''));
        $classes = [];
        foreach (self::CLASS_KEYS as $key) {
            $value = array_key_exists($key, $overrides) && $overrides[$key] !== null ? $overrides[$key] : ($defaults[$key] ?? '');
            $classes[$key] = self::sanitize_classes($value);
        }
        return $classes;
    }
    private static function sanitize_classes($value) {
        $tokens = preg_split('/\s+/', is_string($value) ? $value : '', -1, PREG_SPLIT_NO_EMPTY);
        $valid = array_filter($tokens, static function ($t) { return $t === sanitize_html_class($t); });
        return implode(' ', array_slice(array_values(array_unique($valid)), 0, 20));
    }
    // Plugin class first (JS hooks), then the marker that switches off the plugin look, then theme classes.
    private static function control_class($base, $theme) {
        return $theme === '' ? $base : $base.' cm-zip-themed '.$theme;
    }
    private static function render_checker($style, $location, $heading, $classes) {
        if ($style === 'popup') { self::$popup_source_rendered = true; }
        ob_start(); ?>
        <section class="cm-zip cm-zip--<?php echo esc_attr($style); ?>" data-cm-zip data-location="<?php echo esc_attr($location); ?>" data-variant="<?php echo esc_attr($style); ?>"<?php if ($classes['cta'] !== '') { echo ' data-cta-class="'.esc_attr($classes['cta']).'"'; } ?>>
          <?php if ($style !== 'minimal'): ?><h2 class="cm-zip__heading"><?php echo esc_html($heading); ?></h2><p class="cm-zip__intro">Enter your ZIP code to check whether Chicago Mounting serves your location.</p><?php endif; ?>
          <form class="cm-zip__form" novalidate>
            <label class="cm-zip__label">ZIP Code <input class="<?php echo esc_attr(self::control_class('cm-zip__input', $classes['input'])); ?>" type="text" name="zip" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" placeholder="Enter ZIP Code" required></label>
            <button class="<?php echo esc_attr(self::control_class('cm-zip__button', $classes['button'])); ?>" type="submit">Check Service Area</button>
          </form>
          <div class="cm-zip__result" role="status" aria-live="polite" aria-atomic="true" hidden></div>
        </section>
        <?php return ob_get_clean();
    }
    public static function shortcode($atts) {
        $atts = shortcode_atts(['style'=>'full','location'=>'unspecified','heading'=>'Do We Serve Your Area?',
            'button_class'=>null,'cta_class'=>null,'input_class'=>null], $atts, 'cm_zip_checker');
        $style = in_array($atts['style'], ['full','compact','minimal','popup'], true) ? $atts['style'] : 'full';
        self::enqueue();
        $classes = self::theme_classes(['button'=>$atts['button_class'], 'cta'=>$atts['cta_class'], 'input'=>$atts['input_class']]);
        return self::render_checker($style, sanitize_key($atts['location']), $atts['heading'], $classes);
    }
    public static function popup_trigger_shortcode($atts) {
        $atts = shortcode_atts(['label'=>'Check Service Area','location'=>'popup','button_class'=>null], $atts, 'cm_zip_popup_button');
        self::enqueue();
        // The modal reuses a popup-variant checker. If the page has none, a hidden one is printed in the
        // footer, so the button also works on its own (e.g. in a header template).
        if (!has_action('wp_footer', [__CLASS__, 'footer_popup_source'])) {
            self::$popup_location = sanitize_key($atts['location']);
            add_action('wp_footer', [__CLASS__, 'footer_popup_source'], 5);
        }
        $classes = self::theme_classes(['trigger'=>$atts['button_class']]);
        return '<button type="button" class="'.esc_attr(self::control_class('cm-zip-trigger', $classes['trigger'])).'" data-cm-zip-open>'.esc_html($atts['label']).'</button>';
    }
    public static function footer_popup_source() {
        if (self::$popup_source_rendered) { return; }
        echo self::render_checker('popup', self::$popup_location, 'Do We Serve Your Area?', self::theme_classes()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in render_checker().
    }
    public static function lookup() {
        // Public, read-only lookup: intentionally no nonce. Pages with the checker are normally
        // page-cached, so a nonce baked into the HTML expires (12-24h) and never matches logged-in
        // visitors, which made every check fail with 403. Nothing is written, so there is no CSRF risk.
        $zip = isset($_POST['zip']) ? sanitize_text_field(wp_unslash($_POST['zip'])) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
        if (!self::valid_zip($zip)) { wp_send_json_error(['message'=>'Please enter a valid 5-digit ZIP code.'], 400); }
        $records = self::records();
        if (!isset($records[$zip])) { wp_send_json_success(['status'=>'unlisted','city'=>'','state'=>'','landing_page'=>'']); }
        $r = $records[$zip];
        wp_send_json_success(['status'=>$r['status'],'city'=>$r['city'],'state'=>$r['state'],'landing_page'=>$r['landing_page']]);
    }
}
CM_Zip_Checker::init();
