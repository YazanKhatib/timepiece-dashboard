import React, { useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { predefinedMenusSlice, predefinedState } from './PredefinedMenusSlice'

// API
import API from '../../services/api/api'

// Components
import { SelectField } from '../FormElements/FormElements'

export const BrandsMenu = (props: any) => {

    // Redux
    const dispatch = useDispatch()
    const state: predefinedState = useSelector( ( state: { predefined_menus: predefinedState } ) => state.predefined_menus )

    // Hooks
    const [ isFetching, setIsFetching ] = useState<boolean>(false)

    // API
    const ENDPOINTS = new API()

    const fetchData = () => {
        ENDPOINTS.brands().index({ limit: 1000, offset: 0 })
        .then((response: any) => {
            let brands: {label: string, value: string}[] = []
            response.data?.data?.getBrands?.results?.map((brand: {name: string}) => {
                brands.push({ label: brand.name, value: brand.name })
            })
            dispatch( predefinedMenusSlice.actions.setBrands(brands) )
            setIsFetching(false)
        })
    }

    return(
        <SelectField
            {...props}
            isLoading={isFetching}
            options={state.brands.list}
            onMenuOpen={() => {
                if( !state.brands.isLoaded && !isFetching ) {
                    setIsFetching(true)
                    fetchData()
                }
                
            }}
        />
    )

}