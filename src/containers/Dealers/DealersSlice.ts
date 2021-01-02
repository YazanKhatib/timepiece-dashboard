import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dealers state
export interface dealer {
    username: string,
    name: string,
    email: React.ReactNode,
    status: React.ReactNode,
    actions: React.ReactNode
}

export interface dealersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    dealers: {
        [id: string]: dealer
    }

}

const initialDealersState: dealersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    dealers: {}
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
        }
    }
})