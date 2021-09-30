const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment, RawHTML } = wp.element

registerBlockType( 'mptc-block/nus-footer-item', {
	title: 'NUS Footer Item',
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [ 'nus footer item' ],
	parent: [ 'mptc-block/nus-footer' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
		},
		icofont: {
			type: 'string',
			default: '<i class="icofont-location-pin"></i>'
		},
		description: {
			type: 'string',
			default: 'Address Information'
		},
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			toggle_panel, 
			icofont,
			description
		} = attributes


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody 
						title={ 'Block Options' }
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>
												
						<TextControl
							label= { 'Icofont', 'mptc' }
							value={ icofont }
							onChange={ ( value ) => setAttributes( { icofont: value } ) }
						/>
						<TextareaControl
							label= { 'Description' }
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						
						
					</PanelBody>
				</InspectorControls>
				
				<li className={`d-flex align-items-baseline`}>
					<RawHTML>{icofont}</RawHTML><span><RawHTML>{description}</RawHTML></span>
				</li>
				
	
			</Fragment>
		)
	},
	save: () => {
		return null
	}
} )