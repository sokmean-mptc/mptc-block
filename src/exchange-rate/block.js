const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls  } = wp.blockEditor
const { PanelBody, __experimentalNumberControl : NumberControl, TextControl } = wp.components
const { Fragment } = wp.element
import MarkText from '../components/MarkText.jsx'

registerBlockType( 'mptc-block/exchange-rate', {
	title: __( 'Exchange Rate', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block',
	keywords: [
		__( 'Exchange Rate', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Exchange Rate'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		api: {
			type: 'string',
			default: ''
		},
		item_to_show: {
			type: 'string',
			default: 8
		}
	},
	edit: ( { attributes, setAttributes } ) => {
		const {
			mark_text, 
			toggle_panel,
			api, 
			item_to_show
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
						<TextControl
							label={ __( 'Api URL', 'egov' ) }
							value={ api }
							onChange={ ( value ) => setAttributes( { api: value } ) }
						/>
						<NumberControl
							label={ __( 'Item To Show', 'egov' )  }
							isShiftStepEnabled={ true }
							shiftStep={ 10 }
							value={ item_to_show }
							onChange={ ( item ) => setAttributes( { item_to_show: item } ) }
							min={ -1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
				</div>
			</Fragment>
		)
	},
	
	save: () => {
		return null
	}
} )