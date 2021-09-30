const { __ } = wp.i18n;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor
const { Button } = wp.components

const MultiMediaUpload = ( { attributes, setAttributes } ) => {
    const { media_uploader } = attributes
    // console.log(media_uploader.length)
    // console.log(media_uploader)
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
                            <Button 
                                onClick={ () => {
                                    setAttributes( { media_uploader: [] } )
                                } }
                                isLink 
                                isDestructive 
                            >
                                { __( 'Remove Gallery', 'mptc' ) }
                            </Button>
                        }
                    </div>
                ) }
            />
            
           
            
        </MediaUploadCheck>
    )
}

export default MultiMediaUpload