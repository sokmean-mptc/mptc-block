const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody, TextControl, TextareaControl } = wp.components
const { Fragment, RawHTML } = wp.element
const { withDispatch } = wp.data

const ALLOWED_BLOCKS = [ 'mptc-block/nus-footer-item' ]

registerBlockType( 'mptc-block/nus-footer', {
	title: 'NUS Footer',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'nus footer' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		title: {
            type: 'string',
			default: 'Title'
		},
		copyright: {
            type: 'string',
			default: '&copy; Copyright'
		},
		menu: {
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
			title,
			copyright,
			menu,
			menu_name,
			menu_container,
			menu2,
			menu2_name,
			menu2_container,
			language
		} = attributes
		
		if( menu_name && menu_container ) {
			wp.apiFetch ( {
				url: `/wp-json/mptc-block/menu/name=${menu_name}/container=${menu_container}`
			} )
			.then(
				( data ) => {
					setAttributes( { menu: data } )
				}
			)
			.catch(
				( err ) => {
					console.log( err )
				}
			)
		}
		
		if( menu2_name && menu2_container ) {
			wp.apiFetch ( {
				url: `/wp-json/mptc-block/menu/name=${menu2_name}/container=${menu2_container}`
			} )
			.then(
				( data ) => {
					setAttributes( { menu2: data } )
				}
			)
			.catch(
				( err ) => {
					console.log( err )
				}
			)
		}
		
		wp.apiFetch ( {
			url: "/wp-json/mptc-block/language-switcher"
		} )
		.then(
			( data ) => {
				setAttributes( { language: data } )
			}
		)
		.catch(
			( err ) => {
				console.log( err )
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
						<TextControl
							label= { 'Title' }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>		
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
							label= { 'Menu Container (2)' }
							value={ menu2_container }
							onChange={ ( value ) => setAttributes( { menu2 : '', menu2_container: value } ) }
						/>	
					</PanelBody>
				</InspectorControls>
					
				<footer className={"nus-footer bg-primary text-white"}>
					<div className={"container"}>
						<div className={"row"}>
							<div className={"text-center nus-info-wraper"}>
								<div className={"nus-contact-info"}>
									<h3 className={"title"}><RawHTML>{title}</RawHTML></h3>
									<div className={"d-flex justify-content-center"}>
										<ul className={"nus-contact-us"}>
											<InnerBlocks 
												allowedBlocks={ ALLOWED_BLOCKS } 
											/>
										</ul>
									</div>
								</div>
								<div className={"nus-social-nav d-flex justify-content-center"}>
									<nav>
										<RawHTML>{menu}</RawHTML>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<div className={"nus-copyright"}>
						<div className={"container"}>
							<div className={"row text-center"}>
								<div className={"info"}><RawHTML>{copyright}</RawHTML></div>
								<div className={"nus-footer-nav d-flex align-items-baseline justify-content-center"}>
									<nav className={"nus-nav"}>
										<RawHTML>{menu2}</RawHTML>
									</nav>
									<div className={"nus-language"}>
										<ul>
											<RawHTML>{language}</RawHTML>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</Fragment>
		)
	},
	save: () => {
		return ( 
			<InnerBlocks.Content /> 
		)
	}
} )