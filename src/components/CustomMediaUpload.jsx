const { __ } = wp.i18n;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { Button, SelectControl, TextareaControl, ResponsiveWrapper } = wp.components

const CustomMediaUpload = ( { attributes, setAttributes } ) => {
    const { 
        media_uploader, 
        media_alt, 
        media_sizes, 
        media_sizes_selected    
    } = attributes

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={ ( media ) => {
                    // Structure ArrayObject label and value for SelectControl
                    let img_sizes = []
                    for ( const key in media.sizes ) {
                        if ( media.sizes.hasOwnProperty( key ) ) {
                            const image = media.sizes[key];
                            image.label = key
                            image.value = key
                            img_sizes.push( image )
                        }
                    }
                    setAttributes( { media_uploader: media, media_sizes: img_sizes, media_alt: media.alt, media_sizes_selected: img_sizes[0].value } )
                } }
                allowedTypes={ ['image'] }
                value={ media_uploader.hasOwnProperty('id') ? media_uploader.id : ''  }
                render={ ( { open } ) => (
                    <Button 
                        className='mptc-block-ratio-16x9' 
                        onClick={ open }
                        style={ { marginBottom: 15, backgroundColor: '#eee' } } 
                    >
                        { !! media_uploader.hasOwnProperty('sizes') &&
                            <div
                                style={{backgroundImage: `url(${ media_uploader.sizes.hasOwnProperty('thumbnail') ? media_uploader.sizes.thumbnail.url : media_uploader.sizes.full.url })` }}
                            >
                            </div>
                        }
                    </Button>
                ) }
            />
            { !! Object.keys( media_uploader ).length &&
                <MediaUploadCheck>
                    <Button onClick={ () => { 
                        setAttributes( { media_uploader: {}, media_alt: '', media_sizes: [], media_sizes_selected: '' } )
                    } } isLink isDestructive style={ { marginBottom: 15 } } >
                        { __( 'Remove image', 'egov' ) }
                    </Button>
                </MediaUploadCheck>
            }
            { !! Object.keys( media_uploader ).length &&
                <TextareaControl
                style={ { margin: 0 } }
                    label="Image Alt"
                    value={ media_alt }
                    onChange={ ( text ) => setAttributes( { media_alt: text } ) }
                />
            }
            { !! Object.keys( media_uploader ).length &&
                <SelectControl
                    label="Image Size"
                    value={ media_sizes_selected }
                    options={ media_sizes }
                    onChange={ ( value ) => { setAttributes( { media_sizes_selected: value } ) } }
                />
            }
        </MediaUploadCheck>
    )
}

export default CustomMediaUpload;