<?php
/**
 * Plugin Name: MPTC Block
 * Plugin URI: https://github.com/
 * Description: A WordPress gutenberg plugin.
 * Author: sokmean-mptc
 * Author URI: https://sokmean.com/
 * Version: 1.0.0
 * Text Domain: mptc
 * Domain Path: /languages
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package MPTC
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if (! file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.'));
}
require $composer;

function mptc_block_activate() {
	MPTCB\Base\Activate::activate();
}
register_activation_hook( __FILE__, "mptc_block_activate" );

function mptc_block_deactivate() {
	MPTCB\Base\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, "mptc_block_deactivate" );

if( class_exists( "MPTCB\\Init" ) ) {
	MPTCB\Init::registerServices();
}
