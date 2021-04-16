import './style.scss'
import './editor.scss'
import MarkText from '../components/MarkText.jsx'
import NestedButton from '../components/NestedButton.jsx'
import MultiTerm from '../components/MultiTerm.jsx'
import Aspectratio from '../components/Aspectratio.jsx'
import MetaOption from '../components/MetaOption.jsx'
import DataSlick from '../components/DataSlick.jsx'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, CheckboxControl, SelectControl, RangeControl, RadioControl, __experimentalNumberControl : NumberControl } = wp.components
const { Fragment } = wp.element
const ALLOWED_BLOCKS = []

registerBlockType( 'mptc-block/slidelist', {
	title: __( 'Slide List', 'egov' ),
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [
		__( 'slide list', 'egov' )
	],
	attributes: {
		mark_text: {
            type: 'string',
			default: 'Slide List'
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
			type: 'number',
			default: 5
		},
		offset: {
			type: 'string',
			default: 0
		},
		order_by: {
			type: 'string',
			default: 'date'
		},
		order: {
			type: 'string',
			default: 'DESC'
		},
		enable_thumbnail: {
			type: 'boolean',
			default: true
		},
		thumbnail_size: {
			type: 'string',
			default: 'medium'
		},
		enable_title: {
			type: 'boolean',
			default: true
		},
		title_length: {
			type: 'string',
			default: 200
		},
		enable_excerpt: {
			type: 'boolean',
			default: false
		},
		excerpt_length: {
			type: 'string',
			default: 250
		},
		enable_meta: {
			type: 'boolean',
			default: true
		},
		enable_post_date: {
			type: 'boolean',
			default: true
		},
		enable_post_author: {
			type: 'boolean',
			default: false
		},
		enable_post_read_more: {
			type: 'boolean',
			default: false
		},
		enable_post_view_count: {
			type: 'boolean',
			default: false
		},
		enable_post_tag: {
			type: 'boolean',
			default: true
		},
		aspectratio_xs: {
			type: 'string',
			default: 'ratio-16x9'
		},
		aspectratio_sm: {
			type: 'string',
			default: ''
		},
		aspectratio_md: {
			type: 'string',
			default: ''
		},
		aspectratio_lg: {
			type: 'string',
			default: ''
		},
		aspectratio_xl: {
			type: 'string',
			default: ''
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
			enable_thumbnail,
			thumbnail_size
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
						<hr/>
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
						<hr/>
						<CheckboxControl
							label= { __( 'Enable Thumbnail', 'egov' ) }
							checked={ enable_thumbnail }
							onChange={ ( boolean ) => {
								setAttributes( { enable_thumbnail: boolean })
							} }
						/>
						<SelectControl
							label={ __( 'Thumbnail Size', 'egov' ) }
							value={ thumbnail_size }
							options={ [
								{
									label: __( 'Thumbnail', 'egov' ),
									value: 'thumbnail'
								},
								{
									label: __( 'Medium', 'egov' ),
									value: 'medium'
								},
								{
									label: __( 'Large', 'egov' ),
									value: 'large'
								},
								{
									label: __( 'Full', 'egov' ),
									value: 'full'
								}
							] }
							onChange={ ( size ) => { setAttributes( { thumbnail_size: size } ) } }
						/>
						<Aspectratio
							attributes = { attributes }
							setAttributes = { setAttributes }
						/>
						<br/>
						<MetaOption 
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				</InspectorControls>
				
				<div className={ 'border p-3' }>
					<small>{ mark_text }</small>
					<NestedButton
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
				
			</Fragment>
		)
	},
	save: () => {
		return null		
	}
} )