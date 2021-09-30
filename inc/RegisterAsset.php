<?php

/**
 * @package MPTC
 */

namespace MPTCB;

use MPTCB\Base\BaseController;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class RegisterAsset extends BaseController
{   
    public function register() {

		add_action( "init", array( $this, "registerScripts" ) );
    }
	public function registerScripts() {

		wp_register_style(
			$this->plugin_name . '-editor-css',
			$this->plugin_url . 'build/index.css',
			array( 'wp-edit-blocks' )
		);
		wp_register_script(
			$this->plugin_name . '-js',
			$this->plugin_url . 'build/index.js',
			array( 'wp-block-editor', 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-polyfill' )
		);
	}

}