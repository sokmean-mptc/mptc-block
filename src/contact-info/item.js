const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment, RawHTML } = wp.element

registerBlockType( 'mptc-block/contact-info-item', {
	title: 'Contact Info Item',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'contact information item' ],
	parent: [ 'mptc-block/contact-info' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
		},
		icon: {
			type: 'string',
			default: '<i class="icofont-location-pin"></i>'
		},
		info: {
			type: 'string',
			default: 'Address Information'
		}
	},
	edit: ( { attributes, setAttributes } ) => {

		const { toggle_panel, icon, info, className } = attributes
		
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
							label={'Ico Font'}
							value={ icon }
							onChange={ value => setAttributes( { icon: value } ) }
						/>
						<TextareaControl
							label={'Information'}
							value={ info }
							onChange={ ( value ) => setAttributes( { info: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			
				<li className={`d-flex align-items-baseline ${className}`}><RawHTML>{ icon }</RawHTML><span className={"ms-2 mb-2"}><RawHTML>{ info }</RawHTML></span></li>
							
			</Fragment>
		)
	},
	save: ( { attributes } ) => {
		const { icon, info, className } = attributes
		return (
			<li className={`d-flex align-items-baseline ${className}`}><RawHTML>{ icon }</RawHTML><span className={"ms-2 mb-2"}><RawHTML>{ info }</RawHTML></span></li>
		)
	}
} )