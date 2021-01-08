import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface brand {
    id: string,
    name: string,
}

// Brands state
export interface brandsState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On delete/update laoder
    isFetching: boolean,
    hasMore: boolean,
    brands: brand[],
    loadingStatuses: string[],
    openAddModal: boolean
}

const initialBrandsState: brandsState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    hasMore: true,
    brands:[],
    loadingStatuses: [],
    openAddModal: false
}

// Users slice
export const brandsSlice = createSlice({
    name: 'brands',
    initialState: initialBrandsState,
    reducers: {
        setIsLoaded: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoaded = payload
        },
        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },
        setIsFetching: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isFetching = payload
        },
        setHasMore: ( state, {payload}: PayloadAction<boolean> ) => {
            state.hasMore = payload
        },
        addBrands: ( state, {payload}: PayloadAction<brand[]> ) => {
            state.brands = [ ...state.brands, ...payload ]
        },
        updateBrand: ( state, {payload}: PayloadAction<brand> ) => {
            let index = state.brands.findIndex( brand => brand.id === payload.id )
            alert(index)
            if( index !== -1 )
                state.brands[index] = payload
        },
        deleteBrands: ( state, {payload}: PayloadAction<string[]> ) => {
            payload.map(id => {
                let index = state.brands.findIndex( brand => brand.id === id )
                if( index != -1 )
                    state.brands.splice( index, 1 )
            })
        },
        setOpenAddModal: ( state, {payload}: PayloadAction<boolean> ) => {
            state.openAddModal = payload
        },
    }
})