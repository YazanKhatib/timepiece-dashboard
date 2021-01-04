import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface dealer {
    id: string,
    username: string,
    name: string,
    email: string,
    email_status: boolean,
    status: boolean,
    phone: string,
    birth: string,
    gender: string,
    address: string
}

// Dealers state
export interface dealersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    dealers: dealer[],
    detailsIsOpen: boolean,
    loadingStatuses: string[],
    activeDealer: string
}

const initialDealersState: dealersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    dealers: [],
    detailsIsOpen: false,
    loadingStatuses: [],
    activeDealer: ""
}

// Dealers slice
export const dealersSlice = createSlice({
    name: 'dealers',
    initialState: initialDealersState,
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
        addDealers: ( state, {payload}: PayloadAction<dealer[]> ) => {
            state.dealers = [ ...state.dealers, ...payload ]
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
        setActiveDealer: ( state, {payload}: PayloadAction<string> ) => {
            state.activeDealer = payload
        },
    }
})