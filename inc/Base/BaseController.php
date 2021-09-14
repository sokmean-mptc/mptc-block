<?php

/**
 * @package Egov
 */

namespace MPTCB\Base;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class BaseController
{
    public $plugin_name;

    public $text_domain;

    public $plugin_path;

    public $plugin_url;

    public $plugin;

    public $meta_key_view_count;

    public $post_tages;

    public function __construct() {
        $this->plugin_name = 'mptc-block';
        $this->text_domain = 'egov';
        $this->plugin_path = plugin_dir_path( dirname( __FILE__, 2 ) );
        $this->plugin_url = plugin_dir_url( dirname( __FILE__, 2 ) );
        $this->plugin = plugin_basename( dirname( __FILE__, 3 ) );
        $this->meta_key_view_count = 'post_view_count';
        $this->post_tages = [ 'post_tag' ];
    }

    public function getHumanPostDate() {
        return '<time datetime="' . get_post_time('c', true) . '"><i class="icofont-clock-time"></i> ' . human_time_diff( get_the_time('U'), current_time('timestamp') ) . __( ' ago', 'egov' ) . '</time>';
    }

    public function getPostView() {
        return '<i class="icofont-eye-alt"></i> ' . $this->formatKMG( get_post_meta( get_the_ID(), $this->metaKeyPostViewCount( 'meta_value_num' ), true ) );
    }

    public function getAuthorPostsUrl() {
        return '<i class="icofont-user-alt-3"></i> ' . __( 'by ', 'egov' ) . '<a href="' . get_author_posts_url( get_the_author_meta('ID') ) . '"> ' . get_the_author() . '</a>';
    }

    public function getTheTermList( int $post_id, array $taxonomy, string $before = '', string $sep = '', string $after = '' ) {

        $terms = wp_get_post_terms( $post_id, $taxonomy );
 
        if ( is_wp_error( $terms ) ) {
            return $terms;
        }
    
        if ( empty( $terms ) ) {
            return false;
        }
        
        $links = array();
    
        foreach ( $terms as $term ) {
            $link = get_term_link( $term->term_id, $term->taxonomy );
            if ( is_wp_error( $link ) ) {
                return $link;
            }
            $links[] = '<a href="' . esc_url( $link ) . '" rel="tag">' . $term->name . '</a>';
        }
    
        return $before . implode( $sep, $links ) . $after;
    }

    public function formatKMG( $number = 0 ) {
        if ( ! $number ) {
            return 0;
        }
        $number_format = number_format_i18n( $number );
        $exploded = explode( ',', $number_format );
        $count = count( $exploded );

        switch ( $count ) {
            case 2:
                $value = number_format_i18n( $number/1000, 1 ) . __( 'K', 'egov' );
                break;
            case 3:
                $value = number_format_i18n( $number/1000000, 1 ) . __( 'M', 'egov' );
                break;
            case 4:
                $value = number_format_i18n( $number/1000000000, 1 ) . __( 'G', 'egov' );
                break;
            default:
                $value = $number;
        }
        return $value;
    }

    public function metaKeyPostViewCount( string $meta_value_num ) {
        $meta_key = apply_filters( 'egov_meta_value_num', $this->meta_key_view_count );
        if( $meta_value_num === 'meta_value_num' ) {
            return $meta_key;
        }
        return false;
    }
}