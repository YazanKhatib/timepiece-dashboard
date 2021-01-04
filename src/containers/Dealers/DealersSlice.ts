import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface dealer {
    username: string,
    name: string,
    email: React.ReactNode,
    status: React.ReactNode,
    actions: React.ReactNode
}

export interface detailedDelaer {
    username: string,
    name: string,
    email: string,
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
    dealers: {
        [id: string]: dealer
    },
    dealer: detailedDelaer,
    detailsIsOpen: boolean,
    isLoadingDealer: boolean

}

const initialDealersState: dealersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    dealers: {},
    dealer: {
        username: "",
        name: "",
        email: "",
        phone: "",
        birth: "",
        gender: "",
        address: ""
    },
    detailsIsOpen: false,
    isLoadingDealer: true
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
        addDealers: ( state, {payload}: PayloadAction<{ [id: string]: dealer }> ) => {
            state.dealers = { ...state.dealers, ...payload }
        },
        setDealer: (state, {payload}: PayloadAction<detailedDelaer>) => {
            state.dealer = payload
        },
        setIsLoadingDealer: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoadingDealer = payload
        },
        setDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.detailsIsOpen = payload
        },
    }
})