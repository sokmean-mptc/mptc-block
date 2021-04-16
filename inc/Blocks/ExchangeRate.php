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

class ExchangeRate extends BaseController
{
    public function register() {
        add_action( "init", array( $this, "registerBlock" ) );
    }

    public function registerBlock() {
        register_block_type(
            $this->plugin_name . '/exchange-rate', array(
                'style'         => $this->plugin_name . '-style',
                'editor_script' => $this->plugin_name . '-js',
                'editor_style'  => $this->plugin_name . '-editor-css',
                'render_callback' => array( $this, 'renderPostsBlock' ),
                'attributes' => array(
                    'api' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'item_to_show' => array(
                        'type' => 'number',
                        'default' => 8
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
        
        $url = $attributes['api'];
        if ( $url != '' ) :
            $json = file_get_contents( $url );
            $json_data = json_decode( $json, true );
            $data = $json_data['data'];
            
            $count = count( $data );
            $count = ( $attributes['item_to_show'] > $count || $attributes['item_to_show'] == -1 ) ? $count : $attributes['item_to_show'];

            echo '<table class="table '.$attributes['className'].'"><thead><tr>';
            echo '<th scope="col">';
            echo __( 'Currency/Unit', 'egov' );
            echo '</th>';
            echo '<th scope="col">';
            echo __( 'Buy', 'egov' );
            echo '</th>';
            echo '</tr></thead><tbody>';
            for ( $i = 0; $i < $count; $i ++ ) {
                echo '<tr>';
                echo '<td>';
                echo $data[$i]['currency'] .' <sup class="text-muted">('. $data[$i]['symbol'] .')</sup> / '.$data[$i]['unit'];
                echo '</td>';
                echo '<td>';
                echo $data[$i]['ask'];
                echo '</td>';
                echo '</tr>';
            }
            echo '</tbody></table>';
        endif;

        return ob_get_clean();
    }
}