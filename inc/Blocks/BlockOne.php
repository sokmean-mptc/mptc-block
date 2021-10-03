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

class BlockOne extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/block-one', array(
                'style'         => $this->plugin_name . '-style',
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
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
        
        // echo '<pre>';
        // print_r( $attr['data_slick'] );
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
            <div class="row row-cols-1 row-cols-lg-2 g-2 g-sm-3">
                
                <?php
                $col = 0;
                while ( $the_query->have_posts() ) :
                    $the_query->the_post();
                    $col ++;
                    ?>
                    <?php if ( $col == 1 ) : ?>
                        <div class="col">
                            <figure class="row row-cols-1 mb-0">
                                <?php if( $attr['enable_thumbnail'] ) : ?>
                                    <div class="col thumbnail mb-1 mb-sm-2 mb-lg-3">
                                        <a href="<?php the_permalink() ?>">
                                            <div class="bg-gray-100 ratio <?php echo $attr['aspectratio_xs'].' '.$attr['aspectratio_sm'].' '.$attr['aspectratio_md'].' '.$attr['aspectratio_lg'].' '.$attr['aspectratio_xl'] ?>">
                                                <div style="background-image: url('<?php the_post_thumbnail_url( $attr['thumbnail_size'] ) ?>');"></div>
                                            </div>
                                        </a>
                                    </div>
                                <?php endif ?>

                                <figcaption class="col figcaption">
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
                                </figcaption>

                            </figure>
                        </div>
                        <div class="col">
                    <?php else : ?>
                        <figure class="row g-2 g-sm-3">
                            <?php if( $attr['enable_thumbnail'] ) : ?>
                                <div class="col-4 thumbnail">
                                    <a href="<?php the_permalink() ?>">
                                        <div class="bg-gray-100 ratio <?php echo $attr['aspectratio_xs'].' '.$attr['aspectratio_sm'].' '.$attr['aspectratio_md'].' '.$attr['aspectratio_lg'].' '.$attr['aspectratio_xl'] ?>">
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
                    <?php endif ?>
                <?php endwhile ?>
                </div>
            </div>
        <?php endif;
        
        // Restore original Post Data
        wp_reset_postdata();

        return ob_get_clean();
    }
}