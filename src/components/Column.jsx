const { __ } = wp.i18n
const { SelectControl } = wp.components
const Column = ( { attributes, setAttributes } ) => {
    const { col, col_sm, col_md, col_lg, col_xl } = attributes
    return ( [
        <SelectControl
            label={ __( 'Column XS', 'mptc' ) }
            value={ col }
            onChange={ ( col ) => setAttributes( { col } ) }
            options={ [
                { label: __( 'Auto', 'mptc' ), value: 'col' },
                { label: __( '1', 'mptc' ), value: 'col-1' },
                { label: __( '2', 'mptc' ), value: 'col-2' },
                { label: __( '3', 'mptc' ), value: 'col-3' },
                { label: __( '4', 'mptc' ), value: 'col-4' },
                { label: __( '5', 'mptc' ), value: 'col-5' },
                { label: __( '6', 'mptc' ), value: 'col-6' },
                { label: __( '7', 'mptc' ), value: 'col-7' },
                { label: __( '8', 'mptc' ), value: 'col-8' },
                { label: __( '9', 'mptc' ), value: 'col-9' }, 
                { label: __( '10', 'mptc' ), value: 'col-10' },
                { label: __( '11', 'mptc' ), value: 'col-11' },
                { label: __( '12', 'mptc' ), value: 'col-12' }
            ] }
        />,
        <SelectControl
            label={ __( 'Column SM', 'mptc' ) }
            value={ col_sm }
            onChange={ ( col_sm ) => setAttributes( { col_sm } ) }
            options={ [
                { label: __( 'Bypass', 'mptc' ), value: '' },
                { label: __( 'Auto', 'mptc' ), value: 'col-sm' },
                { label: __( '1', 'mptc' ), value: 'col-sm-1' },
                { label: __( '2', 'mptc' ), value: 'col-sm-2' },
                { label: __( '3', 'mptc' ), value: 'col-sm-3' },
                { label: __( '4', 'mptc' ), value: 'col-sm-4' },
                { label: __( '5', 'mptc' ), value: 'col-sm-5' },
                { label: __( '6', 'mptc' ), value: 'col-sm-6' },
                { label: __( '7', 'mptc' ), value: 'col-sm-7' },
                { label: __( '8', 'mptc' ), value: 'col-sm-8' },
                { label: __( '9', 'mptc' ), value: 'col-sm-9' }, 
                { label: __( '10', 'mptc' ), value: 'col-sm-10' },
                { label: __( '11', 'mptc' ), value: 'col-sm-11' },
                { label: __( '12', 'mptc' ), value: 'col-sm-12' }
            ] }
        />,
        <SelectControl
            label={ __( 'Column MD', 'mptc' ) }
            value={ col_md }
            onChange={ ( col_md ) => setAttributes( { col_md } ) }
            options={ [
                { label: __( 'Bypass', 'mptc' ), value: '' },
                { label: __( 'Auto', 'mptc' ), value: 'col-md' },
                { label: __( '1', 'mptc' ), value: 'col-md-1' },
                { label: __( '2', 'mptc' ), value: 'col-md-2' },
                { label: __( '3', 'mptc' ), value: 'col-md-3' },
                { label: __( '4', 'mptc' ), value: 'col-md-4' },
                { label: __( '5', 'mptc' ), value: 'col-md-5' },
                { label: __( '6', 'mptc' ), value: 'col-md-6' },
                { label: __( '7', 'mptc' ), value: 'col-md-7' },
                { label: __( '8', 'mptc' ), value: 'col-md-8' },
                { label: __( '9', 'mptc' ), value: 'col-md-9' }, 
                { label: __( '10', 'mptc' ), value: 'col-md-10' },
                { label: __( '11', 'mptc' ), value: 'col-md-11' },
                { label: __( '12', 'mptc' ), value: 'col-md-12' }
            ] }
        />,
        <SelectControl
            label={ __( 'Column LG', 'mptc' ) }
            value={ col_lg }
            onChange={ ( col_lg ) => setAttributes( { col_lg } ) }
            options={ [
                { label: __( 'Bypass', 'mptc' ), value: '' },
                { label: __( 'Auto', 'mptc' ), value: 'col-lg' },
                { label: __( '1', 'mptc' ), value: 'col-lg-1' },
                { label: __( '2', 'mptc' ), value: 'col-lg-2' },
                { label: __( '3', 'mptc' ), value: 'col-lg-3' },
                { label: __( '4', 'mptc' ), value: 'col-lg-4' },
                { label: __( '5', 'mptc' ), value: 'col-lg-5' },
                { label: __( '6', 'mptc' ), value: 'col-lg-6' },
                { label: __( '7', 'mptc' ), value: 'col-lg-7' },
                { label: __( '8', 'mptc' ), value: 'col-lg-8' },
                { label: __( '9', 'mptc' ), value: 'col-lg-9' }, 
                { label: __( '10', 'mptc' ), value: 'col-lg-10' },
                { label: __( '11', 'mptc' ), value: 'col-lg-11' },
                { label: __( '12', 'mptc' ), value: 'col-lg-12' }
            ] }
        />,
        <SelectControl
            label={ __( 'Column XL', 'mptc' ) }
            value={ col_xl }
            onChange={ ( col_xl ) => setAttributes( { col_xl } ) }
            options={ [
                { label: __( 'Bypass', 'mptc' ), value: '' },
                { label: __( 'Auto', 'mptc' ), value: 'col-xl' },
                { label: __( '1', 'mptc' ), value: 'col-xl-1' },
                { label: __( '2', 'mptc' ), value: 'col-xl-2' },
                { label: __( '3', 'mptc' ), value: 'col-xl-3' },
                { label: __( '4', 'mptc' ), value: 'col-xl-4' },
                { label: __( '5', 'mptc' ), value: 'col-xl-5' },
                { label: __( '6', 'mptc' ), value: 'col-xl-6' },
                { label: __( '7', 'mptc' ), value: 'col-xl-7' },
                { label: __( '8', 'mptc' ), value: 'col-xl-8' },
                { label: __( '9', 'mptc' ), value: 'col-xl-9' }, 
                { label: __( '10', 'mptc' ), value: 'col-xl-10' },
                { label: __( '11', 'mptc' ), value: 'col-xl-11' },
                { label: __( '12', 'mptc' ), value: 'col-xl-12' }
            ] }
        />
    ] )
}
export default Column;