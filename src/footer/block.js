const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment, RawHTML } = wp.element
const { withDispatch } = wp.data

registerBlockType( 'mptc-block/footer', {
	title: 'Footer',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'footer' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
		},
		copyright: {
            type: 'string',
			default: '&copy; Copyright'
		},
		menu: {
            type: 'string',
			default: ''
		},
		menu_location: {
            type: 'string',
			default: ''
		},
		menu_name: {
            type: 'string',
			default: ''
		},
		menu_container: {
            type: 'string',
			default: 'ul'
		},
		menu2: {
            type: 'string',
			default: ''
		},
		menu2_location: {
            type: 'string',
			default: ''
		},
		menu2_name: {
            type: 'string',
			default: ''
		},
		menu2_container: {
            type: 'string',
			default: 'ul'
		},
		language: {
            type: 'string',
			default: ''
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const {
			toggle_panel,
			copyright,
			menu,
			menu_location,
			menu_name,
			menu_container,
			menu2,
			menu2_location,
			menu2_name,
			menu2_container,
			language
		} = attributes
		
		if( menu_name && menu_container && menu_location ) {
			wp.apiFetch ( {
				url: `/wp-json/mptc-block/menu/name=${menu_name}/location=${menu_location}/container=${menu_container}/class=`
			} )
			.then(
				( data ) => {
					setAttributes( { menu: data } )
				}
			)
			.catch(
				( err ) => {
					setAttributes( { menu: '' } )
				}
			)
		}
		
		if( menu2_name && menu2_container && menu2_location ) {
			wp.apiFetch ( {
				url: `/wp-json/mptc-block/menu/name=${menu2_name}/location=${menu2_location}/container=${menu2_container}/class=`
			} )
			.then(
				( data ) => {
					setAttributes( { menu2: data } )
				}
			)
			.catch(
				( err ) => {
					setAttributes( { menu2: '' } )
				}
			)
		}
		
		wp.apiFetch ( {
			url: "/wp-json/mptc-block/language-switcher-v2"
		} )
		.then(
			( data ) => {
				setAttributes( { language: data } )
			}
		)
		.catch(
			( err ) => {
				setAttributes( { language: '' } )
			}
		)

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
						<TextareaControl
							label= { 'Copyright' }
							value={ copyright }
							onChange={ ( value ) => setAttributes( { copyright: value } ) }
						/>	
						<TextControl
							label= { 'Menu Name (1)' }
							value={ menu_name }
							onChange={ ( value ) => setAttributes( { menu : '', menu_name: value } ) }
						/>	
						<TextControl
							label= { 'Menu Location (1)' }
							value={ menu_location }
							onChange={ ( value ) => setAttributes( { menu : '', menu_location: value } ) }
						/>
						<TextControl
							label= { 'Menu Container (1)' }
							value={ menu_container }
							onChange={ ( value ) => setAttributes( { menu : '', menu_container: value } ) }
						/>	
						<TextControl
							label= { 'Menu Name (2)' }
							value={ menu2_name }
							onChange={ ( value ) => setAttributes( { menu2 : '', menu2_name: value } ) }
						/>	
						<TextControl
							label= { 'Menu Location (2)' }
							value={ menu2_location }
							onChange={ ( value ) => setAttributes( { menu2 : '', menu2_location: value } ) }
						/>	
						<TextControl
							label= { 'Menu Container (2)' }
							value={ menu2_container }
							onChange={ ( value ) => setAttributes( { menu2 : '', menu2_container: value } ) }
						/>	
					</PanelBody>
				</InspectorControls>
				
				<div className="bg-gray-100">
					<footer className="container">
						<div className="d-sm-flex justify-content-sm-between align-items-center p-2 p-sm-2 p-md-3">
							<div className="d-flex justify-content-center justify-content-sm-start">
								<nav className="social-nav">
									<RawHTML>{menu}</RawHTML>
								</nav>
								<RawHTML>{language}</RawHTML>
							</div>
							<nav className="footer-nav d-flex justify-content-center justify-content-sm-start">
								<RawHTML>{menu2}</RawHTML>
							</nav>
						</div>
						<hr className="color-gray-400 m-0"/>
						<div className="copyright text-center color-gray-600 p-1 p-sm-2 p-md-3">
							<RawHTML>{copyright}</RawHTML>
						</div>
					</footer>
				</div>
			</Fragment>
		)
	},
	save: () => {
		return null
	}
} )