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

class SlideShow extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/slideshow', array(
                'style'         => $this->plugin_name . '-style',
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'adaptive_height' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'mobile_first' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'dots' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'autoplay' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'autoplay_speed' => array(
                        'type' => 'number',
                        'default' => 5000
                    ),
                    'arrows' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'post_type' => array(
                        'type' => 'object',
                        'default' => array()
                    ),
                    'post_type_selected' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'taxonomy' => array(
                        'type' => 'object',
                        'default' => array()
                    ),
                    'taxonomy_selected' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'term' => array(
                        'type' => 'object',
                        'default' => array()
                    ),
                    'term_selected' => array(
                        'type' => 'object',
                        'default' => array()
                    ),
                    'posts_per_page' => array(
                        'type' => 'number',
                        'default' => 5
                    ),
                    'offset' => array(
                        'type' => 'number',
                        'default' => 0
                    ),
                    'order_by' => array(
                        'type' => 'string',
                        'default' => 'date'
                    ),
                    'order' => array(
                        'type' => 'string',
                        'default' => 'DESC'
                    ),
                    'thumbnail_size' => array(
                        'type' => 'string',
                        'default' => 'medium'
                    ),
                    'enable_title' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'title_length' => array(
                        'type' => 'number',
                        'default' => 200
                    ),
                    'enable_excerpt' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'excerpt_length' => array(
                        'type' => 'number',
                        'default' => 250
                    ),
                    'enable_meta' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'enable_post_date' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'enable_post_author' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'enable_post_read_more' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'enable_post_view_count' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'enable_post_tag' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'style' => array(
                        'type' => 'string',
                        'default' => '1'
                    ),
                    'aspectratio_xs' => array(
                        'type' => 'string',
                        'default' => 'ratio-16x9'
                    ),
                    'aspectratio_sm' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'aspectratio_md' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'aspectratio_lg' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'aspectratio_xl' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'className' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'exclude' => array(
                        'type' => 'string',
                        'default' => ''
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attr ) {
        ob_start();
        if ( ! isset( $attr['data_slick'] ) ) { $attr['data_slick'] = (object)[ 'arrows' => true ]; }
        if ( ! isset( $attr['data_slick_md'] ) ) { $attr['data_slick_md'] = (object)[]; }
        if ( ! isset( $attr['data_slick_sm'] ) ) { $attr['data_slick_sm'] = (object)[]; }
        if ( ! isset( $attr['data_slick_xs'] ) ) { $attr['data_slick_xs'] = (object)[]; }

        $data_slick = json_encode( $attr['data_slick'] );
        $data_slick = str_replace( '{', '', $data_slick );
        $data_slick = str_replace( '}', '', $data_slick );
        
        // echo '<pre>';
        // print_r( $attr );
        // echo '</pre>';
        // return ob_get_clean();
        
        $exclude = explode( ',', $attr['exclude'] );

        // Attributes for WP_Query class
        $args = array(
            'post_type' => $attr['post_type_selected'],
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => $attr['taxonomy_selected'],
                    'field'    => 'term_id',
                    'terms'    => $attr['term_selected']
                ),
                array(
                    'taxonomy' => $attr['taxonomy_selected'],
                    'field'    => 'term_id',
                    'terms'    => $exclude,
                    'operator' => 'NOT IN'
                )
            ),
            'orderby' => $attr['order_by'],
            'order' => $attr['order'],
            'posts_per_page' => $attr['posts_per_page'],
            'offset' => $attr['offset']
        );

        // The Query
        $the_query = new \WP_Query( $args );
        global $post;
        
        // The Loop
        if ( $the_query->have_posts() ) :
         
            ?>
            <div class="slide-show slick-slide-show"  data-slick='{ <?php echo $data_slick ?>, "responsive": [ <?php echo json_encode( $attr['data_slick_md'] ) ?>, <?php echo json_encode( $attr['data_slick_sm'] ) ?>, <?php echo json_encode( $attr['data_slick_xs'] ) ?> ] }'>
            <?php
                while ( $the_query->have_posts() ) :
                    $the_query->the_post();
                    ?>
                    <div class="d-block">
                        <figure class="<?php if( $attr['style'] == '1' ) { echo 'row'; } ?> g-0 mb-0 position-relative">
                            <div class="<?php if( $attr['style'] == '1' ) { echo 'col-lg-7'; } ?> thumbnail">
                                <div class="bg-gray-100 ratio <?php echo $attr['aspectratio_xs'].' '.$attr['aspectratio_sm'].' '.$attr['aspectratio_md'].' '.$attr['aspectratio_lg'].' '.$attr['aspectratio_xl'] ?>">
                                    <div style="background-image: url(<?php the_post_thumbnail_url( $attr['thumbnail_size'] ) ?>);"></div>
                                </div>
                            </div>
                            <figcaption class="<?php if( $attr['style'] == '2' ) { echo 'position-absolute bottom-0'; } ?> <?php if( $attr['style'] == '1' ) { echo 'col bg-gradient'; } ?> d-flex align-items-center">
                                <div class="caption p-1 p-sm-1 p-md-2 p-lg-4">
                                    <?php if( $attr['enable_meta'] && $attr['enable_post_tag'] ) : ?>

                                        <?php echo ( $this->getTheTermList( $post->ID, $this->post_tages, '<ul class="taxonomies-list list-unstyled p-0 m-0"><li>', '</li><li>', '</li></ul>' ) ); ?>
                                        
                                    <?php endif ?>
                                    <?php if( $attr['enable_title'] ) : ?>
                                        <h3 class="title text-break my-0 my-md-1">
                                            <a class="color-white" href="<?php the_permalink(); ?>">
                                                <?php echo mb_strimwidth( get_the_title(), 0, $attr['title_length'], '...'); ?>
                                            </a>
                                        </h3>
                                    <?php endif ?>
                                    <?php if( $attr['enable_meta'] ) : ?>
                                        <ul class="meta list-unstyled p-0 m-0">
                                            <?php if ( $attr['enable_post_date'] ) : ?>
                                                <li>
                                                    <?php echo $this->getHumanPostDate() ?>
                                                </li>
                                            <?php endif ?>
                                            <?php if ( $attr['enable_post_view_count'] ) : ?>
                                                <li>
                                                    <?php echo $this->getPostView() ?>
                                                </li>
                                            <?php endif ?>
                                            <?php if ( $attr['enable_post_author'] ) : ?>
                                                <li>
                                                    <?php echo $this->getAuthorPostsUrl() ?>
                                                </li>
                                            <?php endif ?>
                                        </ul>
                                    <?php endif ?>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                <?php endwhile ?>
            </div>
        <?php endif;
        
        // Restore original Post Data
        wp_reset_postdata();

        return ob_get_clean();
    }
}