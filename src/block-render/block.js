import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import MultiTerm from '../components/MultiTerm.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl, PanelBody, CheckboxControl, RadioControl, __experimentalNumberControl : NumberControl } = wp.components
const { Fragment } = wp.element

registerBlockType( 'mptc-block/block-render', {
	title: __( 'Block Render', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'Block Render', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Block Render'
		},
		toggle_panel: {
			type: 'boolean',
			default: false
		},
		post_type: {
			type: 'array',
			default: []
		},
		post_type_selected: {
			type: 'string',
			default: ''
		},
		taxonomy: {
			type: 'array',
			default: []
		},
		taxonomy_selected: {
			type: 'string',
			default: ''
		},
		term: {
			type: 'array',
			default: []
		},
		term_selected: {
			type: 'array',
			default: []
		},
		posts_per_page: {
			type: 'string',
			default: 1
		},
		offset: {
			type: 'string',
			default: 0
		},
		exclude: {
			type: 'string',
			default: ''
		},
		order_by: {
			type: 'string',
			default: 'date'
		},
		order: {
			type: 'string',
			default: 'DESC'
		},
		enable_title: {
			type: 'boolean',
			default: true
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const {
			mark_text, 
			toggle_panel, 
			offset, 
			order_by, 
			order, 
			posts_per_page,
			exclude,
			enable_title
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
						<CheckboxControl
							label= { __( 'Enable Title', 'egov' ) }
							checked={ enable_title }
							onChange={ ( boolean ) => {
								setAttributes( { enable_title: boolean })
							} }
						/>
						<MultiTerm 
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						<br/>
						<NumberControl
							label={ __( 'Number of Post', 'egov' )  }
							isShiftStepEnabled={ true }
							shiftStep={ 10 }
							value={ posts_per_page }
							onChange={ ( posts ) => setAttributes( { posts_per_page: posts } ) }
							min={ -1 }
						/>
						<br/>
						<NumberControl
							label={ __( 'Post Offset', 'egov' )  }
							isShiftStepEnabled={ true }
							shiftStep={ 10 }
							value={ offset }
							onChange={ ( posts ) => setAttributes( { offset: posts } ) }
							min={ 0 }
						/>
						<br/>
						<TextControl
							label={ __( 'Exclude Term ID', 'egov' )  }
							value={ exclude }
							onChange={ ( value ) => setAttributes( { exclude: value } ) }
						/>
						<br/>
						<RadioControl
							label={ __( 'Order By', 'egov' ) }
							selected={ order_by }
							options={ [ 
								{ label: 'Date', value: 'date' }, 
								{ label: 'Title', value: 'title' }, 
								{ label: 'Random ', value: 'rand' },
								{ label: 'View Count', value: 'meta_value_num' }
							] }
							onChange={ ( boolean ) => setAttributes( { order_by: boolean } ) }
						/>
						<RadioControl
							label={ __( 'Order', 'egov' ) }
							selected={ order }
							options={ [ { label: 'DESC', value: 'DESC' }, { label: 'ASC', value: 'ASC' } ] }
							onChange={ ( boolean ) => setAttributes( { order: boolean } ) }
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