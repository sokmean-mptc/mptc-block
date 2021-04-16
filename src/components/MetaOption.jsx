const { __ } = wp.i18n;
const { RangeControl, CheckboxControl, __experimentalNumberControl : NumberControl } = wp.components

const MetaOption = ( { attributes, setAttributes } ) => {
    const { 
        enable_title,
        title_length,
        enable_meta,
        enable_excerpt,
        excerpt_length,
        enable_post_date,
        enable_post_author,
        enable_post_read_more,
        enable_post_view_count,
        enable_post_tag
    } = attributes
    return (
        <div>
            <CheckboxControl
                label={ __( 'Enable Title', 'egov' ) }
                checked={ enable_title }
                onChange={ ( boolean ) => { setAttributes( { enable_title: boolean } ) } }
            />
            <NumberControl
                disabled={ ! enable_title }
                isShiftStepEnabled={ true }
                shiftStep={ 10 }
                value={ title_length }
                onChange={ ( value ) => { setAttributes( { title_length: value } ) } }
                min={ 1 }
            />
            <br/>
            <CheckboxControl
                label={ __( 'Enable Excerpt', 'egov' ) }
                checked={ enable_excerpt }
                onChange={ ( boolean ) => { setAttributes( { enable_excerpt: boolean } ) } }
            />
            <NumberControl
                disabled={ ! enable_excerpt }
                isShiftStepEnabled={ true }
                shiftStep={ 10 }
                value={ excerpt_length }
                onChange={ ( value ) => { setAttributes( { excerpt_length: value } ) } }
                min={ 1 }
            />
            <br/>
            <CheckboxControl
                label={ __( 'Enable Meta', 'egov' ) }
                checked={ enable_meta }
                onChange={ ( boolean ) => { setAttributes( { enable_meta: boolean } ) } }
            />
            <CheckboxControl
                disabled={ ! enable_meta }
                label={ __( 'Enable Post Date', 'egov' ) }
                checked={ enable_post_date }
                onChange={ ( boolean ) => { setAttributes( { enable_post_date: boolean } ) } }
            />
            <CheckboxControl
                disabled={ ! enable_meta }
                label={ __( 'Enable Post Author', 'egov' ) }
                checked={ enable_post_author }
                onChange={ ( boolean ) => { setAttributes( { enable_post_author: boolean } ) } }
            />
            <CheckboxControl
                disabled={ ! enable_meta }
                label={ __( 'Enable Post View Count', 'egov' ) }
                checked={ enable_post_view_count }
                onChange={ ( boolean ) => { setAttributes( { enable_post_view_count: boolean } ) } }
            />
            <CheckboxControl
                disabled={ ! enable_meta }
                label={ __( 'Enable Post Tag', 'egov' ) }
                checked={ enable_post_tag }
                onChange={ ( boolean ) => { setAttributes( { enable_post_tag: boolean } ) } }
            />
            <CheckboxControl
                disabled={ ! enable_meta }
                label={ __( 'Enable Post Read More', 'egov' ) }
                checked={ enable_post_read_more }
                onChange={ ( boolean ) => { setAttributes( { enable_post_read_more: boolean } ) } }
            />
        </div>
    )
}

export default MetaOption;