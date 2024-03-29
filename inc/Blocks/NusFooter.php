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

class NusFooter extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/nus-footer', array(
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'className' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'title' => array(
                        'type' => 'string',
                        'default' => 'Title'
                    ),
                    'copyright' => array(
                        'type' => 'string',
                        'default' => '&copy; Copyright'
                    ),
                    'inner_block' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'menu_name' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'menu_location' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'menu_container' => array(
                        'type' => 'string',
                        'default' => 'ul'
                    ),
                    'menu2_name' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'menu2_location' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'menu2_container' => array(
                        'type' => 'string',
                        'default' => 'ul'
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attr, $content ) {
        ob_start();
        // echo '<pre>';
        // print_r($content);
        // echo '</pre>';
        ?>
        <footer class="nus-footer bg-primary text-white">
            <div class="container">
                <div class="row">
                    <div class="text-center nus-info-wraper ">
                        <div class="nus-contact-info">
                            <h3 class="title"><?php echo $attr['title']; ?></h3>
                            <div class="d-flex justify-content-center">
                                <ul class="nus-contact-us">
                                    <?php
                                        echo $content
                                    ?>
                                </ul>
                            </div>
                        </div>
                        <div class="nus-social-nav d-flex justify-content-center">
                            <nav>
                                <?php
                                    if ( ! empty( $attr['menu_location'] ) && has_nav_menu( $attr['menu_location'] ) ) :
                                        
                                        wp_nav_menu( 
                                            [
                                            'menu' => $attr['menu_name'],
                                            'theme_location' => $attr['menu_location'],
                                            'container' => $attr['menu_container'],
                                            'menu_class' => false
                                            ]
                                        );
                                        
                                    endif;
                                ?>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nus-copyright">
                <div class="container">
                    <div class="row text-center">
                        <div class="info"><?php echo $attr['copyright']; ?></div>
                            <div class="nus-footer-nav d-flex align-items-baseline justify-content-center">
                                <nav class="nus-nav">
                                    <?php
                                    if ( ! empty( $attr['menu2_location'] ) && has_nav_menu( $attr['menu2_location'] ) ) :
                                        wp_nav_menu( 
                                            [
                                                'menu' => $attr['menu2_name'],
                                                'theme_location' => $attr['menu2_location'],
                                                'container' => $attr['menu2_container'],
                                                'menu_class' => false
                                
                                            ]
                                        );
                                    endif;
                                    ?>
                                </nav>
                                <?php
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
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <?php
        return ob_get_clean();
    }
}