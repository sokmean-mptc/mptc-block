import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import DataSlick from '../components/DataSlick.jsx'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody, __experimentalNumberControl : NumberControl } = wp.components
const { Fragment } = wp.element
const ALLOWED_BLOCKS = [ 'mptc-block/custom-link-item' ]

registerBlockType( 'mptc-block/custom-link', {
	title: __( 'Custom Link', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'custom link', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Custom Link'
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
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel
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
						<DataSlick 
							attributes={attributes}
							setAttributes={setAttributes}
						/>
						
					</PanelBody>
				</InspectorControls>
				
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
					<InnerBlocks  
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
				
			</Fragment>
		)
	},
	save: ( { attributes, className } ) => {
		const add_class = className ? className : ''
		const { data_slick, data_slick_md, data_slick_sm, data_slick_xs } = attributes
		let str = JSON.stringify( data_slick )
		str = str.replace( '{', '' )
		str = str.replace( '}', '' )
		return (
			<ul className={`block-link slick-slide-show m-0 ${add_class}`} data-slick={`{ ${str}, "responsive": [ ${JSON.stringify(data_slick_md)}, ${JSON.stringify(data_slick_sm)}, ${JSON.stringify(data_slick_xs)} ] }`}>
				<InnerBlocks.Content />
			</ul>
		)		
	}
} )