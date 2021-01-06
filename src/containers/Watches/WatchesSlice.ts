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
    }
})