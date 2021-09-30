const { __ } = wp.i18n;
const { SelectControl } = wp.components

const ColumnSize = ( { attributes, setAttributes } ) => {
    const { 
        size_col_xs,
        size_col_sm,
        size_col_md,
        size_col_lg,
        size_col_xl
    } = attributes
        
    return ( [
        <SelectControl
            label={ __( 'Extra Small Display Device', 'mptc' ) }
            value={ size_col_xs }
            onChange={ ( col ) => setAttributes( { size_col_xs: col } ) }
            options={ [
                {
                    label: __( 'Size 1', 'mptc' ),
                    value: 'col-1'
                },
                {
                    label: __( 'Size 2', 'mptc' ),
                    value: 'col-2'
                },
                {
                    label: __( 'Size 3', 'mptc' ),
                    value: 'col-3'
                },
                {
                    label: __( 'Size 4', 'mptc' ),
                    value: 'col-4'
                },
                {
                    label: __( 'Size 5', 'mptc' ),
                    value: 'col-5'
                },
                {
                    label: __( 'Size 6', 'mptc' ),
                    value: 'col-6'
                },
                {
                    label: __( 'Size 7', 'mptc' ),
                    value: 'col-7'
                },
                {
                    label: __( 'Size 8', 'mptc' ),
                    value: 'col-8'
                },
                {
                    label: __( 'Size 9', 'mptc' ),
                    value: 'col-9'
                },
                {
                    label: __( 'Size 10', 'mptc' ),
                    value: 'col-10'
                },
                {
                    label: __( 'Size 11', 'mptc' ),
                    value: 'col-11'
                },
                {
                    label: __( 'Size 12', 'mptc' ),
                    value: 'col-12'
                }
            ] }
        />,
        <SelectControl
            label={ __( 'Small display Device', 'mptc' ) }
            value={ size_col_sm }
            onChange={ ( col ) => setAttributes( { size_col_sm: col } ) }
            options={ [
                {
                    label: __( 'Bypass', 'mptc' ),
                    value: ''
                },
                {
                    label: __( 'Size 1', 'mptc' ),
                    value: 'col-sm-1'
                },
                {
                    label: __( 'Size 2', 'mptc' ),
                    value: 'col-sm-2'
                },
                {
                    label: __( 'Size 3', 'mptc' ),
                    value: 'col-sm-3'
                },
                {
                    label: __( 'Size 4', 'mptc' ),
                    value: 'col-sm-4'
                },
                {
                    label: __( 'Size 5', 'mptc' ),
                    value: 'col-sm-5'
                },
                {
                    label: __( 'Size 6', 'mptc' ),
                    value: 'col-sm-6'
                },
                {
                    label: __( 'Size 7', 'mptc' ),
                    value: 'col-sm-7'
                },
                {
                    label: __( 'Size 8', 'mptc' ),
                    value: 'col-sm-8'
                },
                {
                    label: __( 'Size 9', 'mptc' ),
                    value: 'col-sm-9'
                },
                {
                    label: __( 'Size 10', 'mptc' ),
                    value: 'col-sm-10'
                },
                {
                    label: __( 'Size 11', 'mptc' ),
                    value: 'col-sm-11'
                },
                {
                    label: __( 'Size 12', 'mptc' ),
                    value: 'col-sm-12'
                }
            ] }
        />,
        <SelectControl
            label={ __( 'Medium display Device', 'mptc' ) }
            value={ size_col_md }
            onChange={ ( col ) => setAttributes( { size_col_md: col } ) }
            options={ [
                {
                    label: __( 'Bypass', 'mptc' ),
                    value: ''
                },
                {
                    label: __( 'Size 1', 'mptc' ),
                    value: 'col-md-1'
                },
                {
                    label: __( 'Size 2', 'mptc' ),
                    value: 'col-md-2'
                },
                {
                    label: __( 'Size 3', 'mptc' ),
                    value: 'col-md-3'
                },
                {
                    label: __( 'Size 4', 'mptc' ),
                    value: 'col-md-4'
                },
                {
                    label: __( 'Size 5', 'mptc' ),
                    value: 'col-md-5'
                },
                {
                    label: __( 'Size 6', 'mptc' ),
                    value: 'col-md-6'
                },
                {
                    label: __( 'Size 7', 'mptc' ),
                    value: 'col-md-7'
                },
                {
                    label: __( 'Size 8', 'mptc' ),
                    value: 'col-md-8'
                },
                {
                    label: __( 'Size 9', 'mptc' ),
                    value: 'col-md-9'
                },
                {
                    label: __( 'Size 10', 'mptc' ),
                    value: 'col-md-10'
                },
                {
                    label: __( 'Size 11', 'mptc' ),
                    value: 'col-md-11'
                },
                {
                    label: __( 'Size 12', 'mptc' ),
                    value: 'col-md-12'
                }
            ] }
        />,
        <SelectControl
            label={ __( 'Large display Device', 'mptc' ) }
            value={ size_col_lg }
            onChange={ ( col ) => setAttributes( { size_col_lg: col } ) }
            options={ [
                {
                    label: __( 'Bypass', 'mptc' ),
                    value: ''
                },
                {
                    label: __( 'Size 1', 'mptc' ),
                    value: 'col-lg-1'
                },
                {
                    label: __( 'Size 2', 'mptc' ),
                    value: 'col-lg-2'
                },
                {
                    label: __( 'Size 3', 'mptc' ),
                    value: 'col-lg-3'
                },
                {
                    label: __( 'Size 4', 'mptc' ),
                    value: 'col-lg-4'
                },
                {
                    label: __( 'Size 5', 'mptc' ),
                    value: 'col-lg-5'
                },
                {
                    label: __( 'Size 6', 'mptc' ),
                    value: 'col-lg-6'
                },
                {
                    label: __( 'Size 7', 'mptc' ),
                    value: 'col-lg-7'
                },
                {
                    label: __( 'Size 8', 'mptc' ),
                    value: 'col-lg-8'
                },
                {
                    label: __( 'Size 9', 'mptc' ),
                    value: 'col-lg-9'
                },
                {
                    label: __( 'Size 10', 'mptc' ),
                    value: 'col-lg-10'
                },
                {
                    label: __( 'Size 11', 'mptc' ),
                    value: 'col-lg-11'
                },
                {
                    label: __( 'Size 12', 'mptc' ),
                    value: 'col-lg-12'
                }
            ] }
        />,
        <SelectControl
            label={ __( 'Extra Large display Device', 'mptc' ) }
            value={ size_col_xl }
            onChange={ ( col ) => setAttributes( { size_col_xl: col } ) }
            options={ [
                {
                    label: __( 'Bypass', 'mptc' ),
                    value: ''
                },
                {
                    label: __( 'Size 1', 'mptc' ),
                    value: 'col-xl-1'
                },
                {
                    label: __( 'Size 2', 'mptc' ),
                    value: 'col-xl-2'
                },
                {
                    label: __( 'Size 3', 'mptc' ),
                    value: 'col-xl-3'
                },
                {
                    label: __( 'Size 4', 'mptc' ),
                    value: 'col-xl-4'
                },
                {
                    label: __( 'Size 5', 'mptc' ),
                    value: 'col-xl-5'
                },
                {
                    label: __( 'Size 6', 'mptc' ),
                    value: 'col-xl-6'
                },
                {
                    label: __( 'Size 7', 'mptc' ),
                    value: 'col-xl-7'
                },
                {
                    label: __( 'Size 8', 'mptc' ),
                    value: 'col-xl-8'
                },
                {
                    label: __( 'Size 9', 'mptc' ),
                    value: 'col-xl-9'
                },
                {
                    label: __( 'Size 10', 'mptc' ),
                    value: 'col-xl-10'
                },
                {
                    label: __( 'Size 11', 'mptc' ),
                    value: 'col-xl-11'
                },
                {
                    label: __( 'Size 12', 'mptc' ),
                    value: 'col-xl-12'
                }
            ] }
        />,
    ] )
}

export default ColumnSize;