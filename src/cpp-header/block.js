import CustomMediaUpload from '../components/CustomMediaUpload.jsx'
const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.blockEditor
const { PanelBody, TextControl, __experimentalNumberControl : NumberControl } = wp.components
const { Fragment, RawHTML } = wp.element

registerBlockType( 'mptc-block/cpp-header', {
	title: 'CPP Header',
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [ 'cpp header' ],
	attributes: {
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
		toggle_panel: {
			type: 'boolean',
			default: true
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
		},
		xl: {
			type: 'number',
			default: 380
		},
		lg: {
			type: 'number',
			default: 380
		},
		md: {
			type: 'number',
			default: 80
		},
		sm: {
			type: 'number',
			default: 60
		},
		xs: {
			type: 'number',
			default: 60
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const {
			toggle_panel,
			menu,
			menu_location,
			menu_name,
			menu_container,
			menu2,
			menu2_location,
			menu2_name,
			menu2_container,
			language,
			media_uploader,
			media_alt,
			media_sizes_selected,
			xl,
			lg,
			md,
			sm,
			xs,
			className
		} = attributes
		let image_url = ''
		if( media_uploader.hasOwnProperty( 'sizes' ) ) {
			if( media_sizes_selected !== '' ) {
				image_url = media_uploader.sizes[media_sizes_selected].url
			}
		}
		
		
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
				url: `/wp-json/mptc-block/menu/name=${menu2_name}/location=${menu2_location}/container=${menu2_container}/class=menu menu-header-three`
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
			url: "/wp-json/mptc-block/language-switcher-header-mptc"
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
						<label className={'components-base-control__label css-pezhm9-StyledLabel css-wdf2ti-Wrapper'}>{'Open Media Library'}</label>
						<CustomMediaUpload
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<label className={'components-base-control__label css-pezhm9-StyledLabel  css-wdf2ti-Wrapper'}>{ 'Header Height (>1200px)' }</label>
						<NumberControl
							value={ xl }
							onChange={ ( value ) => setAttributes( { xl: value } ) }
						/>	
						<label className={'components-base-control__label css-pezhm9-StyledLabel  css-wdf2ti-Wrapper'}>{ 'Header Height (>992px)' }</label>
						<NumberControl
							value={ lg }
							onChange={ ( value ) => setAttributes( { lg: value } ) }
						/>	
						<label className={'components-base-control__label css-pezhm9-StyledLabel  css-wdf2ti-Wrapper'}>{ 'Header Height (>768px)' }</label>
						<NumberControl
							value={ md }
							onChange={ ( value ) => setAttributes( { md: value } ) }
						/>	
						<label className={'components-base-control__label css-pezhm9-StyledLabel  css-wdf2ti-Wrapper'}>{ 'Header Height (>576px)' }</label>
						<NumberControl
							value={ sm }
							onChange={ ( value ) => setAttributes( { sm: value } ) }
						/>	
						<label className={'components-base-control__label css-pezhm9-StyledLabel  css-wdf2ti-Wrapper'}>{ 'Header Height' }</label>
						<NumberControl
							value={ xs }
							onChange={ ( value ) => setAttributes( { xs: value } ) }
						/>	
						<br/>
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
				
				<section className={`header-cpp position-relative ${className}`} >
					<header className={"px-1 px-sm-2 px-md-3 py-1 py-sm-2 py-md-3 py-lg-4"} style={{backgroundImage: `url(${image_url})`}}>
						<div className={"container d-flex justify-content-between align-items-center align-items-lg-start h-100"}>
							<div className={"align-items-center"}></div>
							<div className={"d-flex align-items-center"}>
								<nav className={"social d-none d-lg-block me-3"}>
									<RawHTML>{menu}</RawHTML>
								</nav>
								<div className={"d-none d-lg-block search-icon text-center me-3 color-gray-100"} data-bs-toggle="modal" data-bs-target="#searchModal">
									<i className={"icofont-search-1"}></i>
								</div>

								
								<RawHTML className={"color-gray-100"}>{language}</RawHTML>
								

								<div className="mobile-toggle d-flex align-items-center d-lg-none">
									<div className="search-icon text-center me-1 me-sm-2 me-md-2 color-gray-100" data-bs-toggle="modal" data-bs-target="#searchModal">
									<i className={"icofont-search-1"}></i>
									</div>
									<div className="toggle-nav">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
									</div>
								</div>
							</div>
						</div>
					</header>
						

					<div className="container">
						<nav id="main-nav" className="nav">
							<RawHTML>{menu2}</RawHTML>
						</nav>
					</div>
				</section>

			</Fragment>
		)
	},
	save: () => {
		return null
	}
} )