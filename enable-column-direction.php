<?php
/**
 * Plugin Name:         Enable Column Direction
 * Plugin URI:          https://www.nickdiego.com/
 * Description:         Adds a toggle to Columns blocks that allows you to reverse the column direction on mobile devices.
 * Version:             0.1.0
 * Requires at least:   6.3
 * Requires PHP:        7.4
 * Author:              Nick Diego
 * Author URI:          https://www.nickdiego.com
 * License:             GPLv2
 * License URI:         https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:         enable-column-direction
 * Domain Path:         /languages
 *
 * @package enable-column-direction
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Editor scripts and styles.
 */
function enable_column_direction_enqueue_block_editor_assets() {
	$plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
	$plugin_url  = untrailingslashit( plugin_dir_url( __FILE__ ) );
	$asset_file  = include untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/build/index.asset.php';

	wp_enqueue_script(
		'enable-column-direction-editor-scripts',
		$plugin_url . '/build/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

    wp_set_script_translations(
        'enable-column-direction-editor-scripts',
        'enable-column-direction',
        $plugin_path . '/languages'
    );

	wp_enqueue_style(
		'enable-column-direction-editor-styles',
		$plugin_url . '/build/editor.css'
	);
}
add_action( 'enqueue_block_editor_assets', 'enable_column_direction_enqueue_block_editor_assets' );

/**
 * Enqueue block styles 
 * (Applies to both frontend and Editor)
 */
function enable_column_direction_block_styles() {
    $plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
	$plugin_url  = untrailingslashit( plugin_dir_url( __FILE__ ) );

    wp_enqueue_block_style(
        'core/columns',
        array(
            'handle' => 'enable-column-direction-block-styles',
            'src'    => $plugin_url . '/build/style.css',
            'ver'    => wp_get_theme()->get( 'Version' ),
            'path'   => $plugin_path . '/build/style.css',
        )
    );
}
add_action( 'init', 'enable_column_direction_block_styles' );

/**
 * Enqueue frontend JavaScript to reverse column direction instead of CSS. 
 * (A more accessible approach)
 */
function enable_column_direction_frontend_scripts() {
    wp_enqueue_script(
        'my-custom-script', 
        plugins_url( '/build/frontend.js', __FILE__ ) 
    );
}
//add_action( 'wp_enqueue_scripts', 'enable_column_direction_frontend_scripts' );

/**
 * Render icons on the frontend.
 */
function enable_column_direction_render_block_columns( $block_content, $block ) {
    $reverse_direction_on_mobile = isset( $block['attrs']['isReversedDirectionOnMobile'] ) ? $block['attrs']['isReversedDirectionOnMobile'] : false;
    
    if ( ! $reverse_direction_on_mobile ) {
		return $block_content;
	}

    // Append the custom class to the block.
    $p = new WP_HTML_Tag_Processor( $block_content );
    if ( $p->next_tag() ) {
        $p->add_class( 'is-reversed-direction-on-mobile' );
    }
    $block_content = $p->get_updated_html();

	return $block_content;
}
add_filter( 'render_block_core/columns', 'enable_column_direction_render_block_columns', 10, 2 );