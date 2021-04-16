<?php
/**
 * Plugin Name: MPTC Block
 * Plugin URI: https://github.com/
 * Description: A WordPress gutenberg plugin.
 * Author: sokmean-mptc
 * Author URI: https://sokmean.com/
 * Version: 0.0.1
 * Text Domain: egov
 * Domain Path: /languages
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Egov
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . "vendor/autoload.php";

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