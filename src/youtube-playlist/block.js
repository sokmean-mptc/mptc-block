import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import DataSlick from '../components/DataSlick.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextareaControl } = wp.components
const { Fragment } = wp.element

registerBlockType( 'mptc-block/youtube-playlist', {
	title: __( 'Youtube Playlist', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'youtube playlist', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Youtube Playlist'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		data_slick: {
			type: 'object',
			default: {
				arrows: true
			}
		},
		data_slick_md: {
			type: 'object',
			default: {}
		},
		data_slick_sm: {
			type: 'object',
			default: {}
		},
		data_slick_xs: {
			type: 'object',
			default: {}
		}, 
		key: {
			type: 'string',
			default: ''
		},
		playlist_id: {
			type: 'string',
			default: ''
		},
		data_playlist: {
			type: 'array',
			default: []
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel,
			key,
			playlist_id,
			data_playlist
		} = attributes

		// const key = 'AIzaSyBbTDKtoivLuALOMTXcUViLnQZxNCuHdeA'
		// const playlist_id = 'PL4CqdQEZBAjWshJ21rV177FxYC4itqYER'
		// const playlist_id = 'PLNF8K9Ddz0kKfujG6blfAxngYh_C66C_q'
		if ( ! data_playlist.length && key != '' && playlist_id != '' ) {
			let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&key='+key+'&playlistId='+playlist_id
			const xhttp_request = new XMLHttpRequest()
			xhttp_request.open('GET', url)
			xhttp_request.send()
			xhttp_request.onreadystatechange = (e) => {
				if (xhttp_request.readyState==4) {
					const items = JSON.parse(xhttp_request.responseText).items
					const data = []
					for (const key in items) {
						if (Object.hasOwnProperty.call(items, key)) {
							const element = items[key];
							if( element.snippet.thumbnails.standard ) {
								data.push({
									name: element.snippet.title,
									description: element.snippet.description,
									sources: [
										{
											src: 'https://www.youtube.com/watch?v='+element.snippet.resourceId.videoId,
											type: 'video/youtube'
										}
									],
									thumbnail: element.snippet.thumbnails.standard.url,
									poster: element.snippet.thumbnails.standard.url
								})
							}
						}
					}
					if ( data.length ) {
						setAttributes( { data_playlist : data } )
					}
				}
			}
		}
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
						<DataSlick 
							attributes={attributes}
							setAttributes={setAttributes}
						/>
						<TextareaControl
							label= { __( 'Key', 'egov' ) }
							value={ key }
							onChange={ ( val ) => {
								setAttributes( { key: val, data_playlist: {} })
							} }
						/>
						<TextareaControl
							label= { __( 'Playlist', 'egov' ) }
							value={ playlist_id }
							onChange={ ( val ) => {
								setAttributes( { playlist_id: val, data_playlist: {} })
							} }
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
		const { data_slick, data_slick_md, data_slick_sm, data_slick_xs, data_playlist } = attributes
		let str = JSON.stringify( data_slick )
		str = str.replace( '{', '' )
		str = str.replace( '}', '' )
		// console.log(data_playlist)
		return (
			<div className={`block-youtube-playlist ${add_class}`}>
				<div className="ratio ratio-16x9 mb-2 mb-md-3">
					<video
						data-slick={`{ ${str}, "responsive": [ ${JSON.stringify(data_slick_md)}, ${JSON.stringify(data_slick_sm)}, ${JSON.stringify(data_slick_xs)} ] }`}
						data-playlist = {JSON.stringify(data_playlist)}
						id="video-playlist"
						preload="auto"
						className="video-js vjs-my-theme"
						controls
					>
					</video>
				</div>
				<div className="yt-item-list"></div>
			</div>
		)	
	}
} )