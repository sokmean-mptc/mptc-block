import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import CustomMediaUpload from '../components/CustomMediaUpload.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl } = wp.components;
const { Fragment } = wp.element;

import './style.scss';
import './editor.scss';

registerBlockType( 'mptc-block/block-message', {
	title: __( 'Block Message', 'mptc' ),
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [
		__( 'block message', 'mptc' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Block Message'
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
			default: 'large'
		},
		title: {
            type: 'string',
			default: 'Welcome Message Title...'
		},
		title_link: {
            type: 'string',
			default: '#'
		},
		description: {
            type: 'string',
			default: 'Welcome Message Content...'
		},
		contact_title: {
            type: 'string',
			default: 'Feedback'
		},
		contact_link: {
            type: 'string',
			default: '#'
		},

	},
	edit: ( { attributes, setAttributes } ) => {
		const { 
			mark_text,
			toggle_panel,
			title, 
			title_link,
			description,
			contact_title,
			contact_link
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
						title={ __( 'Block Options', 'mptc' ) }
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>
						<div
							style={ { marginBottom: 10, fontSize: 14 } }
						>{ __( 'Open Media Library', 'mptc' ) }</div>
						<CustomMediaUpload
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<TextControl
							label= { __( 'Title', 'mptc' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextControl
							label= { __( 'Link', 'mptc' ) }
							value={ title_link }
							onChange={ ( value ) => setAttributes( { title_link: value } ) }
						/>
						<TextareaControl
							label= { __( 'Description', 'mptc' ) }
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						<TextControl
							label= { __( 'Feedback Title', 'mptc' ) }
							value={ contact_title }
							onChange={ ( value ) => setAttributes( { contact_title: value } ) }
						/>
						<TextControl
							label= { __( 'Link', 'mptc' ) }
							value={ contact_link }
							onChange={ ( value ) => setAttributes( { contact_link: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
				</div>
			</Fragment>
		)
	},
	
	save: ( { attributes } ) => {
		const { 
			title, 
			title_link,
			description,
			contact_title,
			contact_link,
			media_uploader,
			media_sizes_selected,
			className
		} = attributes
		const advanced_class = className || ''
		return ( 
			<div className={`block-quote row g-0 ${advanced_class}`}>
				<div className="col-12 col-sm-4 col-md-3 avatar d-flex justify-content-center">
					<div className="ratio ratio-1x1">
						<div style={`background-image: url(${media_uploader.hasOwnProperty('sizes') ? media_uploader.sizes[media_sizes_selected].url : ''});`}></div>
					</div>
				</div>
				<div className="col caption d-flex align-items-center">
					<div className="figcaption p-2 p-sm-2 p-md-3">
						<h5 className="title mb-0 mb-1 mb-sm-1 mb-lg-2"><a href={title_link}>{title}</a></h5>
						<p className="excerpt mb-0 mb-sm-1 mb-lg-2 text-break">{description}</p>
					</div>
				</div>
				<div className="col-12 col-md-3 figure d-flex align-items-center">
					<div className="ratio ratio-21x9 ratio-md-1x1">
						<div className="d-flex justify-content-center align-items-center p-3">
							<figure className="text-center">
								<div className="thumbnail mb-0 mb-1 mb-sm-1 mb-lg-2">
									<i style={ { fontSize: '2rem' } } className={"icofont-ui-messaging color-gray-700"}></i>
								</div>
								<figcaption>
									<h5>
										<a href={contact_link}>{contact_title}</a>
									</h5>
								</figcaption>
							</figure>
						</div>  
					</div>
				</div>
			</div>
		 )
	}
} )
