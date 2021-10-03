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

class Header extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/header', array(
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'className' => array(
                        'type' => 'string',
                        'default' => 'mb-0 mb-lg-4'
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
                    ),
                    'media_uploader' => array(
                        'type' => 'object',
                        'defaul' => []
                    ),
                    'media_sizes_selected' => array(
                        'type' => 'string',
                        'default' => null
                    ),
                    'media_alt' => array(
                        'type' => 'string',
                        'default' => null
                    ),
                    'xl' => array(
                        'type' => 'number',
                        'default' => 650
                    ),
                    'lg' => array(
                        'type' => 'number',
                        'default' => 620
                    ),
                    'md' => array(
                        'type' => 'number',
                        'default' => 600
                    ),
                    'sm' => array(
                        'type' => 'number',
                        'default' => 450
                    ),
                    'xs' => array(
                        'type' => 'number',
                        'default' => 300
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attr ) {
        ob_start();
        // echo '<pre>';
        // print_r($attr['media_uploader']['sizes']['full']['url']);
        // echo '</pre>';
        $image = '';
        $size = $attr['media_sizes_selected'];
        if( isset( $attr['media_uploader']['sizes'][$size]['url'] ) ) {
            $image = $attr['media_uploader']['sizes'][$size]['url'];
        }
        ?>
        <style type="text/css">
            .header-three .logo img {
                width: <?php echo $attr['xs'] ?>px;
            }
            @media (min-width: 576px) {
                .header-three .logo img {
                    width: <?php echo $attr['sm'] ?>px;
                }
            }
            @media (min-width: 768px) {
                .header-three .logo img {
                    width: <?php echo $attr['md'] ?>px;
                }
            }
            @media (min-width: 992px) {
                .header-three .logo img {
                    width: <?php echo $attr['lg'] ?>px;
                }
            }
            @media (min-width: 1200px) {
                .header-three .logo img {
                    width: <?php echo $attr['xl'] ?>px;
                }
            }
        </style>
        <section class="header-three position-relative <?php echo $attr['className'] ?>">
            <header class="container d-flex align-items-center justify-content-between px-1 px-sm-2 px-md-3 py-1 py-sm-2 py-md-3 py-lg-4">
                <figure class="d-flex mb-0 logo">
                    <a 
                        <?php
                        if ( function_exists( 'pll_home_url' ) ) :
                        ?>

                        href="<?php echo pll_home_url() ?>"
                        <?php
                        else :
                        ?>
                        href="<?php echo home_url('/') ?>"

                        <?php
                        endif
                        ?>
                    >
                        <img 
                            src="<?php echo $image ?>"
                            type="image/jpeg"   
                            alt="<?php echo $attr['media_alt'] ?>"
                        >
                    </a>
                </figure>
                <div class="d-flex align-items-center">
                    <nav class="social d-none d-lg-block me-3">
                        <?php
                        if ( has_nav_menu( $attr['menu_location'] ) ) :
                            wp_nav_menu( [
                                'menu' => $attr['menu_name'],
                                'theme_location' => $attr['menu_location'],
                                'container' => 'ul',
                                'menu_class' => 'd-flex'

                            ] );
                        endif
                        ?>
                    </nav>
                    <div class="d-none d-lg-block search-icon text-center me-3 color-gray-500" data-bs-toggle="modal" data-bs-target="#searchModal">
                        <i class="icofont-search-1"></i>
                    </div>

                    <?php if( function_exists( 'pll_the_languages' ) ) : ?>
                        <?php
                            $args = [
                                'hide_if_empty' => 0,
                                'raw' => 1
                            ];
                        ?>
                        <div class="d-none d-lg-block color-gray-500">
                            <ul class="language d-flex align-items-center">
                                <?php foreach ( pll_the_languages( $args ) as $key => $value ) : ?>
                                    <?php if ( pll_current_language() === $value['slug'] ) { ?>
                                        <li class="active"><?php echo $value['name'] ?></li>
                                    <?php } else { ?>
                                        <li><a href="<?php echo $value['url'] ?>"><?php echo $value['name'] ?></a></li>
                                    <?php } ?>
                                <?php endforeach ?>
                            </ul>
                        </div>
                    <?php endif ?>

                    <div class="mobile-toggle d-flex align-items-center d-lg-none">
                        <div class="search-icon text-center me-1 me-sm-2 me-md-2 color-gray-300" data-bs-toggle="modal" data-bs-target="#searchModal">
                        <i class="icofont-search-1"></i>
                        </div>
                        <div class="toggle-nav">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </header>
                

            <div class="container">
                <nav id="main-nav" class="nav">
                    <?php
                    if ( has_nav_menu( $attr['menu2_location'] ) ) :
                            wp_nav_menu( [
                            'menu' => $attr['menu2_name'],
                            'theme_location' => $attr['menu2_location'],
                            'container' => false,
                            'menu_class' => 'menu menu-header-three'
                        ] );
                        
                    endif
                    ?>
                </nav>
            </div>
            <div id="particles-js" class="d-flex position-absolute bottom-0 start-0 end-0"></div>
        </section>

        <?php
        return ob_get_clean();
    }
}