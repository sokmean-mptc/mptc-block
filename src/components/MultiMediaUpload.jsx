const { __ } = wp.i18n;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor
const { Button, SelectControl } = wp.components

const MultiMediaUpload = ( { attributes, setAttributes } ) => {
    const { media_uploader, media_sizes, media_sizes_selected } = attributes
    // console.log(media_uploader.length)
    // console.log(media_uploader)
    // console.log(media_sizes)
    // console.log(media_sizes_selected)
    let id = []
    media_uploader.forEach( media => {
        id.push( media.id )
    } )
    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={ ( media ) => {
                    setAttributes( { media_uploader: media } )
                } }
                multiple={ true }
                gallery={ true }
                allowedTypes={ ['image'] }
                value={ media_uploader.length ? id : '' }
                render={ ( { open } ) => ( 
                    <div>
                        <Button 
                            className='editor-post-featured-image__toggle' 
                            onClick={ open }
                            style={ { marginBottom: 15, height: 40 } } 
                        >
                            {   
                                ! media_uploader.length &&
                                __( 'Open Media Library', 'mptc' ) 
                            }
                            {
                                !! media_uploader.length &&
                                <strong>
                                    
                                        { media_uploader.length +' ' }
                                        { __( 'Image(s)', 'mptc' ) }
                                    
                                    <p>
                                        { __( 'Edit Gallery', 'mptc' ) }
                                    </p>
                                </strong> 
                            
                            }
                        </Button>
                        {
                            !! media_uploader.length &&
                            [<Button 
                                onClick={ () => {
                                    setAttributes( { media_uploader: [] } )
                                } }
                                isLink 
                                isDestructive 
                            >
                                { __( 'Remove Gallery', 'mptc' ) }
                            </Button>,
                            <SelectControl
                                label="Image Size"
                                value={ media_sizes_selected }
                                options={ media_sizes }
                                onChange={ ( value ) => { setAttributes( { media_sizes_selected: value } ) } }
                            />]
                        }
                    </div>
                ) }
            />
            
           
            
        </MediaUploadCheck>
    )
}

export default MultiMediaUpload