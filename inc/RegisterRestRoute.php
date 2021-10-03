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
		$menu = $data['name'] ?: '';
		$theme_location = $data['location'] ?: '';
		$container = $data['container'] ?: 'ul';
		$class = $data['class'] ?: '';
		$class = str_replace('%20', ' ', $class);
		if ( has_nav_menu( $theme_location ) ) :
			return wp_nav_menu( 
				[
					'menu' => $menu,
					'theme_location' => $theme_location,
					'container' => $container,
					'menu_class' => false,
					'echo' => false,
					'menu_class' => $class
	
				]
			);
		endif;
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
	
	public function languageSwitcherII( $data ) {
		$html = '';
		if( function_exists( 'pll_the_languages' ) ) :
			$local = pll_current_language() ?: 'km';
			$html .='<div class="dropdown-language">
						<div class="dropdown color-gray-500 dropup">';
							foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) :
								if ( $local === $value['slug'] ) :
			$html .=				'<div class="dropdown-active d-flex" id="dropdownLanguageFooter" data-bs-toggle="dropdown" aria-expanded="false">
										<figure class="mb-0 text-center me-1">
											<img src="'.get_stylesheet_directory_uri().'/resources/images/'.$value['slug'].'.png" alt="'.$value['name'].'">
											<figcaption>'.$value['name'].'</figcaption>
										</figure>
										<div class="align-middle">
											<i class="icofont-simple-up"></i>
										</div>
									</div>';
								endif;
							endforeach;
			$html .=		'<ul class="dropdown-menu" aria-labelledby="dropdownLanguageFooter">';
								foreach ( pll_the_languages( [ 'hide_if_empty' => 0, 'raw' => 1 ] ) as $key => $value ) :
									if ( $local != $value['slug'] ) :
			$html .=					'<li>
											<a class="dropdown-item" href="'.$value['url'].'">
												<figure class="mb-0 d-flex align-items-center">
													<img class="me-1 lh-1" height="16" src="'.get_stylesheet_directory_uri().'/resources/images/'.$value['slug'].'.png" alt="'.$value['name'].'">
													<figcaption>'.$value['name'].'</figcaption>
												</figure>
											</a>
										</li>';
									endif;
								endforeach;
			$html .=		'</ul>
						</div>
					</div>';
		endif;
		return $html;
	}

	public function languageSwitcherHeaderMPTC( $data ) {
		$html = '';
		if( function_exists( 'pll_the_languages' ) ) :
			$args = [
				'hide_if_empty' => 0,
				'raw' => 1
			];
			$html.='<div class="d-none d-lg-block color-gray-500">
				<ul class="language d-flex align-items-center">';
					foreach ( pll_the_languages( $args ) as $key => $value ) :
						if ( pll_current_language() === $value['slug'] ) {
							$html.='<li class="active">'.$value['name'].'</li>';
						} else {
							$html.='<li><a href="'.$value['url'].'">'.$value['name'].'</a></li>';
						}
					endforeach;
				$html.='</ul>
			</div>';
		endif;
		return $html;
	}

	public function registerRestRouteInit() {
		// call wp nav menu 
		register_rest_route(
			"mptc-block",
			"menu/name=(?P<name>[a-zA-Z0-9-_]+)/location=(?P<location>[a-zA-Z0-9-_]+)/container=(?P<container>[a-zA-Z0-9-]+)/class=(?P<class>$|[a-zA-Z0-9-\S]+)",
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
		
		register_rest_route(
			"mptc-block",
			"language-switcher-v2",
			[
				"methods" => 'GET',
				"callback" => [ $this, "languageSwitcherII" ],
				"permission_callback" => "__return_true"
			]
		);
		
		register_rest_route(
			"mptc-block",
			"language-switcher-header-mptc",
			[
				"methods" => 'GET',
				"callback" => [ $this, "languageSwitcherHeaderMPTC" ],
				"permission_callback" => "__return_true"
			]
		);
	}
}