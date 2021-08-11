<?php

/**
 * @package Egov
 */

namespace MPTCB\Blocks;

use MPTCB\Base\BaseController;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NusFooterItem extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/nus-footer-item', array(
                // 'api_version'   => 1,
                'parent'        => ['mptc-block/nus-footer'],
                'style'         => $this->plugin_name . '-style',
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'className' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'icofont' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'description' => array(
                        'type' => 'string',
                        'default' => ''
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attr ) {
        ob_start();
        
        // echo '<pre>';
        // print_r( $attr['data_slick'] );
        // echo '</pre>';
        // return ob_get_clean();
        ?>
        <li class="d-flex align-items-baseline"><?php echo $attr['icofont'] ?><span><?php echo $attr['description'] ?></span></li>
        <?php

        return ob_get_clean();
    }
}