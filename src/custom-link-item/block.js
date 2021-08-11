import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import CustomMediaUpload from '../components/CustomMediaUpload.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, SelectControl, TextareaControl } = wp.components
const { Fragment } = wp.element

registerBlockType( 'mptc-block/custom-link-item', {
	title: __( 'Custom Link Item', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'custom link item', 'egov' )
	],
	parent: [ 'mptc-block/custom-link' ],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Custom Link Item'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		media_uploader: {
			type: 'object',
			default: {}
		},
		media_alt: {
			type: 'string',
			default: null
		},
		media_sizes: {
			type: 'array',
			default: []
		},
		media_sizes_selected: {
			type: 'string',
			default: ''
		},
		title: {
			type: 'string',
			default: 'Custom Link Item'
		},
		description: {
			type: 'string',
			default: ''
		},
		url: {
			type: 'string',
			default: ''
		},
		readmore_label: {
			type: 'string',
			default: 'Read More'
		},
		odd_even: {
			type: 'string',
			default: 'odd'
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel, 
			odd_even,
			title,
			description,
			url,
			readmore_label
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
						<div
							style={ { marginBottom: 10, fontSize: 14 } }
						>{ __( 'Open Media Library', 'egov' ) }</div>
						<CustomMediaUpload
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<TextControl
							label= { __( 'Title', 'egov' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextareaControl
							label= { __( 'Description', 'egov' ) }
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						<TextControl
							label= { __( 'Custom URL', 'egov' ) }
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
						<TextControl
							label= { __( 'Read More', 'egov' ) }
							value={ readmore_label }
							onChange={ ( value ) => setAttributes( { readmore_label: value } ) }
						/>
						<SelectControl
							label={ __( 'Odd/Even', 'egov' ) }
							value={ odd_even }
							options={ [
								{
									label: __( 'ODD', 'egov' ),
									value: 'odd'
								},
								{
									label: __( 'EVEN', 'egov' ),
									value: 'even'
								}
							] }
							onChange={ ( option ) => { setAttributes( { odd_even: option } ) } }
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
			readmore_label, 
			odd_even,
			title,
			description,
			url,
			media_uploader,
			media_alt,
			media_sizes_selected
		} = attributes
			
		return (
			<li className={ `block-link-item d-block ${odd_even} ${add_class}` }>
				<div className={"ratio ratio-1x1"}>
					<div className={"d-flex justify-content-center align-items-center"}>
						<figure className={"text-center"}>
							<div className={"thumbnail"}>
								<a href={url}>
									<img src={media_uploader.sizes[media_sizes_selected].url} alt={media_alt} />
								</a>
							</div>
							<figcaption>
								<h5>
									<a href={url}>{title}</a>
								</h5>
								{ !! description &&
									<div className={"hover-text bg-gradient"}>
										<h5>{description}</h5>
										<div>
											<a href={url}>{ readmore_label }</a>
											<i className={"icofont-rounded-double-right"}></i>
										</div>
									</div>
								}
							</figcaption>
						</figure>
					</div>
				</div>
			</li>
		)		
	}
} )