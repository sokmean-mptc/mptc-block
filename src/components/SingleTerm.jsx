const { __ } = wp.i18n;
const { SelectControl } = wp.components

const SingleTerm = ( { attributes, setAttributes } ) => {
    const { 
        post_type, 
        post_type_selected,
        taxonomy, 
        taxonomy_selected, 
        term,
        term_selected
    } = attributes

    // Initialize Post Type
    if ( ! post_type.length ) {
        wp.apiFetch ( {
            url: '/wp-json/wp/v2/types/'
        } ).then( data => {
            let type = [ 
                {
                    label: __( 'Select a Post Type', 'egov' ),
                    value: ''
                } 
            ]
            for ( const key in data ) {
                if ( data.hasOwnProperty( key ) ) {
                    const element = data[key]
                    if ( element.taxonomies.length ) {
                        const temp = {
                            label: element.name,
                            value: element.slug
                        }
                        type.push( temp )
                    }
                }
            }
            if ( type.length ) {
                setAttributes( { post_type: type } )
            }
        } )
    }

    // Initialize the Taxonomy
    if ( ! taxonomy.length && post_type_selected != '' ) {
        wp.apiFetch ( {
            url: '/wp-json/wp/v2/taxonomies/'
        } ).then( data => {
            let tax = [
                {
                    label: __( 'Select a Taxonomy' ),
                    value: ''
                }
            ]
            for ( const key in data ) {
                if ( data.hasOwnProperty( key ) ) {
                    const element = data[key]
                    element.types.forEach( type => {
                        if ( type == post_type_selected ) {
                            const temp = {
                                label: element.name,
                                value: element.slug,
                            }
                            tax.push( temp )
                        }
                    } )
                }	
            }
            if ( tax.length ) {
                setAttributes( { taxonomy: tax })
            }
        } )
    }
    
    // Initialize Term
    if ( ! term.length && taxonomy_selected != '' ) {
        let tax = taxonomy_selected
        switch ( tax ) {
            case 'category':
                tax = 'categories'
                break
            case 'post_tag':
                tax = 'tags'
                break
            case 'types':
                tax = 'section-types'
                break
        }
        wp.apiFetch ( {
            url: '/wp-json/wp/v2/'+tax+'?per_page=-1'
        } ).then( data => {
            let options = [
                {
                    label: __( 'Select a Term' ),
                    value: ''
                }
            ]
            for ( const key in data ) {
                if ( data.hasOwnProperty( key ) ) {
                    const element = data[key]
                    const temp = {
                        label: element.name,
                        value: element.id
                    }
                    options.push( temp )
                }	
            }
            if ( options.length ) {
                setAttributes( { term: options } )
            }
        } )
    }
    return (
        <div>
            <SelectControl
                label={ __( 'Post Type', 'egov' ) }
                value={ post_type_selected }
                options={ post_type }
                onChange={ ( option ) => { 
                    setAttributes( { 
                        post_type_selected: option, 
                        taxonomy: [], 
                        taxonomy_selected: '', 
                        term: [],
                        term_selected: '' 
                    } ) 
                } }
            />
            { !! post_type_selected &&
                <SelectControl
                    label={ __( 'Taxonomy', 'egov' ) }
                    value={ taxonomy_selected }
                    options={ taxonomy }
                    onChange={ ( option ) => {
                        setAttributes( { 
                            taxonomy_selected: option, 
                            term: [],
                            term_selected: ''
                        } )
                    } }
                />
            }
            { !! taxonomy_selected &&
                <SelectControl
                    label={ __( 'Select Term', 'egov' ) }
                    value={ term_selected }
                    options={ term }
                    onChange={ ( option ) => {
                        setAttributes( { term_selected: option } )
                    } }
                />
            }
        </div>
    )
}

export default SingleTerm
