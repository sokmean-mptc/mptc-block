const { __ } = wp.i18n;
const { SelectControl  } = wp.components

const ContainerOption = ( { attributes, setAttributes } ) => {
    const { container } = attributes
        
    return (
        <SelectControl
            label={ __( 'Container Option', 'mptc' ) }
            value={ container }
            options={ [
                { label: __( 'No Container', 'mptc' ), value: '' },
                { label: __( 'Container', 'mptc' ), value: 'container' },
                { label: __( 'Container SM', 'mptc' ), value: 'container-sm' },
                { label: __( 'Container MD', 'mptc' ), value: 'container-md' },
                { label: __( 'Container LG', 'mptc' ), value: 'container-lg' },
                { label: __( 'Container XL', 'mptc' ), value: 'container-xl' },
                { label: __( 'Container Fluid', 'mptc' ), value: 'container-fluid' }
            ] }
            onChange={ ( value ) => { setAttributes( { container: value } ) } }
        />
    )
}

export default ContainerOption;