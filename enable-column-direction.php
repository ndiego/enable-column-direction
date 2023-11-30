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
 * 
 * Note: Enable if not using front-end JavaScript to control column order.
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
//add_action( 'init', 'enable_column_direction_block_styles' );

/**
 * Register front-end JavaScript to reverse column direction instead of CSS. 
 * (A more accessible approach)
 * 
 * Note: Disable if not using front-end JavaScript to control column order.
 */
function enable_column_direction_frontend_scripts() {
    wp_register_script(
        'enable-column-direction-frontend-scripts', 
        plugins_url( '/build/frontend.js', __FILE__ ) 
    );
}
add_action( 'wp_enqueue_scripts', 'enable_column_direction_frontend_scripts' );

/**
 * Enqueue content assets but only in the Editor.
 * 
 * Note: Disable if not using front-end JavaScript to control column order.
 */
function enable_column_direction_enqueue_editor_content_assets() {
    if ( is_admin() ) {
        wp_enqueue_style(
            'enable-column-direction-editor-content-styles',
            plugins_url( '/build/style.css', __FILE__ )
        );
    }
}
add_action( 'enqueue_block_assets', 'enable_column_direction_enqueue_editor_content_assets' );

/**
 * Render icons on the frontend.
 */
function enable_column_direction_render_block_columns( $block_content, $block ) {
    $reverse_direction_on_mobile = isset( $block['attrs']['isReversedDirectionOnMobile'] ) ? $block['attrs']['isReversedDirectionOnMobile'] : false;
    
    if ( ! $reverse_direction_on_mobile ) {
		return $block_content;
	}

    // Since we will need the JavaScript for this block, now enqueue it.
    // Note: Remove if not using front-end JavaScript to control column order.
    wp_enqueue_script( 'enable-column-direction-frontend-scripts' );

    // Append the custom class to the block.
    $p = new WP_HTML_Tag_Processor( $block_content );
    if ( $p->next_tag() ) {
        $p->add_class( 'is-reversed-direction-on-mobile' );
    }
    $block_content = $p->get_updated_html();

	return $block_content;
}
add_filter( 'render_block_core/columns', 'enable_column_direction_render_block_columns', 10, 2 );