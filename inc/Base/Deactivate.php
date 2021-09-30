<?php

/**
 * @package MPTC
 */

namespace MPTCB\Base;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Deactivate
{
    public static function deactivate() {
    
        flush_rewrite_rules();

    }
}