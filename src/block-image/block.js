import Aspectratio from '../components/Aspectratio.jsx'
import CustomMediaUpload from '../components/CustomMediaUpload.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'mptc-block/block-image', {
	title: 'Block Image',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'block image' ],
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
			default: 'large'
		},
		aspectratio_xs: {
			type: 'string',
			default: 'ratio-16x9'
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
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const { 
			toggle_panel,
			aspectratio_xs,
			aspectratio_sm,
			aspectratio_md,
			aspectratio_lg,
			aspectratio_xl, 
			media_sizes_selected,
			media_uploader,
			className
		} = attributes
		
		let image_url, alt, title, description = ''
		if( media_uploader.hasOwnProperty( 'sizes' ) ) {
			if( media_sizes_selected !== '' ) {
				image_url = media_uploader.sizes[media_sizes_selected].url
			}
		}
		if( media_uploader.hasOwnProperty( 'title' ) ) {
			title = media_uploader.title
		}
		if( media_uploader.hasOwnProperty( 'alt' ) ) {
			alt = media_uploader.alt
		}
		if( media_uploader.hasOwnProperty( 'description' ) ) {
			description = media_uploader.description
		}
		const class_name = className || ''

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
					</PanelBody>
				</InspectorControls>
				<div alt={alt} title={title} className={`bg-gray-100 ratio ${aspectratio_xs} ${aspectratio_sm} ${aspectratio_md} ${aspectratio_lg} ${aspectratio_xl} ${class_name}`}>
					<div style={{backgroundImage:`url(${image_url})`}}></div>
				</div>
				{ !! description &&
					<figcaption className={'figure-caption'}>{description}</figcaption>
				}
			</Fragment>
		)
	},
	
	save: ( { attributes } ) => {
		const { 
			aspectratio_xs,
			aspectratio_sm,
			aspectratio_md,
			aspectratio_lg,
			aspectratio_xl, 
			media_sizes_selected,
			media_uploader,
			className
		} = attributes
		
		let image_url, alt, title, description = ''
		if( media_uploader.hasOwnProperty( 'sizes' ) ) {
			if( media_sizes_selected !== '' ) {
				image_url = media_uploader.sizes[media_sizes_selected].url
			}
		}
		if( media_uploader.hasOwnProperty( 'title' ) ) {
			title = media_uploader.title
		}
		if( media_uploader.hasOwnProperty( 'alt' ) ) {
			alt = media_uploader.alt
		}
		if( media_uploader.hasOwnProperty( 'description' ) ) {
			description = media_uploader.description
		}
		const class_name = className || ''
		return ( 
			<figure>
				<div alt={alt} title={title} className={`bg-gray-100 ratio ${aspectratio_xs} ${aspectratio_sm} ${aspectratio_md} ${aspectratio_lg} ${aspectratio_xl} ${class_name}`}>
					<div style={{backgroundImage:`url(${image_url})`}}></div>
				</div>
				{ !! description &&
					<figcaption className={'figure-caption'}>{description}</figcaption>
				}
			</figure>
		)
	}
} )
