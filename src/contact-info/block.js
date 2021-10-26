const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment, RawHTML } = wp.element

const ALLOWED_BLOCKS = [ 'mptc-block/contact-info-item' ]

registerBlockType( 'mptc-block/contact-info', {
	title: 'Contact Info',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'contact information' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
		},
		address_title: {
			type: 'string',
			default: 'Address'
		},
		google_map: {
			type: 'string'
		}
	},
	edit: ( { attributes, setAttributes } ) => {

		const { toggle_panel, address_title, google_map, className } = attributes
		
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
							label={'Address Title'}
							value={ address_title }
							onChange={ value => setAttributes( { address_title: value } ) }
						/>
						<TextareaControl
							label={'Embed Google Map'}
							value={ google_map }
							onChange={ ( value ) => setAttributes( { google_map: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={`contact-info ${className}`}>
					<div className={"block-title text-left"}>
						<h2>{ address_title }</h2>
					</div>
					<div className={"contact-info-body"}>
						<ul className={"p-0 mb-2 mb-sm-3 mb-md-4"}>
							<InnerBlocks 
								allowedBlocks={ ALLOWED_BLOCKS } 
							/>
						</ul>
						<RawHTML className={"google-map"}>{ google_map }</RawHTML>
					</div>
				</div>
			</Fragment>
		)
	},
	save: ( { attributes } ) => {
		const { address_title, google_map, className } = attributes
		return ( 
			<div className={`contact-info ${className}`}>
				<div className={"block-title text-left"}>
					<h2>{ address_title }</h2>
				</div>
				<div className={"contact-info-body"}>
					<ul className={"p-0 mb-2 mb-sm-3 mb-md-4"}>
						<InnerBlocks.Content />
					</ul>
					<RawHTML className={"google-map"}>{ google_map }</RawHTML>
				</div>
			</div>
		)
	}
} )