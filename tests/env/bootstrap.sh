#!/usr/bin/env bash
# Builds a disposable local WordPress (SQLite, no MySQL needed) for testing the plugin.
# Usage: tests/env/bootstrap.sh <empty_work_dir> [plugin_dir]
# Then:  php -S 127.0.0.1:8899 -t <work_dir>/site tests/env/router.php
set -euo pipefail
WORK=$(mkdir -p "$1" && cd "$1" && pwd)
HERE=$(cd "$(dirname "$0")" && pwd)
PLUGIN=${2:-$HERE/../../cm-zip-checker}
WP_TAG=${WP_TAG:-7.1.3}
SQLITE_TAG=${SQLITE_TAG:-v3.1.0}
SITE=$WORK/site

[ -d "$WORK/wp" ] || git clone -q -c advice.detachedHead=false --depth 1 --branch "$WP_TAG" https://github.com/WordPress/WordPress "$WORK/wp"
[ -d "$WORK/sqlite" ] || git clone -q -c advice.detachedHead=false --depth 1 --branch "$SQLITE_TAG" https://github.com/WordPress/sqlite-database-integration "$WORK/sqlite"

rm -rf "$SITE" && mkdir -p "$SITE" && cp -a "$WORK/wp/." "$SITE/" && rm -rf "$SITE/.git"
SQ=$SITE/wp-content/plugins/sqlite-database-integration
cp -rL "$WORK/sqlite/packages/plugin-sqlite-database-integration" "$SQ"
sed -e "s#{SQLITE_IMPLEMENTATION_FOLDER_PATH}#$SQ#" -e "s#{SQLITE_PLUGIN}#sqlite-database-integration/load.php#g" "$SQ/db.copy" > "$SITE/wp-content/db.php"
mkdir -p "$SITE/wp-content/database" "$SITE/wp-content/mu-plugins"
cp "$HERE/wp-config.php" "$SITE/wp-config.php"
cp "$HERE/cm-test-env.php" "$SITE/wp-content/mu-plugins/cm-test-env.php"
mkdir -p "$SITE/wp-content/mu-plugins/cm-test-theme"
cp "$HERE/../fixtures/theme/"*.css "$HERE/../../docs/theme-patch/chicagomounting-button-btn.css" "$SITE/wp-content/mu-plugins/cm-test-theme/"
cp -a "$PLUGIN" "$SITE/wp-content/plugins/cm-zip-checker"
php "$HERE/install.php" "$SITE"
php "$HERE/setup-content.php" "$SITE"
echo "Site ready: $SITE"
