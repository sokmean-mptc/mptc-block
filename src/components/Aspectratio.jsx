const { __ } = wp.i18n
const { SelectControl  } = wp.components

const Aspectratio = ( { attributes, setAttributes } ) => {
    const { 
        aspectratio_xs, 
        aspectratio_sm, 
        aspectratio_md, 
        aspectratio_lg,
        aspectratio_xl
    } = attributes
        
    return (
        <div>
            <SelectControl
                label={ __( 'Aspectratio XS', 'egov' ) }
                value={ aspectratio_xs }
                options={ [
                    { 
                        label: __( 'Aspectratio 4:1', 'egov' ), 
                        value: 'ratio-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'egov' ), 
                        value: 'ratio-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'egov' ), 
                        value: 'ratio-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'egov' ), 
                        value: 'ratio-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'egov' ), 
                        value: 'ratio-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'egov' ), 
                        value: 'ratio-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'egov' ), 
                        value: 'ratio-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'egov' ), 
                        value: 'ratio-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_xs: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio SM', 'egov' ) }
                value={ aspectratio_sm }
                options={ [
                    { 
                        label: __( 'Bypass', 'egov' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'egov' ), 
                        value: 'ratio-sm-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'egov' ), 
                        value: 'ratio-sm-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'egov' ), 
                        value: 'ratio-sm-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'egov' ), 
                        value: 'ratio-sm-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'egov' ), 
                        value: 'ratio-sm-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'egov' ), 
                        value: 'ratio-sm-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'egov' ), 
                        value: 'ratio-sm-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'egov' ), 
                        value: 'ratio-sm-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_sm: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio MD', 'egov' ) }
                value={ aspectratio_md }
                options={ [
                    { 
                        label: __( 'Bypass', 'egov' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'egov' ), 
                        value: 'ratio-md-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'egov' ), 
                        value: 'ratio-md-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'egov' ), 
                        value: 'ratio-md-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'egov' ), 
                        value: 'ratio-md-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'egov' ), 
                        value: 'ratio-md-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'egov' ), 
                        value: 'ratio-md-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'egov' ), 
                        value: 'ratio-md-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'egov' ), 
                        value: 'ratio-md-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_md: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio LG', 'egov' ) }
                value={ aspectratio_lg }
                options={ [
                    { 
                        label: __( 'Bypass', 'egov' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'egov' ), 
                        value: 'ratio-lg-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'egov' ), 
                        value: 'ratio-lg-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'egov' ), 
                        value: 'ratio-lg-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'egov' ), 
                        value: 'ratio-lg-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'egov' ), 
                        value: 'ratio-lg-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'egov' ), 
                        value: 'ratio-lg-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'egov' ), 
                        value: 'ratio-lg-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'egov' ), 
                        value: 'ratio-lg-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_lg: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio XL', 'egov' ) }
                value={ aspectratio_xl }
                options={ [
                    { 
                        label: __( 'Bypass', 'egov' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'egov' ), 
                        value: 'ratio-xl-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'egov' ), 
                        value: 'ratio-xl-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'egov' ), 
                        value: 'ratio-xl-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'egov' ), 
                        value: 'ratio-xl-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'egov' ), 
                        value: 'ratio-xl-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'egov' ), 
                        value: 'ratio-xl-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'egov' ), 
                        value: 'ratio-xl-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'egov' ), 
                        value: 'ratio-xl-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_xl: col } ) } }
            />
        </div>
    )
}

export default Aspectratio;