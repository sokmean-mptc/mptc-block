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

class LanguageSwitcher extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/language-switcher', array(
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' )
            )
        );
    }

    public function renderPostsBlock( $attr ) {
        ob_start();
        // echo '<pre>';
        // print_r($attr['innerBlocks']);
        // echo '</pre>';
        if( function_exists( 'pll_the_languages' ) ) :
            echo '<div class="nus-language">';
                echo '<ul>';
                    foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) :
                        if ( ! $value['current_lang'] ) :
                            echo '<li>';
                                echo '<a href=" ' . $value['url'] . ' ">';
                                    echo $value['name'];
                                echo '</a>';
                            echo '</li>';
                        endif;
                    endforeach;
                echo '</ul>';
            echo '</div>';
        endif;
        return ob_get_clean();
    }
}