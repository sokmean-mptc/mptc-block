const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette } = wp.blockEditor;
const { PanelBody, TextControl, RadioControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
import SingleTerm from '../components/SingleTerm.jsx'

import './style.scss';
import './editor.scss';

registerBlockType( 'mptc-block/block-title', {
	title: __( 'Block Title', 'mptc' ),
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [
		__( 'block title', 'mptc' )
	],
	attributes: {
		title: {
            type: 'string',
			default: 'Block Title'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		link: {
			type: 'string',
			default: ''
		},
		custom_link: {
			type: 'string',
			default: ''
		},
		enable_custom_link: {
			type: 'boolean',
			default: false
		},
		align: {
			type: 'string',
			default: 'text-center'
		},
		color: {
			type: 'string',
			default: ''
		},
		post_type: {
			type: 'array',
			default: []
		},
		post_type_selected: {
			type: 'string',
			default: ''
		},
		taxonomy: {
			type: 'array',
			default: []
		},
		taxonomy_selected: {
			type: 'string',
			default: ''
		},
		term: {
			type: 'array',
			default: []
		},
		term_selected: {
			type: 'string',
			default: ''
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const { title, link, align, color, toggle_panel, enable_custom_link, taxonomy_selected, term_selected, term, custom_link } = attributes
		
		if ( enable_custom_link ) {
			if ( custom_link != '' ) {
				setAttributes( { link: custom_link } )
			} else {
				setAttributes( { link: '' } )
			}
		} else {
			if( term_selected != '' ) {
				let tax = taxonomy_selected
				switch ( tax ) {
					case 'category':
						tax = 'categories'
						break
					case 'post_tag':
						tax = 'tags'
						break
					case 'types':
						tax = 'section-types'
						break
				}
				wp.apiFetch ( {
					url: '/wp-json/wp/v2/'+tax+'?per_page=-1'
				} ).then( data => {
					for ( const key in data ) {
						if ( data.hasOwnProperty( key ) ) {
							const element = data[key]
							if ( element.id == term_selected ) {
								setAttributes( { link: element.link } )
							}
						}	
					}
				} )
			} else {
				setAttributes( { link: '' } )
			}
		}
		
		console.log( link )
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Block Options', 'mptc' ) }
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>
						<TextControl
							label= { __( 'Block Title', 'mptc' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<SingleTerm 
							attributes={attributes}
							setAttributes={setAttributes}
						/>
						<br/>
						<ToggleControl
							label= { __( 'Or Use Custom Link', 'mptc' ) }
							checked={ enable_custom_link }
							onChange={ ( value ) => setAttributes( { enable_custom_link: value } ) }
						/>
						<TextControl
							disabled={ ! enable_custom_link }
							value={ custom_link }
							onChange={ ( value ) => setAttributes( { custom_link: value } ) }
						/>
						<RadioControl
							label={ __( 'Align', 'mptc' )}
							selected={ align }
							options={ [
								{ label: __( 'Align Left', 'mptc' ), value: 'text-left' },
								{ label: __( 'Align Center', 'mptc' ), value: 'text-center' },
								{ label: __( 'Align Right', 'mptc' ), value: 'text-right' }
							] }
							onChange={ ( option ) => { setAttributes( { align: option } ) } }
						/>
						<ColorPalette
							color={ '' }
							value={ color }
							onChange={ ( value ) => { setAttributes( { color: value } ) } }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ 'border p-3' }>
					<small>{ title }</small>
				</div>
			</Fragment>
		)
	},
	
	save: ( { attributes } ) => {
		const { title, link, align, color, className } = attributes
		const advanced_class = className ? className : ''
		return (
			<div className={ `block-title ${align} ${advanced_class}` }>
			{ !! link &&
				<h2>
					<a href={ link } style={ { color: color } }>
						{ title }
					</a>
				</h2>
			}
			{ ! link &&
					<h2 style={ { color: color } }>
						{ title }
					</h2>
			}
			</div>
		)
	}
} )
