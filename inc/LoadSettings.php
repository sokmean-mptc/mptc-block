<?php

/**
 * @package Egov
 */

namespace MPTCB;

use MPTCB\Base\BaseController;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class LoadSettings extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "loadTextDomain" ) );
        add_filter( 'block_categories_all', array( $this, "registerBlockCategory" ), 10, 2 );
    }

    public function loadTextDomain() {
        // register_block_type( __DIR__ );
        load_plugin_textdomain( $this->text_domain, false, $this->plugin. '/languages/' );
        $script_name = $this->plugin_name . '-js';
        wp_set_script_translations( $script_name, $this->text_domain );
    }

    public function registerBlockCategory( $categories ) {
        foreach( $categories as $item ) {
            if( $item['slug'] == $this->plugin_name ) {
                return $categories;
            }
        }
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => $this->plugin_name,
                    'title' => __( 'MPTC Block', 'egov' ),
                    'icon'  => '',
                ),
            )
        );
    }
}