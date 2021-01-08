import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface watch {
    id: string,
    name: string,
    model: string,
    description: string,
    condition: string,
    location: string,
    featured: boolean,
    confirmed: boolean,
    delivery: string,
    price: number,
    production_year: number,
    case_material: string,
    movement: string,
    bracelet_material: string,
    gender: string,
    calibar: string,
    base_calibar: string,
    power_reserve: number,
    jewels: number,
    case_diameter: number,
    water_resistance: number,
    bezel_material: string,
    crystal: string,
    dial: string,
    dial_numbers: string,
    bracelet_color: string,
    clasp: string,
    clasp_material: string,
}

// Watches state
export interface watchesState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    watches: watch[],
    detailsIsOpen: boolean,
    loadingStatuses: string[],
    activeWatch: string,
    openAddModal: boolean
}

const initialUsersState: watchesState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    watches: [],
    detailsIsOpen: false,
    loadingStatuses: [],
    activeWatch: "",
    openAddModal: false
}

// Users slice
export const watchesSlice = createSlice({
    name: 'watches',
    initialState: initialUsersState,
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
        addWatches: ( state, {payload}: PayloadAction<watch[]> ) => {
            state.watches = [ ...state.watches, ...payload ]
        },
        updateWatch: ( state, {payload}: PayloadAction<watch> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index] = payload
        },
        deleteWatches: ( state, {payload}: PayloadAction<string[]> ) => {
            payload.map(id => {
                let index = state.watches.findIndex( watch => watch.id === id )
                if( index != -1 )
                    state.watches.splice( index, 1 )
            })
        },
        setDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.detailsIsOpen = payload
        },
        addToLoadingStatuses: ( state, {payload}: PayloadAction<string> ) => {
            state.loadingStatuses.push(payload)
        },
        removeFromLoadingStatuses: ( state, {payload}: PayloadAction<string> ) => {
            let index = state.loadingStatuses.findIndex( status => status === payload )
            if( index != -1 )
                state.loadingStatuses.splice( index, 1 )
        },
        setActiveWatch: ( state, {payload}: PayloadAction<string> ) => {
            state.activeWatch = payload
        },
        setOpenAddModal: ( state, {payload}: PayloadAction<boolean> ) => {
            state.openAddModal = payload
        },
        setConfirmed: ( state, {payload}: PayloadAction<{ id: string, confirmed: boolean }> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index].confirmed = payload.confirmed
        },
        setFeatured: ( state, {payload}: PayloadAction<{ id: string, featured: boolean }> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index].featured = payload.featured
        },
    }
})