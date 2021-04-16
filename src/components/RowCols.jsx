const { __ } = wp.i18n;
const { RangeControl, CheckboxControl } = wp.components

const RowCols = ( { attributes, setAttributes } ) => {
    const { 
        row_cols_xs, 
        row_cols_sm, 
        row_cols_md, 
        row_cols_lg, 
        row_cols_xl,
        row_cols_sm_bypass,
        row_cols_md_bypass,
        row_cols_lg_bypass,
        row_cols_xl_bypass,
    } = attributes
        
    return ( [
        <RangeControl
            label={ __( 'Row Columns XS', 'egov' ) }
            value={ row_cols_xs }
            onChange={ ( columns ) => setAttributes( { row_cols_xs: columns } ) }
            min={ 1 }
            max={ 12 }
        />,

        <div>
            <RangeControl
                disabled={ row_cols_sm_bypass }
                label={ __( 'Row Columns SM', 'egov' ) }
                value={ row_cols_sm }
                onChange={ ( columns ) => setAttributes( { row_cols_sm: columns } ) }
                min={ 1 }
                max={ 12 }
            />
        </div>,
        <CheckboxControl
            label={ __( 'Bypass', 'egov' ) }
            checked={ row_cols_sm_bypass }
            onChange={ ( boolean ) => { setAttributes( { row_cols_sm_bypass: boolean } ) } }
        />,

        <div>
            <RangeControl
                disabled={ row_cols_md_bypass }
                label={ __( 'Row Columns MD', 'egov' ) }
                value={ row_cols_md }
                onChange={ ( columns ) => setAttributes( { row_cols_md: columns } ) }
                min={ 1 }
                max={ 12 }
            />
        </div>,
        <CheckboxControl
            label={ __( 'Bypass', 'egov' ) }
            checked={ row_cols_md_bypass }
            onChange={ ( boolean ) => { setAttributes( { row_cols_md_bypass: boolean } ) } }
        />,

        <div>
            <RangeControl
                disabled={ row_cols_lg_bypass }
                label={ __( 'Row Columns LG', 'egov' ) }
                value={ row_cols_lg }
                onChange={ ( columns ) => setAttributes( { row_cols_lg: columns } ) }
                min={ 1 }
                max={ 12 }
            />
        </div>,
        <CheckboxControl
            label={ __( 'Bypass', 'egov' ) }
            checked={ row_cols_lg_bypass }
            onChange={ ( boolean ) => { setAttributes( { row_cols_lg_bypass: boolean } ) } }
        />,

        <div>
            <RangeControl
                disabled={ row_cols_xl_bypass }
                label={ __( 'Row Columns XL', 'egov' ) }
                value={ row_cols_xl }
                onChange={ ( columns ) => setAttributes( { row_cols_xl: columns } ) }
                min={ 1 }
                max={ 12 }
            />
        </div>,
        <CheckboxControl
            label={ __( 'Bypass', 'egov' ) }
            checked={ row_cols_xl_bypass }
            onChange={ ( boolean ) => { setAttributes( { row_cols_xl_bypass: boolean } ) } }
        />
    ] )
}

export default RowCols;