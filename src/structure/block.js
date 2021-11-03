import RowColumns from '../components/RowColumns.jsx'
const { registerBlockType } = wp.blocks
const { InspectorControls, InnerBlocks } = wp.blockEditor
const { PanelBody } = wp.components
const { Fragment } = wp.element
const ALLOWED_BLOCKS = [ 'mptc-block/structure-item' ]

registerBlockType( 'mptc-block/structure', {
	title: 'Structure',
	icon: 'admin-page',
	category: 'mptc-block', 
	keywords: [ 'structure' ],
	attributes: {
		toggle_panel: {
			type: 'boolean',
			default: true
		},
		row_cols: {
			type: 'string',
			default: ''
		}, 
		row_cols_sm: {
			type: 'string',
			default: ''
		}, 
		row_cols_md: {
			type: 'string',
			default: ''
		}, 
		row_cols_lg: {
			type: 'string',
			default: ''
		},
		row_cols_xl: {
			type: 'string',
			default: ''
		}
	},
	edit: ( { attributes, setAttributes  } ) => {
		const { toggle_panel, className, row_cols, row_cols_sm, row_cols_md, row_cols_lg, row_cols_xl } = attributes
		const advanced_class = className ? className : ''
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody 
                        title={ 'Block Option' } 
						initialOpen={ toggle_panel }
						onToggle={ () => {
							setAttributes( { toggle_panel: ! toggle_panel } ) 
						} }
                    >
						<RowColumns 
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				</InspectorControls>
				
				<div style={{minHeight:'40px'}} className={ `border row ${advanced_class} ${row_cols} ${row_cols_sm} ${row_cols_md} ${row_cols_lg} ${row_cols_xl}` }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
				
			</Fragment>
		)
	},
	save: ( { attributes } ) => {
		const { className, row_cols, row_cols_sm, row_cols_md, row_cols_lg, row_cols_xl } = attributes
		const advanced_class = className ? className : ''
		return (
			<div className={ `row ${advanced_class} ${row_cols} ${row_cols_sm} ${row_cols_md} ${row_cols_lg} ${row_cols_xl}` }>
				<InnerBlocks.Content />
			</div>
		) 	
	}
} )