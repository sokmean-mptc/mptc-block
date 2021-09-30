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

class Section extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/section', array(
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
                        'type' => 'string',
                        'default' => ''
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
                    'enable_title' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'title' => array(
                        'type' => 'string',
                        'default' => 'Title'
                    ),
                    'enable_option_1' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'option_1_title' => array(
                        'type' => 'string',
                        'default' => 'Option 1'
                    ),
                    'enable_option_2' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'option_2_title' => array(
                        'type' => 'string',
                        'default' => 'Option 2'
                    ),
                    'enable_value' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'value' => array(
                        'type' => 'string',
                        'default' => 'Value'
                    ),
                    'item_to_show' => array(
                        'type' => 'number',
                        'default' => 8
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
                    'className' => array(
                        'type' => 'string',
                        'default' => ''
                    )
                )
            )
        );
    }

    public function renderPostsBlock( $attributes ) {
        ob_start();
        // echo '<pre>';
        // print_r( $attributes );
        // echo '</pre>';
        
        // Attributes for WP_Query class
        $args = array(
            'post_type' => $attributes['post_type_selected'],
            'tax_query' => array(
                array(
                    'taxonomy' => $attributes['taxonomy_selected'],
                    'field'    => 'id',
                    'terms'    => $attributes['term_selected']
                ),
            ),
            'orderby' => $attributes['order_by'],
            'order' => $attributes['order'],
            'posts_per_page' => $attributes['posts_per_page'],
            'offset' => $attributes['offset']
        );


        // The Query
        $the_query = new \WP_Query( $args );
        
        // The Loop
        if ( $the_query->have_posts() ) {
            
        
        
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                
                $items = get_post_meta( get_the_ID(), 'cam_group_items', true );
                // echo '<pre>';
                // print_r( $items );
                // echo '</pre>';
                if ( is_array( $items ) ) :
                    $count = count( $items );
                    $count = ( $attributes['item_to_show'] > $count || $attributes['item_to_show'] == -1 ) ? $count : $attributes['item_to_show'];
                    echo '<table class="table '.$attributes['className'].'">';
                    echo '<thead><tr>';
                    echo $attributes['enable_title'] ? '<th scope="col">'. $attributes['title'] .'</th>' : '';
                    echo $attributes['enable_option_1'] ? '<th scope="col">'. $attributes['option_1_title'] .'</th>' : '';
                    echo $attributes['enable_option_2'] ? '<th scope="col">'. $attributes['option_2_title'] .'</th>' : '';
                    echo $attributes['enable_value'] ? '<th scope="col">'. $attributes['value'] .'</th>' : '';
                    echo '</tr></thead><tbody>';
                    for( $i = 0; $i < $count; $i++ ) {
                        echo '<tr>';			
                        echo $attributes['enable_title'] ? '<td>'. $items[$i]['title'] .'</td>' : '';
                        echo $attributes['enable_option_1'] ? '<td>'. $items[$i]['option-1'] .'</td>' : '';
                        echo $attributes['enable_option_2'] ? '<td>'. $items[$i]['option-2'] .'</td>' : '';
                        echo $attributes['enable_value'] ? '<td>'. $items[$i]['value'] .'</td>' : '';
                        echo '</tr>';
                        
                    }
                    echo '</tbody></table>';
                endif;
            }
       
        }
        // Restore original Post Data
        wp_reset_postdata();

        return ob_get_clean();
    }
}