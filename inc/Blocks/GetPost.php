<?php

/**
 * @package MPTC
 */

namespace MPTCB\Blocks;

use MPTCB\Base\BaseController;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GetPost extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/get-post', array(
                // 'api_version'   => 1,
                'style'         => $this->plugin_name . '-style',
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'className' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'post_id' => array(
                        'type' => 'string'
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attr ) {
        ob_start();
        $p = get_post( $attr['post_id'] );
        $b = parse_blocks( $p->post_content );
        // echo( $p->post_content );
        foreach( $b as $item ) {
            echo render_block($item);
            // foreach( $item['innerBlocks'] as $x ) {
            //     echo render_block($x);
                
            // }

        }
        // echo '<pre>';
        // print_r( $b );
        // echo '</pre>';
        return ob_get_clean();
    }
}