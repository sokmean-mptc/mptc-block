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

class BlockTwo extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/block-two', array(
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
                        'default' => 6
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
                    'enable_thumbnail' => array(
                        'type' => 'boolean',
                        'default' => true
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
        // echo '<pre>';
        // print_r( $attr['data_slick'] );
        // echo '</pre>';
        // return ob_get_clean();
        $exclude = explode( ',', $attr['exclude'] );
        // Attributes for WP_Query class
        $args = array(
            'post_type' => $attr['post_type_selected'],
            'tax_query' => array(
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
            $data_slick = json_encode( $attr['data_slick'] );
            $data_slick = str_replace( '{', '', $data_slick );
            $data_slick = str_replace( '}', '', $data_slick );
            $row = 0;
            $col = 0;
            $col_per_row = 4;
            ?>
            <?php
            while ( $the_query->have_posts() ) :
                $the_query->the_post();
                $row ++;
                $col ++;
                ?>
                <?php if( $row == 1 ) : $col = 0; ?>
                <figure class="row g-0">
                    <?php if( $attr['enable_thumbnail'] ) : ?>
                        <div class="col-md-7 thumbnail">
                            <a href="<?php the_permalink() ?>">
                                <div class="ratio <?php echo $attr['aspectratio_xs'].' '.$attr['aspectratio_sm'].' '.$attr['aspectratio_md'].' '.$attr['aspectratio_lg'].' '.$attr['aspectratio_xl'] ?>">
                                    <div style="background-image: url('<?php the_post_thumbnail_url( $attr['thumbnail_size'] ) ?>');"></div>
                                </div>
                            </a>
                        </div>
                    <?php endif ?>

                    <figcaption class="col figcaption bg-gradient d-flex align-items-center">
                        <div class="p-1 p-sm-2 p-md-3 p-lg-4">
                            <?php if( $attr['enable_meta'] && $attr['enable_post_tag'] ) : ?>
                                <?php echo ( $this->getTheTermList( $post->ID, $this->post_tages, '<ul class="taxonomies-list list-inline p-0 mb-0 mb-sm-1 mb-lg-2"><li class="list-inline-item">', '</li><li class="list-inline-item">', '</li></ul>' ) ); ?>
                            <?php endif ?>

                            <?php if( $attr['enable_title'] ) : ?>
                                <h5 class="title double-font-size mb-0 mb-1 mb-sm-1 mb-lg-2 text-break">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php echo mb_strimwidth( get_the_title(), 0, $attr['title_length'], '...'); ?>
                                    </a>
                                </h5>
                            <?php endif ?>

                            <?php if( $attr['enable_excerpt'] ) : ?>
                                <p class="excerpt mb-0 mb-sm-1 mb-lg-2 text-break"><?php echo mb_strimwidth( get_the_excerpt(), 0, $attr['excerpt_length'], '...'); ?></p>
                            <?php endif ?>

                            <?php if( $attr['enable_meta'] ) : ?>
                                <ul class="meta list-inline mb-0">
                                    <?php if ( $attr['enable_post_date'] ) : ?>
                                        <li class="list-inline-item">
                                            <?php echo $this->getHumanPostDate() ?>
                                        </li>
                                    <?php endif ?>
                                    <?php if ( $attr['enable_post_view_count'] ) : ?>
                                        <li class="list-inline-item">
                                            <?php echo $this->getPostView() ?>
                                        </li>
                                    <?php endif ?>
                                    <?php if ( $attr['enable_post_author'] ) : ?>
                                        <li class="list-inline-item">
                                            <?php echo $this->getAuthorPostsUrl() ?>
                                        </li>
                                    <?php endif ?>
                                </ul>
                            <?php endif ?>
                        </div>
                    </figcaption>

                </figure>
                <div class="slick-slide-show" data-slick='{ <?php echo $data_slick ?>, "responsive": [ <?php echo json_encode( $attr['data_slick_md'] ) ?>, <?php echo json_encode( $attr['data_slick_sm'] ) ?>, <?php echo json_encode( $attr['data_slick_xs'] ) ?> ] }'>
                    <div>
                        <div class="row row-cols-1 row-cols-lg-2">
                <?php else : ?>
                    
                    <?php if( $col !== 1 && ( ( $col - 1 ) % $col_per_row ) === 0 ) : ?>
                        </div>
                    </div>
                    <div>
                        <div class="row row-cols-1 row-cols-lg-2">
                    <?php endif ?>

                            <div class="col">
                                <figure class="row g-2 g-sm-3">
                                    <?php if( $attr['enable_thumbnail'] ) : ?>
                                        <div class="col-4 thumbnail">
                                            <a href="<?php the_permalink() ?>">
                                                <div class="ratio <?php echo $attr['aspectratio_xs'].' '.$attr['aspectratio_sm'].' '.$attr['aspectratio_md'].' '.$attr['aspectratio_lg'].' '.$attr['aspectratio_xl'] ?>">
                                                    <div style="background-image: url('<?php the_post_thumbnail_url( $attr['thumbnail_size'] ) ?>');"></div>
                                                </div>
                                            </a>
                                        </div>
                                    <?php endif ?>

                                    <figcaption class="figcaption col">
                                        <?php if( $attr['enable_meta'] && $attr['enable_post_tag'] ) : ?>
                                            <?php echo ( $this->getTheTermList( $post->ID, $this->post_tages, '<ul class="taxonomies-list list-inline p-0 mb-0 mb-sm-1 mb-lg-2"><li class="list-inline-item">', '</li><li class="list-inline-item">', '</li></ul>' ) ); ?>
                                        <?php endif ?>

                                        <?php if( $attr['enable_title'] ) : ?>
                                            <h5 class="title mb-0 mb-1 mb-sm-1 mb-lg-2 text-break">
                                                <a href="<?php the_permalink(); ?>">
                                                    <?php echo mb_strimwidth( get_the_title(), 0, $attr['title_length'], '...'); ?>
                                                </a>
                                            </h5>
                                        <?php endif ?>

                                        <?php if( $attr['enable_excerpt'] ) : ?>
                                            <p class="excerpt mb-0 mb-sm-1 mb-lg-2 text-break"><?php echo mb_strimwidth( get_the_excerpt(), 0, $attr['excerpt_length'], '...'); ?></p>
                                        <?php endif ?>

                                        <?php if( $attr['enable_meta'] ) : ?>
                                            <ul class="meta list-inline mb-0">
                                                <?php if ( $attr['enable_post_date'] ) : ?>
                                                    <li class="list-inline-item">
                                                        <?php echo $this->getHumanPostDate() ?>
                                                    </li>
                                                <?php endif ?>
                                                <?php if ( $attr['enable_post_view_count'] ) : ?>
                                                    <li class="list-inline-item">
                                                        <?php echo $this->getPostView() ?>
                                                    </li>
                                                <?php endif ?>
                                                <?php if ( $attr['enable_post_author'] ) : ?>
                                                    <li class="list-inline-item">
                                                        <?php echo $this->getAuthorPostsUrl() ?>
                                                    </li>
                                                <?php endif ?>
                                            </ul>
                                        <?php endif ?>
                                    </figcaption>
                                </figure>
                            </div>

                    

                <?php endif ?>
            <?php endwhile ?>
                    
                        </div>
                    </div>
                </div>
        <?php endif;
        
        // Restore original Post Data
        wp_reset_postdata();

        return ob_get_clean();
    }
}