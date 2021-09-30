<?php

/**
 * @package MPTC
 */

namespace MPTCB;

use MPTCB\Base\BaseController;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class RegisterRestRoute extends BaseController
{    
    public function register() {

		add_action( "rest_api_init", [ $this, "registerRestRouteInit" ] );
	
    }
	public function menuCallback( $data ) {
		// ob_start();
		$theme_location = $data['name'];
		if ( has_nav_menu( $theme_location ) ) :
			return wp_nav_menu( 
				[
					'theme_location' => $theme_location,
					'container' => $data['container'],
					'menu_class' => false,
					'echo' => false
	
				]
			);
		endif;
		// ob_end_flush();
	}

	public function languageSwitcher( $data ) {
		$html = '';
		if( function_exists( 'pll_the_languages' ) ) :
			foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) :
				if ( ! $value['current_lang'] ) :
					$html .= '<li>';
					$html .= '<a href=" ' . $value['url'] . ' ">';
					$html .= $value['name'];
					$html .= '</a>';
					$html .= '</li>';
				endif;
			endforeach;
		endif;
		return $html;
	}
	public function registerRestRouteInit() {
		// call wp nav menu 
		register_rest_route(
			"mptc-block",
			"menu/name=(?P<name>[a-zA-Z0-9-_]+)/container=(?P<container>[a-zA-Z0-9-]+)",
			[
				"methods" => 'GET',
				"callback" => [ $this, "menuCallback" ],
				"permission_callback" => "__return_true"
			]
		);
		
		register_rest_route(
			"mptc-block",
			"language-switcher",
			[
				"methods" => 'GET',
				"callback" => [ $this, "languageSwitcher" ],
				"permission_callback" => "__return_true"
			]
		);
	}
}