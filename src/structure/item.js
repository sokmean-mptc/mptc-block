import Aspectratio from '../components/Aspectratio.jsx'
import CustomMediaUpload from '../components/CustomMediaUpload.jsx'
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl, SelectControl } = wp.components
const { Fragment, RawHTML } = wp.element

registerBlockType( 'mptc-block/structure-item', {
	title: 'Structure Item',
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [ 'structure item' ],
	parent: [ 'mptc-block/structure' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
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
			default: 'Title'
		},
		description: {
			type: 'string',
			default: 'Description'
		},
		link: {
			type: 'string',
			default: ''
		},
		aspectratio_xs: {
			type: 'string',
			default: 'ratio-1x1'
		},
		aspectratio_sm: {
			type: 'string',
			default: ''
		},
		aspectratio_md: {
			type: 'string',
			default: ''
		},
		aspectratio_lg: {
			type: 'string',
			default: ''
		},
		aspectratio_xl: {
			type: 'string',
			default: ''
		},
		image_style: {
			type: 'string',
			default: ''
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			toggle_panel, 
			title,
			description,
			link,
			media_uploader,
			media_alt,
			media_sizes_selected,
			aspectratio_xs,
			aspectratio_xl,
			aspectratio_sm,
			aspectratio_md,
			aspectratio_lg,
			image_style,
			className
		} = attributes
		const advanced_class = className ? className : ''
		
		let image_url = ''
		if( media_uploader.hasOwnProperty( 'sizes' ) ) {
			console.log(media_uploader)
			if( media_sizes_selected !== '' ) {
				image_url = media_uploader.sizes[media_sizes_selected].url
			}
		}
		
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
						<div
							style={ { marginBottom: 10, fontSize: 14 } }
						>{ 'Open Media Library' }</div>
						<CustomMediaUpload
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<Aspectratio
							attributes = { attributes }
							setAttributes = { setAttributes }
						/>
						<SelectControl
							label={ 'Image Style' }
							value={ image_style }
							options={ [
								{ 
									label: 'Default', 
									value: '' 
								},
								{ 
									label: 'Round', 
									value: 'rounded' 
								},
								{ 
									label: 'Round Circle', 
									value: 'rounded-circle' 
								},
								{ 
									label: 'Round Pill', 
									value: 'rounded-pill' 
								}
							] }
							onChange={ ( val ) => { setAttributes( { image_style: val } ) } }
						/>
						<TextControl
							label= { 'Title' }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextareaControl
							label= { 'Description' }
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						<TextControl
							label= { 'Link' }
							value={ link }
							onChange={ ( value ) => setAttributes( { link: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				
				<figure className={`col ${advanced_class}`}>
					<div className={`bg-gray-100 mb-1 mb-md-2 ratio ${aspectratio_xs} ${aspectratio_sm} ${aspectratio_md} ${aspectratio_lg} ${aspectratio_xl} ${image_style}`}>
						<div className={image_style} style={{backgroundImage: `url(${image_url})`}} alt={media_alt}></div>
					</div>
					<figcaption className={ "text-center" }>
						<div>
							{ !! link &&
								<div><a className={"color-gray-700"} href={link}><RawHTML>{title}</RawHTML></a></div>
							}
							{ ! link &&
								<div className={"color-gray-700"}><RawHTML>{title}</RawHTML></div>
							}
							{ !! description &&
								<small className={"text-muted"}>
									<RawHTML>{description}</RawHTML>
								</small>
							}
						</div>
					</figcaption>
				</figure>
				
			</Fragment>
		)
	},
	save: ( { attributes } ) => {
	
		const {
			title,
			description,
			link,
			media_uploader,
			media_alt,
			media_sizes_selected,
			aspectratio_xs,
			aspectratio_xl,
			aspectratio_sm,
			aspectratio_md,
			aspectratio_lg,
			image_style,
			className
		} = attributes
		const advanced_class = className ? className : ''
		
		let image_url = ''
		if( media_uploader.hasOwnProperty( 'sizes' ) ) {
			console.log(media_uploader)
			if( media_sizes_selected !== '' ) {
				image_url = media_uploader.sizes[media_sizes_selected].url
			}
		}

		return (
			<figure className={`col ${advanced_class}`}>
				<div className={`bg-gray-100 mb-1 mb-md-2 ratio ${aspectratio_xs} ${aspectratio_sm} ${aspectratio_md} ${aspectratio_lg} ${aspectratio_xl} ${image_style}`}>
					<div className={image_style} style={{backgroundImage: `url(${image_url})`}} alt={media_alt}></div>
				</div>
				<figcaption className={ "text-center" }>
					<div>
						{ !! link &&
							<div><a className={"color-gray-700"} href={link}><RawHTML>{title}</RawHTML></a></div>
						}
						{ ! link &&
							<div className={"color-gray-700"}><RawHTML>{title}</RawHTML></div>
						}
						{ !! description &&
							<small className={"text-muted"}>
								<RawHTML>{description}</RawHTML>
							</small>
						}
					</div>
				</figcaption>
			</figure>
		)		
	}
} )