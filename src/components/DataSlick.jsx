const { __ } = wp.i18n
const { CheckboxControl, __experimentalNumberControl : NumberControl } = wp.components
const DataSlick = ( { attributes, setAttributes } ) => {
    const { data_slick, data_slick_md, data_slick_sm, data_slick_xs } = attributes
    return (
        <div
            className={ 'data-slick' }
        >
            <label 
                className={ 'label-section' }
            >{ __( 'All Screen', 'mptc' ) }</label>
            <CheckboxControl
                label= { __( 'Adaptive Height', 'mptc' ) }
                checked={ data_slick.adaptiveHeight || false }
                onChange={ 
                    ( boolean ) => {
                        if ( boolean ) {
                            const { ...x } = data_slick
                            x.adaptiveHeight = boolean
                            setAttributes( { data_slick: x } )
                        } else {
                            const { adaptiveHeight, ...unssigned } = data_slick
                            setAttributes( { data_slick: unssigned } )
                        }
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Dots', 'mptc' ) }
                checked={ data_slick.dots || false }
                onChange={ 
                    ( boolean ) => {
                        if ( boolean ) {
                            const { ...x } = data_slick
                            x.dots = boolean
                            setAttributes( { data_slick: x } )
                        } else {
                            const { dots, ...unssigned } = data_slick
                            setAttributes( { data_slick: unssigned } )
                        }
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Arrows', 'mptc' ) }
                checked={ data_slick.arrows || false }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick
                        x.arrows = boolean
                        setAttributes( { data_slick: x } )
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Auto Play', 'mptc' ) }
                checked={ data_slick.autoplay || false }
                onChange={ 
                    ( boolean ) => {
                        if ( boolean ) {
                            const { ...x } = data_slick
                            x.autoplay = boolean
                            setAttributes( { data_slick: x } )
                        } else {
                            const { autoplay, ...unssigned } = data_slick
                            setAttributes( { data_slick: unssigned } )
                        }
                    }
                }
            />
            <NumberControl
                label={ __( 'Auto Play Speed (ms)', 'mptc' ) }
                isShiftStepEnabled={ true }
                shiftStep={ 1000 }                
                value={ data_slick.autoplaySpeed || 0 }
                min={ 0 }
                onChange={ 
                    ( value ) => {
                        if ( value > 0 ){
                            const { ...x } = data_slick
                            x.autoplaySpeed = parseInt( value )
                            setAttributes( { data_slick: x } )
                        } else {
                            const { autoplaySpeed, ...unssigned } = data_slick
                            setAttributes( { data_slick: unssigned } )
                        }
                    }
                }
            />
            <br/>
            <NumberControl
                label={ __( 'Slide To Show', 'mptc' ) }                
                value={ data_slick.slidesToShow || 1 }
                min={ 1 }
                max={ 12 }
                onChange={ 
                    ( value ) => {
                        if ( value > 1 ){
                            const { ...x } = data_slick
                            x.slidesToShow = parseInt( value )
                            x.slidesToScroll = parseInt( value )
                            setAttributes( { data_slick: x } )
                        } else {
                            const { slidesToShow, slidesToScroll, ...unssigned } = data_slick
                            setAttributes( { data_slick: unssigned } )
                        }
                    }
                }
            />
            <br/>
            <label className={ 'label-section' }>{ __( 'Screen < 992', 'mptc' ) }</label>
            <NumberControl
                label={ __( 'Slide To Show', 'mptc' ) }                
                value={ data_slick_md.hasOwnProperty( 'settings' ) ? ( data_slick_md.settings.slidesToShow || 0 ) : 0 }
                min={ 0 }
                max={ 12 }
                onChange={ 
                    ( value ) => {
                        if ( value > 0 ){
                            const { ...x } = data_slick_md
                            x.breakpoint = 992
                            if( ! x.hasOwnProperty( 'settings' ) ) {
                                x['settings'] = {
                                    dots: false,
                                    arrows: false
                                }
                            }
                            Object.assign( x.settings, {
                                slidesToShow: parseInt( value ),
                                slidesToScroll: parseInt( value )
                            } )
                            setAttributes( { data_slick_md: x } )
                        } else {
                            setAttributes( { data_slick_md: {} } )
                        }
                    }
                }
            />
            <br/>
            <CheckboxControl
                label= { __( 'Dots', 'mptc' ) }
                checked={ data_slick_md.settings ? ( data_slick_md.settings.dots || false ) : false }
                disabled ={ data_slick_md.settings ? ( data_slick_md.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_md
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { dots: boolean } )
                        setAttributes( { data_slick_md: x } )
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Arrows', 'mptc' ) }
                checked={ data_slick_md.settings ? ( data_slick_md.settings.arrows || false ) : false }
                disabled ={ data_slick_md.settings ? ( data_slick_md.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_md
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { arrows: boolean } )
                        setAttributes( { data_slick_md: x } )
                    }
                }
            />
            <br/>
            <label className={ 'label-section' }>{ __( 'Screen < 768', 'mptc' ) }</label>
            <NumberControl
                label={ __( 'Slide To Show', 'mptc' ) }                
                value={ data_slick_sm.hasOwnProperty( 'settings' ) ? ( data_slick_sm.settings.slidesToShow || 0 ) : 0 }
                min={ 0 }
                max={ 12 }
                onChange={ 
                    ( value ) => {
                        if ( value > 0 ){
                            const { ...x } = data_slick_sm
                            x.breakpoint = 768
                            if( ! x.hasOwnProperty( 'settings' ) ) {
                                x['settings'] = {
                                    dots: false,
                                    arrows: false
                                }
                            }
                            Object.assign( x.settings, {
                                slidesToShow: parseInt( value ),
                                slidesToScroll: parseInt( value )
                            } )
                            setAttributes( { data_slick_sm: x } )
                        } else {
                            setAttributes( { data_slick_sm: {} } )
                        }
                    }
                }
            />
            <br/>
            <CheckboxControl
                label= { __( 'Dots', 'mptc' ) }
                checked={ data_slick_sm.settings ? ( data_slick_sm.settings.dots || false ) : false }
                disabled ={ data_slick_sm.settings ? ( data_slick_sm.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_sm
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { dots: boolean } )
                        setAttributes( { data_slick_sm: x } )
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Arrows', 'mptc' ) }
                checked={ data_slick_sm.settings ? ( data_slick_sm.settings.arrows || false ) : false }
                disabled ={ data_slick_sm.settings ? ( data_slick_sm.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_sm
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { arrows: boolean } )
                        setAttributes( { data_slick_sm: x } )
                    }
                }
            />
            <br/>
            <label className={ 'label-section' }>{ __( 'Screen < 576', 'mptc' ) }</label>
            <NumberControl
                label={ __( 'Slide To Show', 'mptc' ) }                
                value={ data_slick_xs.hasOwnProperty( 'settings' ) ? ( data_slick_xs.settings.slidesToShow || 0 ) : 0 }
                min={ 0 }
                max={ 12 }
                onChange={ 
                    ( value ) => {
                        if ( value > 0 ){
                            const { ...x } = data_slick_xs
                            x.breakpoint = 576
                            if( ! x.hasOwnProperty( 'settings' ) ) {
                                x['settings'] = {
                                    dots: false,
                                    arrows: false
                                }
                            }
                            Object.assign( x.settings, {
                                slidesToShow: parseInt( value ),
                                slidesToScroll: parseInt( value )
                            } )
                            setAttributes( { data_slick_xs: x } )
                        } else {
                            setAttributes( { data_slick_xs: {} } )
                        }
                    }
                }
            />
            <br/>
            <CheckboxControl
                label= { __( 'Dots', 'mptc' ) }
                checked={ data_slick_xs.settings ? ( data_slick_xs.settings.dots || false ) : false }
                disabled ={ data_slick_xs.settings ? ( data_slick_xs.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_xs
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { dots: boolean } )
                        setAttributes( { data_slick_xs: x } )
                    }
                }
            />
            <CheckboxControl
                label= { __( 'Arrows', 'mptc' ) }
                checked={ data_slick_xs.settings ? ( data_slick_xs.settings.arrows || false ) : false }
                disabled ={ data_slick_xs.settings ? ( data_slick_xs.settings.slidesToShow ? false : true ) : true }
                onChange={ 
                    ( boolean ) => {
                        const { ...x } = data_slick_xs
                        if( ! x.hasOwnProperty( 'settings' ) ) {
                            x['settings'] = {
                                dots: false,
                                arrows: false
                            }
                        }
                        Object.assign( x.settings, { arrows: boolean } )
                        setAttributes( { data_slick_xs: x } )
                    }
                }
            />
        </div>
    )
}
export default DataSlick