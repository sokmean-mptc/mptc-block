// import './style.scss'
// import './editor.scss'
import MarkText from '../components/MarkText.jsx'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment } = wp.element
const ALLOWED_BLOCKS = [ 'mptc-block/nus-footer-item' ]

registerBlockType( 'mptc-block/nus-footer', {
	// apiVersion: 2,
	title: __( 'NUS Footer', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'nus footer', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'NUS Footer'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		title: {
            type: 'string',
			default: 'Title'
		},
		copyright: {
            type: 'string',
			default: '&copy; Copyright'
		},
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel,
			title,
			copyright
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
							label= { __( 'Title', 'egov' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>		
						<TextareaControl
							label= { __( 'Copyright', 'egov' ) }
							value={ copyright }
							onChange={ ( value ) => setAttributes( { copyright: value } ) }
						/>		
					</PanelBody>
				</InspectorControls>
				
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
					<InnerBlocks  
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
				
			</Fragment>
		)
	},
	save: () => {
		return (
			<InnerBlocks.Content />
		)	
	}
} )