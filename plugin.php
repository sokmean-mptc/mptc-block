<?php
/**
 * Plugin Name: MPTC Block
 * Plugin URI: https://github.com/
 * Description: A WordPress gutenberg plugin.
 * Author: sokmean-mptc
 * Author URI: https://sokmean.com/
 * Version: 0.0.1
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

// function add_rest_method( $endpoints ) {
//     if ( is_wp_version_compatible( '5.5' ) ) {
//         return $endpoints;
//     }
 
//     foreach ( $endpoints as $route => $handler ) {
//         if ( isset( $endpoints[ $route ][0] ) ) {
//             $endpoints[ $route ][0]['methods'] = [ WP_REST_Server::READABLE, WP_REST_Server::CREATABLE ];
//         }
//     }
 
//     return $endpoints;
// }
// add_filter( 'rest_endpoints', 'add_rest_method');