<?php
// Appended to the existing active theme functions.php, after its existing code.
// Rollback: remove only this filter. No plugin files or unrelated theme code change.
add_filter('term_link', function ($url, $term, $taxonomy) {
    if ('category' !== $taxonomy || 144 !== (int) $term->term_id) {
        return $url;
    }
    $catalogue = get_post(15716);
    if (!$catalogue || 'publish' !== $catalogue->post_status || 'page' !== $catalogue->post_type) {
        return $url;
    }
    return get_permalink($catalogue);
}, 10, 3);
