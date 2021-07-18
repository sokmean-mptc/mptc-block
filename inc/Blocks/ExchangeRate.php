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

            ?>
                <div class="<?php echo $attributes['className'] ?>">
                    <?php
                    for ( $i = 0; $i < $count; $i ++ ) {
                        ?>
                        <div class="row grid-style g-0">
                            <div class="col"><p><?php echo $data[$i]['currency'] ?></p></div>
                            <div class="col"><p><?php echo $data[$i]['symbol'] ?></p></div>
                            <div class="col"><p><?php echo $data[$i]['ask'] ?></p></div>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            <?php
        endif;

        return ob_get_clean();
    }
}