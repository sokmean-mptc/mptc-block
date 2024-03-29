const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls, RichText } = wp.blockEditor
const { PanelBody, SelectControl } = wp.components
const { Fragment, useState } = wp.element
import MarkText from '../components/MarkText.jsx'
import MultiMediaUpload from '../components/MultiMediaUpload.jsx'
import Gallery from 'react-photo-gallery'

registerBlockType( 'mptc-block/react-gallery', {
	title: __( 'React Gallery', 'mptc' ),
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
        media_sizes: {
			type: 'array',
			default: [
                {label: 'Thumbnail', value: 'thumbnail'},
                {label: 'Medium', value: 'medium'},
                {label: 'Large', value: 'large'},
                {label: 'Full', value: 'full'}
            ]
		},
		media_sizes_selected: {
			type: 'string',
			default: 'medium'
		},
		direction: {
			type: 'string',
			default: 'row'
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const { mark_text, media_uploader, direction, toggle_panel, media_sizes_selected } = attributes
		let photos = []
		// console.log(photos)
		if ( media_uploader.length ) {
			for ( const photo of media_uploader ) {
                if(photo.sizes.hasOwnProperty(media_sizes_selected)){
                    photos.push(
                        {
                            src: photo.sizes[media_sizes_selected].url,
                            width: photo.sizes[media_sizes_selected].width,
                            height:photo.sizes[media_sizes_selected].height,
                            key: photo.id+''
                        }
                    )
                }
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
						title={ __( 'General Option', 'mptc' ) } 
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
					>

						<SelectControl
							label={ __( 'Gallery Style', 'mptc' ) }
							value={ direction }
							options={ [
								{ value: 'row', label: __( 'Row', 'mptc' ) },
								{ value: 'column', label: __( 'Column', 'mptc' ) }
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
					<Gallery 
						direction={ direction }
						photos={ photos } 
					/>}
				</div>
			</Fragment>
		)
	},
	
	save: ( { attributes } ) => { 
		const { media_uploader, direction, media_sizes_selected } = attributes
		let photos = []
		if ( media_uploader.length ) {
			for ( const photo of media_uploader ) {
				if(photo.sizes.hasOwnProperty(media_sizes_selected)){
                    photos.push(
                        {
                            src: photo.sizes[media_sizes_selected].url,
                            key: photo.id+'',
                            width: photo.sizes[media_sizes_selected].width,
                            height:photo.sizes[media_sizes_selected].height
                        }
                    )
                }
			}
		}
		return (
			<div data-direction={direction} data-photo={JSON.stringify(photos)} id="gallery"></div>
		)
	}
} )