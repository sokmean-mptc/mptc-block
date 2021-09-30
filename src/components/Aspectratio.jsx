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
                label={ __( 'Aspectratio XS', 'mptc' ) }
                value={ aspectratio_xs }
                options={ [
                    { 
                        label: __( 'Aspectratio 4:1', 'mptc' ), 
                        value: 'ratio-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'mptc' ), 
                        value: 'ratio-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'mptc' ), 
                        value: 'ratio-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'mptc' ), 
                        value: 'ratio-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'mptc' ), 
                        value: 'ratio-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'mptc' ), 
                        value: 'ratio-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'mptc' ), 
                        value: 'ratio-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'mptc' ), 
                        value: 'ratio-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_xs: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio SM', 'mptc' ) }
                value={ aspectratio_sm }
                options={ [
                    { 
                        label: __( 'Bypass', 'mptc' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'mptc' ), 
                        value: 'ratio-sm-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'mptc' ), 
                        value: 'ratio-sm-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'mptc' ), 
                        value: 'ratio-sm-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'mptc' ), 
                        value: 'ratio-sm-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'mptc' ), 
                        value: 'ratio-sm-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'mptc' ), 
                        value: 'ratio-sm-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'mptc' ), 
                        value: 'ratio-sm-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'mptc' ), 
                        value: 'ratio-sm-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_sm: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio MD', 'mptc' ) }
                value={ aspectratio_md }
                options={ [
                    { 
                        label: __( 'Bypass', 'mptc' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'mptc' ), 
                        value: 'ratio-md-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'mptc' ), 
                        value: 'ratio-md-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'mptc' ), 
                        value: 'ratio-md-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'mptc' ), 
                        value: 'ratio-md-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'mptc' ), 
                        value: 'ratio-md-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'mptc' ), 
                        value: 'ratio-md-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'mptc' ), 
                        value: 'ratio-md-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'mptc' ), 
                        value: 'ratio-md-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_md: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio LG', 'mptc' ) }
                value={ aspectratio_lg }
                options={ [
                    { 
                        label: __( 'Bypass', 'mptc' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'mptc' ), 
                        value: 'ratio-lg-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'mptc' ), 
                        value: 'ratio-lg-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'mptc' ), 
                        value: 'ratio-lg-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'mptc' ), 
                        value: 'ratio-lg-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'mptc' ), 
                        value: 'ratio-lg-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'mptc' ), 
                        value: 'ratio-lg-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'mptc' ), 
                        value: 'ratio-lg-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'mptc' ), 
                        value: 'ratio-lg-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_lg: col } ) } }
            />
            <SelectControl
                label={ __( 'Aspectratio XL', 'mptc' ) }
                value={ aspectratio_xl }
                options={ [
                    { 
                        label: __( 'Bypass', 'mptc' ), 
                        value: null
                    },
                    { 
                        label: __( 'Aspectratio 4:1', 'mptc' ), 
                        value: 'ratio-xl-4x1' 
                    },
                    { 
                        label: __( 'Aspectratio 21:9', 'mptc' ), 
                        value: 'ratio-xl-21x9' 
                    },
                    { 
                        label: __( 'Aspectratio 16:9', 'mptc' ), 
                        value: 'ratio-xl-16x9' 
                    },
                    { 
                        label: __( 'Aspectratio 4:3', 'mptc' ), 
                        value: 'ratio-xl-4x3' },
                    { 
                        label: __( 'Aspectratio 1:1', 'mptc' ), 
                        value: 'ratio-xl-1x1' 
                    },
                    { 
                        label: __( 'Aspectratio 2:3', 'mptc' ), 
                        value: 'ratio-xl-2x3' 
                    },
                    { 
                        label: __( 'Aspectratio 3:4', 'mptc' ), 
                        value: 'ratio-xl-3x4' 
                    },
                    { 
                        label: __( 'Aspectratio 8:1', 'mptc' ), 
                        value: 'ratio-xl-8x1' 
                    }
                ] }
                onChange={ ( col ) => { setAttributes( { aspectratio_xl: col } ) } }
            />
        </div>
    )
}

export default Aspectratio;