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

class RegisterAsset extends BaseController
{    
    public function register() {

		add_action( "init", array( $this, "registerScripts" ) );
		// add_action( "wp_enqueue_scripts", array( $this, "enqueueEditorAssets" ) );
		add_action( "enqueue_block_editor_assets", array( $this, "enqueueEditorAssets" ) );
	
    }
	public function registerScripts() {
		wp_register_style(
			$this->plugin_name . '-editor-style',
			$this->plugin_url . 'build/index.css',
			array( 'wp-edit-blocks' )
		);
		wp_register_script(
			$this->plugin_name . '-js',
			$this->plugin_url . 'build/index.js',
			array( 'wp-blocks', 'wp-plugins', 'wp-i18n', 'wp-element', 'wp-block-editor' )
		);
	}
    public function enqueueEditorAssets() {
		
		wp_enqueue_style( $this->plugin_name . '-editor-style' );
		wp_enqueue_script( $this->plugin_name . '-js' );
		
	}
}