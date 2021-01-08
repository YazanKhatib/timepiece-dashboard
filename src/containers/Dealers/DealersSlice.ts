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
    hasMore: boolean,
    dealers: dealer[],
    detailsIsOpen: boolean,
    loadingStatuses: string[],
    activeDealer: string
}

const initialDealersState: dealersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    hasMore: true,
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
        setHasMore: ( state, {payload}: PayloadAction<boolean> ) => {
            state.hasMore = payload
        },
        addDealers: ( state, {payload}: PayloadAction<dealer[]> ) => {
            state.dealers = [ ...state.dealers, ...payload ]
        },
        deleteDealers: ( state, {payload}: PayloadAction<string[]> ) => {
            payload.map(id => {
                let index = state.dealers.findIndex( dealer => dealer.id === id )
                if( index != -1 )
                    state.dealers.splice( index, 1 )
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
        setActiveDealer: ( state, {payload}: PayloadAction<string> ) => {
            state.activeDealer = payload
        },
        setBlocked: ( state, {payload}: PayloadAction<{ id: string, blocked: boolean }> ) => {
            let index = state.dealers.findIndex( dealer => dealer.id === payload.id )
            if( index !== -1 )
                state.dealers[index].status = payload.blocked
        },
    }
})