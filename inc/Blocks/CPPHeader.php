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

class CPPHeader extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/cpp-header', array(
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'className' => array(
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
                        'default' => 380
                    ),
                    'lg' => array(
                        'type' => 'number',
                        'default' => 380
                    ),
                    'md' => array(
                        'type' => 'number',
                        'default' => 80
                    ),
                    'sm' => array(
                        'type' => 'number',
                        'default' => 60
                    ),
                    'xs' => array(
                        'type' => 'number',
                        'default' => 60
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
            .header-cpp header {
                height: <?php echo $attr['xs'] ?>px;
            }
            @media (min-width: 576px) {
                .header-cpp header {
                    height: <?php echo $attr['sm'] ?>px;
                }
            }
            @media (min-width: 768px) {
                .header-cpp header {
                    height: <?php echo $attr['md'] ?>px;
                }
            }
            @media (min-width: 992px) {
                .header-cpp header {
                    height: <?php echo $attr['lg'] ?>px;
                }
            }
            @media (min-width: 1200px) {
                .header-cpp header {
                    height: <?php echo $attr['xl'] ?>px;
                }
            }
        </style>
        <section class="header-cpp position-relative <?php echo $attr['className'] ?>">
            <header 
                class="px-1 px-sm-2 px-md-3 py-1 py-sm-2 py-md-3 py-lg-4"
                style="background-image: url(<?php echo $image ?>);"
            >
                <div class="container d-flex justify-content-between align-items-center align-items-lg-start h-100">
                    <div class="align-items-center"></div>
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
                        <div class="d-none d-lg-block search-icon text-center me-3 color-gray-100" data-bs-toggle="modal" data-bs-target="#searchModal">
                            <i class="icofont-search-1"></i>
                        </div>

                        <?php if( function_exists( 'pll_the_languages' ) ) : ?>
                            <?php
                                $args = [
                                    'hide_if_empty' => 0,
                                    'raw' => 1
                                ];
                            ?>
                            <div class="d-none d-lg-block color-gray-100">
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
        </section>

        <?php
        return ob_get_clean();
    }
}