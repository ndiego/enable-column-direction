/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes( settings ) {
	if ( 'core/columns' !== settings.name ) {
		return settings;
	}

	// Add the attribute.
	const columnsAttributes = {
		isReversedDirectionOnMobile: {
			type: 'boolean',
			default: false,
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...columnsAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'enable-column-direction/add-attributes',
	addAttributes
);

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addInspectorControls( BlockEdit ) {
	return ( props ) => {
		if ( props.name !== 'core/columns' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { isReversedDirectionOnMobile } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<div class="enable-reverse-direction-container">
						<ToggleControl
							label={ __(
								'Reverse direction on mobile',
								'enable-column-direction'
							) }
							checked={ isReversedDirectionOnMobile }
							onChange={ () => {
								setAttributes( {
									isReversedDirectionOnMobile: ! isReversedDirectionOnMobile,
								} );
							} }
						/>
					</div>
				</InspectorControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'enable-column-direction/add-inspector-controls',
	addInspectorControls
);

/**
 * Add icon and position classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses( BlockListBlock ) {
	return ( props ) => {
		const { name, attributes } = props;

		if ( 'core/columns' !== name || ! attributes?.isReversedDirectionOnMobile ) {
			return <BlockListBlock { ...props } />;
		}

		const classes = classnames( props?.className, {
			'is-reversed-direction-on-mobile': attributes?.isReversedDirectionOnMobile,
		} );

		return <BlockListBlock { ...props } className={ classes } />;
	};
}

addFilter(
	'editor.BlockListBlock',
	'enable-column-direction/add-classes',
	addClasses
);
