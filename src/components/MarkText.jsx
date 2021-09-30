const { TextControl } = wp.components

const MarkText = ( { attributes, setAttributes } ) => {
    const { mark_text } = attributes

    return (
        <TextControl
            label= { 'Mark Text' }
            value={ mark_text }
            onChange={ ( value ) => setAttributes( { mark_text: value } ) }
        />
    )
}

export default MarkText