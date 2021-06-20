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
    certified: boolean,
    images: string[],
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
    hasMore: boolean,
    watches: watch[],
    filteredWatches: watch[],
    detailsIsOpen: boolean,
    loadingStatuses: string[],
    loadingCertified: string[],
    activeWatch: string,
    openAddModal: boolean
}

const initialWatchesState: watchesState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    hasMore: true,
    watches: [],
    filteredWatches: [],
    detailsIsOpen: false,
    loadingStatuses: [],
    loadingCertified: [],
    activeWatch: "",
    openAddModal: false
}

// Users slice
export const watchesSlice = createSlice({
    name: 'watches',
    initialState: initialWatchesState,
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
        addWatches: ( state, {payload}: PayloadAction<watch[]> ) => {
            state.watches = [ ...state.watches, ...payload ]
        },
        updateWatch: ( state, {payload}: PayloadAction<watch> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index] = payload
            let filteredIndex = state.filteredWatches.findIndex( watch => watch.id === payload.id )
            if( filteredIndex !== -1 )
                state.filteredWatches[index] = payload
        },
        deleteWatches: ( state, {payload}: PayloadAction<string[]> ) => {
            payload.map(id => {
                let index = state.watches.findIndex( watch => watch.id === id )
                if( index != -1 )
                    state.watches.splice( index, 1 )
                let filteredIndex = state.filteredWatches.findIndex( watch => watch.id === id )
                if( filteredIndex !== -1 )
                    state.filteredWatches.splice( index, 1 )
            })
        },
        setFilteredWatches: ( state, {payload}: PayloadAction<watch[]> ) => {
            state.filteredWatches = payload
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
        addToLoadingCertified: ( state, {payload}: PayloadAction<string> ) => {
            state.loadingCertified.push(payload)
        },
        removeFromLoadingCertified: ( state, {payload}: PayloadAction<string> ) => {
            let index = state.loadingCertified.findIndex( status => status === payload )
            if( index != -1 )
                state.loadingCertified.splice( index, 1 )
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
            let filteredIndex = state.filteredWatches.findIndex( watch => watch.id === payload.id )
            if( filteredIndex !== -1 )
                state.filteredWatches[filteredIndex].confirmed = payload.confirmed
        },
        setCertified: ( state, {payload}: PayloadAction<{ id: string, certified: boolean }> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index].certified = payload.certified
            let filteredIndex = state.filteredWatches.findIndex( watch => watch.id === payload.id )
            if( filteredIndex !== -1 )
                state.filteredWatches[filteredIndex].certified = payload.certified
        },
        setFeatured: ( state, {payload}: PayloadAction<{ id: string, featured: boolean }> ) => {
            let index = state.watches.findIndex( watch => watch.id === payload.id )
            if( index !== -1 )
                state.watches[index].featured = payload.featured
            let filteredIndex = state.filteredWatches.findIndex( watch => watch.id === payload.id )
            if( filteredIndex !== -1 )
                state.filteredWatches[filteredIndex].featured = payload.featured
        },
    }
})