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

class BlockRender extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/block-render', array(
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
                        'default' => 1
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
                    'enable_title' => array(
                        'type' => 'boolean',
                        'default' => true
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
        // $blocks = parse_blocks( $post->post_content );
        // print_r($blocks);


        
        // The Loop
        if ( $the_query->have_posts() ) :
            
         
            ?>
                
                <?php
                while ( $the_query->have_posts() ) :
                    $the_query->the_post();
                    $blocks = parse_blocks( get_the_content() );
                    ?>
                    <div class="<?php echo $attr['className'] ?>">
                        <?php 
                        if( $attr['enable_title'] ) :
                        ?>
                        <div class="wp-block-mptc-block-block-title block-title text-left mb-1 mb-sm-2 mb-md-3 mb-lg-4">
                            <h2><?php the_title() ?></h2>
                        </div>
                        <?php
                        endif;
                        foreach( $blocks as $block ) {
                            echo render_block( $block );
                        }
                        ?>
                        </div>
                    <?php
                ?>
                    
               
                <?php endwhile ?>
        <?php endif;
        
        // Restore original Post Data
        wp_reset_postdata();

        return ob_get_clean();
    }
}