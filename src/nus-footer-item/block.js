// import './style.scss'
// import './editor.scss'
import MarkText from '../components/MarkText.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment } = wp.element

registerBlockType( 'mptc-block/nus-footer-item', {
	// apiVersion: 2,
	title: __( 'NUS Footer Item', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'nus footer item', 'egov' )
	],
	parent: [ 'mptc-block/nus-footer' ],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'NUS Item'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		icofont: {
			type: 'string',
			default: ''
		},
		description: {
			type: 'string',
			default: ''
		},
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel, 
			icofont,
			description
		} = attributes

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<MarkText
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					</PanelBody>
					<PanelBody 
						title={ __( 'Block Options', 'egov' ) }
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>
												
						<TextControl
							label= { __( 'Icofont', 'egov' ) }
							value={ icofont }
							onChange={ ( value ) => setAttributes( { icofont: value } ) }
						/>
						<TextareaControl
							label= { __( 'Description', 'egov' ) }
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						
						
					</PanelBody>
				</InspectorControls>
				
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
				</div>
				
			</Fragment>
		)
	},
	save: ( { attributes, className } ) => {
		const add_class = className ? className : ''
		const {
			icofont,
			description
		} = attributes
			
		return (
			null
		)		
	}
} )