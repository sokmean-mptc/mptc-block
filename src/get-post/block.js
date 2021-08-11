// import './style.scss'
// import './editor.scss'
import MarkText from '../components/MarkText.jsx'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.blockEditor
const { PanelBody,  __experimentalNumberControl : NumberControl } = wp.components
const { Fragment } = wp.element

registerBlockType( 'mptc-block/get-post', {
	// apiVersion: 2,
	title: __( 'Get Post', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'get post', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Get Post'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		post_id: {
            type: 'string',
			default: ''
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel,
			post_id
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
						<NumberControl
							label= { __( 'Post ID', 'egov' ) }
							value={ post_id }
							onChange={ ( value ) => setAttributes( { post_id: value } ) }
						/>	
					</PanelBody>
				</InspectorControls>
				
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
				</div>
				
			</Fragment>
		)
	},
	save: () => {
		return null
	}
} )