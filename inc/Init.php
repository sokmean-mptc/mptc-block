<?php

/**
 * @package MPTC
 */

namespace MPTCB;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Init
{
    function __construct() {

    }

    public static function getServices() {
        return [
            LoadSettings::class,
            RegisterAsset::class,
            RegisterRestRoute::class,
            Blocks\SlideShow::class,
            Blocks\SlideList::class,
            Blocks\BlockOne::class,
            Blocks\BlockTwo::class,
            Blocks\BlockRender::class,
            Blocks\ExchangeRate::class,
            Blocks\NusFooterItem::class,
            Blocks\NusFooter::class,
            Blocks\Footer::class,
            Blocks\Header::class
        ];
    }

    public static function registerServices() {
        foreach( self::getServices() as $class ) {
            $service = self::instantiate( $class );
            if( method_exists( $service, "register" ) ) {
                $service->register();
            }
        }
    }

    private static function instantiate( $class ) {
        $service = new $class();
        return $service;
    }
}