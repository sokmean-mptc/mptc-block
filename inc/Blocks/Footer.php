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

class Footer extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/footer', array(
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'class' => array(
                        'type' => 'string',
                        'default' => ''
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

    public function renderPostsBlock( $attr ) {
        ob_start();
        // echo '<pre>';
        // print_r($content);
        // echo '</pre>';
        ?>

        <div class="bg-gray-100">
            <footer class="container">
                <div class="d-sm-flex justify-content-sm-between align-items-center p-2 p-sm-2 p-md-3">
                    <div class="d-flex justify-content-center justify-content-sm-start">
                        <nav class="social-nav">
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
                        
                        <?php if( function_exists( 'pll_the_languages' ) ) : ?>
                            <div class="dropdown-language">
                                <div class="dropdown color-gray-500 dropup">
                                    <?php foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) : ?>
                                        <?php if ( pll_current_language() === $value['slug'] ) : ?>
                                            <div class="dropdown-active d-flex" id="dropdownLanguageFooter" data-bs-toggle="dropdown" aria-expanded="false">
                                            <figure class="mb-0 text-center me-1">
                                                <img src="<?php echo esc_attr( get_stylesheet_directory_uri() ) ?>/resources/images/<?php echo esc_attr( $value['slug'] ) ?>.png" alt="<?php echo $value['name'] ?>">
                                                <figcaption><?php echo $value['name'] ?></figcaption>
                                            </figure>
                                            <div class="align-middle">
                                                <i class="icofont-simple-up"></i>
                                            </div>
                                            </div>
                                        <?php endif ?>
                                    <?php endforeach ?>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownLanguageFooter">
                                        <?php foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) : ?>
                                            <?php if ( pll_current_language() != $value['slug'] ) : ?>
                                                <li>
                                                    <a class="dropdown-item" href="<?php echo esc_attr( $value['url'] ) ?>">
                                                        <figure class="mb-0 d-flex align-items-center">
                                                            <img class="me-1 lh-1" height="16" src="<?php echo esc_attr( get_stylesheet_directory_uri() ) ?>/resources/images/<?php echo $value['slug'] ?>.png" alt="<?php echo $value['name'] ?>">
                                                            <figcaption><?php echo $value['name'] ?></figcaption>
                                                        </figure>
                                                    </a>
                                                </li>
                                            <?php endif ?>
                                        <?php endforeach ?>
                                    </ul>
                                </div>
                            </div>
                        <?php endif ?>
                    </div>
                    <nav class="footer-nav d-flex justify-content-center justify-content-sm-start">
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
                </div>
                <hr class="color-gray-400 m-0"/>
                <div class="copyright text-center color-gray-600 p-1 p-sm-2 p-md-3">
                    <?php echo $attr['copyright']; ?>
                </div>
            </footer>
        </div>

        <?php
        return ob_get_clean();
    }
}