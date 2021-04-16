const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls, RichText } = wp.blockEditor
const { PanelBody, SelectControl } = wp.components
const { Fragment, useState } = wp.element
import MarkText from '../components/MarkText.jsx'
import MultiMediaUpload from '../components/MultiMediaUpload.jsx'
import Gallery from 'react-photo-gallery'

registerBlockType( 'mptc-block/react-gallery', {
	title: __( 'React Gallery', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	attributes: {
		mark_text: {
            type: 'string',
			default: 'React Gallery'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		media_uploader: {
			type: 'array',
			default: []
		},
		direction: {
			type: 'string',
			default: 'row'
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const { mark_text, media_uploader, direction, toggle_panel } = attributes
		
		let photos = []
		if ( media_uploader.length ) {
			for ( const photo of media_uploader ) {
				photos.push(
					{
						src: photo.sizes.full.url,
						width: photo.sizes.full.width,
						height:photo.sizes.full.height
					}
				)
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody initialOpen={ true }>
						<MarkText
							attributes={attributes}
							setAttributes={setAttributes}
						/>
						<MultiMediaUpload
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
					<PanelBody 
						title={ __( 'General Option', 'egov' ) } 
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>

						<SelectControl
							label={ __( 'Gallery Style', 'egov' ) }
							value={ direction }
							options={ [
								{ value: 'row', label: __( 'Row', 'egov' ) },
								{ value: 'column', label: __( 'Column', 'egov' ) }
							] }
							onChange={ ( value ) => { setAttributes( { direction: value } ) } }
						/>


					</PanelBody>
				</InspectorControls>
				<div className={ 'border p-3' }>
					<small>
						{ mark_text }						
					</small>
					{!! photos.length &&
					<br/>,
					<Gallery 
						direction={ direction }
						photos={ photos } 
					/>}
				</div>
			</Fragment>
		)
	},
	
	save: ( { attributes } ) => { 
		const { media_uploader, direction } = attributes
		let photos = []
		if ( media_uploader.length ) {
			for ( const photo of media_uploader ) {
				photos.push(
					{
						src: photo.sizes.full.url,
						width: photo.sizes.full.width,
						height:photo.sizes.full.height
					}
				)
			}
		}
		return (
			<div data-direction={direction} data-photo={JSON.stringify(photos)} id="gallery"></div>
		)
	}
} )