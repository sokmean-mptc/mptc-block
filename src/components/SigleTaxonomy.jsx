const { __ } = wp.i18n;
const { RadioControl } = wp.components

const SigleTaxonomy = ( { attributes, setAttributes } ) => {
    const { 
        post_type_ii, 
        post_type_ii_selected,
        taxonomy_ii, 
        taxonomy_ii_selected
    } = attributes

    // // Initialize Post Type
    if ( ! post_type_ii.length ) {
        wp.apiFetch ( {
            url: '/wp-json/wp/v2/types/'
        } ).then( data => {
            let type = []
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
                setAttributes( { post_type_ii: type } )
            }
        } )
    }

    // // Check Post Type Loading Avaliable
    if ( ! post_type_ii.length ) {
        return 'Loading Post Types ...'
    }

    // // Initialize the Taxonomy
    if ( ! taxonomy_ii.length && post_type_ii_selected ) {
        wp.apiFetch ( {
            url: '/wp-json/wp/v2/taxonomies/'
        } ).then( data => {
            let tax = []
            for ( const key in data ) {
                if ( data.hasOwnProperty( key ) ) {
                    const element = data[key]
                    element.types.forEach( type => {
                        if ( type == post_type_ii_selected ) {
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
                setAttributes( { taxonomy_ii: tax } )
            }
        } )
    }
        
    return (
        <div>
            <RadioControl
                label={ __( 'Post Type', 'mptc' ) }
                selected={ post_type_ii_selected }
                options={ post_type_ii }
                onChange={ ( value ) => {
                    setAttributes( { post_type_ii_selected: value, taxonomy_ii: [], taxonomy_ii_selected: null } )
                } }
                
            />
            
            { !! post_type_ii_selected &&
            <RadioControl
                label={ `Taxonomy (${post_type_ii_selected})` }
                selected={ taxonomy_ii_selected }
                options={ taxonomy_ii }
                onChange={ ( value ) => {
                    setAttributes( { taxonomy_ii_selected: value } )
                    
                } }
            />
            }
        </div>
    )
}

export default SigleTaxonomy;