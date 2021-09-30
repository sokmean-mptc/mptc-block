const { __ } = wp.i18n;
const { SelectControl, CheckboxControl, RangeControl } = wp.components

const ThumbnailColumnSize = ( { attributes, setAttributes } ) => {
    const { 
        enable_thumbnail,
        thumbnail_size,
        thumbnail_column_xs,
        thumbnail_column_sm,
        thumbnail_column_md,
        thumbnail_column_lg,
        thumbnail_column_xl,
        thumbnail_column_sm_bypass,
        thumbnail_column_md_bypass,
        thumbnail_column_lg_bypass,
        thumbnail_column_xl_bypass,
    } = attributes
        
    return ( [
            <CheckboxControl
                label={ __( 'Enable Thumbnail', 'mptc' ) }
                checked={ enable_thumbnail }
                onChange={ ( boolean ) => { setAttributes( { enable_thumbnail: boolean } ) } }
            />,
            <SelectControl
                label={ __( 'Thumbnail Size', 'mptc' ) }
                value={ thumbnail_size }
                disabled={ ! enable_thumbnail }
                options={ [
                    {
                        label: __( 'Thumbnail', 'mptc' ),
                        value: 'thumbnail'
                    },
                    {
                        label: __( 'Medium', 'mptc' ),
                        value: 'medium'
                    },
                    {
                        label: __( 'Large', 'mptc' ),
                        value: 'large'
                    },
                    {
                        label: __( 'Full', 'mptc' ),
                        value: 'full'
                    }
                ] }
                onChange={ ( size ) => { setAttributes( { thumbnail_size: size } ) } }
            />,
            <RangeControl
                disabled={ ! enable_thumbnail }
                label={ __( 'Column SM', 'mptc' ) }
                value={ thumbnail_column_xs }
                onChange={ ( columns ) => setAttributes( { thumbnail_column_xs: columns } ) }
                min={ 1 }
                max={ 12 }
            />,
            <div>
                <RangeControl
                    disabled={ ! ( ( enable_thumbnail ) * ( ! thumbnail_column_sm_bypass ) ) }
                    label={ __( 'Column SM', 'mptc' ) }
                    value={ thumbnail_column_sm }
                    onChange={ ( columns ) => setAttributes( { thumbnail_column_sm: columns } ) }
                    min={ 1 }
                    max={ 12 }
                />
            </div>,
            <CheckboxControl
                disabled={ ! enable_thumbnail }
                label={ __( 'Bypass', 'mptc' ) }
                checked={ thumbnail_column_sm_bypass }
                onChange={ ( boolean ) => { setAttributes( { thumbnail_column_sm_bypass: boolean } ) } }
            />,
            <div>
                <RangeControl
                    disabled={ ! ( ( enable_thumbnail ) * ( ! thumbnail_column_md_bypass ) ) }
                    label={ __( 'Column MD', 'mptc' ) }
                    value={ thumbnail_column_md }
                    onChange={ ( columns ) => setAttributes( { thumbnail_column_md: columns } ) }
                    min={ 1 }
                    max={ 12 }
                />
            </div>,
            <CheckboxControl
                disabled={ ! enable_thumbnail }
                label={ __( 'Bypass', 'mptc' ) }
                checked={ thumbnail_column_md_bypass }
                onChange={ ( boolean ) => { setAttributes( { thumbnail_column_md_bypass: boolean } ) } }
            />,
            <div>
                <RangeControl
                    disabled={ ! ( ( enable_thumbnail ) * ( ! thumbnail_column_lg_bypass ) ) }
                    label={ __( 'Column MD', 'mptc' ) }
                    value={ thumbnail_column_lg }
                    onChange={ ( columns ) => setAttributes( { thumbnail_column_lg: columns } ) }
                    min={ 1 }
                    max={ 12 }
                />
            </div>,
            <CheckboxControl
                disabled={ ! enable_thumbnail }
                label={ __( 'Bypass', 'mptc' ) }
                checked={ thumbnail_column_lg_bypass }
                onChange={ ( boolean ) => { setAttributes( { thumbnail_column_lg_bypass: boolean } ) } }
            />,
            <div>
                <RangeControl
                    disabled={ ! ( ( enable_thumbnail ) * ( ! thumbnail_column_xl_bypass ) ) }
                    label={ __( 'Column MD', 'mptc' ) }
                    value={ thumbnail_column_xl }
                    onChange={ ( columns ) => setAttributes( { thumbnail_column_xl: columns } ) }
                    min={ 1 }
                    max={ 12 }
                />
            </div>,
            <CheckboxControl
                disabled={ ! enable_thumbnail }
                label={ __( 'Bypass', 'mptc' ) }
                checked={ thumbnail_column_xl_bypass }
                onChange={ ( boolean ) => { setAttributes( { thumbnail_column_xl_bypass: boolean } ) } }
            />,
    ] )
}

export default ThumbnailColumnSize;