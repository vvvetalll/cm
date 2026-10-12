<?php
/**
 * Plugin Name: Chicago Mounting ZIP Checker
 * Description: Reusable ZIP service-area checker with a CSV-managed list and Elementor-compatible shortcodes.
 * Version: 0.1.0
 * Requires PHP: 7.4
 * Text Domain: cm-zip-checker
 */
if (!defined('ABSPATH')) { exit; }

final class CM_Zip_Checker {
    const OPTION = 'cm_zip_checker_records';
    const VERSION = '0.1.0';
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
        $url = esc_url_raw($raw['landing_page'] ?? '');
        if ($url && !self::safe_page_url($url)) { return null; }
        return ['zip'=>$zip,'city'=>$city,'state'=>$state,'status'=>$status,
            'landing_page'=>$url,'note'=>sanitize_text_field($raw['note'] ?? '')];
    }
    private static function safe_page_url($url) {
        if (!$url) { return true; }
        $host = wp_parse_url($url, PHP_URL_HOST);
        $site_host = wp_parse_url(home_url(), PHP_URL_HOST);
        return !$host || (strtolower($host) === strtolower($site_host));
    }
    public static function admin_menu() {
        add_menu_page('CM ZIP Checker', 'CM ZIP Checker', 'manage_options', 'cm-zip-checker', [__CLASS__, 'admin_page'], 'dashicons-location-alt', 81);
    }
    private static function redirect_admin($message) {
        wp_safe_redirect(add_query_arg(['page'=>'cm-zip-checker','cm_msg'=>$message], admin_url('admin.php')));
        exit;
    }
    public static function admin_page() {
        if (!current_user_can('manage_options')) { wp_die('Not authorized.'); }
        $records = self::records();
        ksort($records, SORT_STRING);
        echo '<div class="wrap"><h1>Chicago Mounting ZIP Checker</h1><p>Coverage must be verified before marking ZIP codes Served. An unlisted ZIP is treated as unknown.</p>';
        if (isset($_GET['cm_msg'])) { echo '<div class="notice notice-info"><p>'.esc_html(sanitize_text_field(wp_unslash($_GET['cm_msg']))).'</p></div>'; }
        echo '<h2>Add / Update ZIP</h2><form method="post" action="'.esc_url(admin_url('admin-post.php')).'">';
        wp_nonce_field('cm_zip_save');
        echo '<input type="hidden" name="action" value="cm_zip_save"><p><label>ZIP <input name="zip" maxlength="5" pattern="[0-9]{5}" required></label> <label>City <input name="city" maxlength="120"></label> <label>State <input name="state" value="IL" maxlength="2" size="2" required></label> <label>Status <select name="status"><option value="conditional">Conditional</option><option value="served">Served</option></select></label></p>';
        echo '<p><label>Local page URL <input type="url" name="landing_page" size="55" placeholder="https://chicagomounting.com/..."></label> <label>Private note <input name="note" size="35"></label></p>';
        submit_button('Save ZIP'); echo '</form>';
        echo '<h2>CSV Import / Export</h2><p>Header: <code>zip,city,state,status,landing_page,note</code>. Existing ZIP records with matching codes are updated. Invalid rows are skipped. Import limit: 5,000 lines.</p>';
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
        if (!$r) { self::redirect_admin('Invalid ZIP, status, state, or landing URL.'); }
        $records = self::records(); $records[$r['zip']] = $r;
        update_option(self::OPTION, $records, false);
        self::redirect_admin('ZIP saved.');
    }
    public static function delete_record() {
        $zip = isset($_POST['zip']) ? sanitize_text_field(wp_unslash($_POST['zip'])) : '';
        self::admin_guard('cm_zip_delete_'.$zip);
        if (!self::valid_zip($zip)) { self::redirect_admin('Invalid ZIP.'); }
        $records = self::records(); unset($records[$zip]); update_option(self::OPTION, $records, false);
        self::redirect_admin('ZIP deleted.');
    }
    public static function import_csv() {
        self::admin_guard('cm_zip_import');
        if (empty($_FILES['csv']['tmp_name']) || !is_uploaded_file($_FILES['csv']['tmp_name']) || (int)$_FILES['csv']['size'] > 1024*1024) {
            self::redirect_admin('Invalid file or file larger than 1MB.');
        }
        $f = fopen($_FILES['csv']['tmp_name'], 'r');
        if (!$f) { self::redirect_admin('Cannot read CSV.'); }
        $header = fgetcsv($f);
        if (!$header) { fclose($f); self::redirect_admin('Missing CSV header.'); }
        $header = array_map(static function($v) { return strtolower(trim(preg_replace('/^\xEF\xBB\xBF/', '', $v))); }, $header);
        $required = ['zip','city','state','status'];
        if (array_diff($required, $header)) { fclose($f); self::redirect_admin('CSV is missing required headers.'); }
        $records = self::records(); $added=0; $skipped=0; $lines=0;
        while (($data = fgetcsv($f)) !== false && $lines < 5000) {
            $lines++;
            if (count($header) !== count($data)) { $skipped++; continue; }
            $r = self::clean_record(array_combine($header, $data));
            if (!$r) { $skipped++; continue; }
            $records[$r['zip']] = $r; $added++;
        }
        fclose($f); update_option(self::OPTION, $records, false);
        self::redirect_admin('Imported/updated '.$added.' ZIP records; skipped '.$skipped.' rows.');
    }
    public static function export_csv() {
        self::admin_guard('cm_zip_export');
        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="cm-zip-checker.csv"');
        $out = fopen('php://output', 'w');
        $columns = ['zip','city','state','status','landing_page','note'];
        fputcsv($out, $columns);
        foreach (self::records() as $r) {
            $row = [];
            foreach ($columns as $col) {
                $v = (string)($r[$col] ?? '');
                // Avoid spreadsheet formula execution on CSV open.
                if ($v !== '' && preg_match('/^[\s]*[=+@\-]/', $v)) { $v = "'".$v; }
                $row[] = $v;
            }
            fputcsv($out, $row);
        }
        fclose($out); exit;
    }
    private static function enqueue() {
        wp_enqueue_style('cm-zip-checker', plugins_url('assets/zip-checker.css', __FILE__), [], self::VERSION);
        wp_enqueue_script('cm-zip-checker', plugins_url('assets/zip-checker.js', __FILE__), [], self::VERSION, true);
        wp_localize_script('cm-zip-checker', 'CMZipCheckerConfig', [
            'ajaxUrl'=>admin_url('admin-ajax.php'),
            'nonce'=>wp_create_nonce('cm_zip_lookup'),
            'quoteUrl'=>home_url('/quote/'),
        ]);
    }
    public static function shortcode($atts) {
        $atts = shortcode_atts(['style'=>'full','location'=>'unspecified','heading'=>'Do We Serve Your Area?'], $atts, 'cm_zip_checker');
        $style = in_array($atts['style'], ['full','compact','minimal','popup'], true) ? $atts['style'] : 'full';
        $location = sanitize_key($atts['location']);
        self::enqueue();
        ob_start(); ?>
        <section class="cm-zip cm-zip--<?php echo esc_attr($style); ?>" data-cm-zip data-location="<?php echo esc_attr($location); ?>" data-variant="<?php echo esc_attr($style); ?>">
          <?php if ($style !== 'minimal'): ?><h2 class="cm-zip__heading"><?php echo esc_html($atts['heading']); ?></h2><p class="cm-zip__intro">Enter your ZIP code to check whether Chicago Mounting serves your location.</p><?php endif; ?>
          <form class="cm-zip__form" novalidate>
            <label class="cm-zip__label">ZIP Code <input class="cm-zip__input" type="text" name="zip" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" placeholder="Enter ZIP Code" required></label>
            <button class="cm-zip__button" type="submit">Check Service Area</button>
          </form>
          <div class="cm-zip__result" role="status" aria-live="polite" aria-atomic="true" hidden></div>
        </section>
        <?php return ob_get_clean();
    }
    public static function popup_trigger_shortcode($atts) {
        $atts = shortcode_atts(['label'=>'Check Service Area'], $atts, 'cm_zip_popup_button');
        self::enqueue();
        return '<button type="button" class="cm-zip-trigger" data-cm-zip-open>'.esc_html($atts['label']).'</button>';
    }
    public static function lookup() {
        if (!check_ajax_referer('cm_zip_lookup', 'nonce', false)) { wp_send_json_error(['message'=>'Security token expired. Refresh the page.'], 403); }
        $zip = isset($_POST['zip']) ? sanitize_text_field(wp_unslash($_POST['zip'])) : '';
        if (!self::valid_zip($zip)) { wp_send_json_error(['message'=>'Please enter a valid 5-digit ZIP code.'], 400); }
        $records = self::records();
        if (!isset($records[$zip])) { wp_send_json_success(['status'=>'unlisted','city'=>'','state'=>'','landing_page'=>'']); }
        $r = $records[$zip];
        wp_send_json_success(['status'=>$r['status'],'city'=>$r['city'],'state'=>$r['state'],'landing_page'=>$r['landing_page']]);
    }
}
CM_Zip_Checker::init();
