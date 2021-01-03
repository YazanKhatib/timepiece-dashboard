import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dealers state
export interface analyticsState {
    dealers: number | null,
    users: number | null,
    watches: number | null,
    isFetching: boolean,
    successCalls: number
}

const initialAnalyticsState: analyticsState = {
    dealers: null,
    users: null,
    watches: null,
    isFetching: false,
    successCalls: 0
}

// Analytics slice
export const analyticsSlice = createSlice({
    name: 'dealers',
    initialState: initialAnalyticsState,
    reducers: {
        setDealers: ( state, {payload}: PayloadAction<number> ) => {
            state.dealers = payload
            state.successCalls += 1
            if( state.successCalls === 3 )
                state.isFetching = false
        },
        setUsers: ( state, {payload}: PayloadAction<number> ) => {
            state.users = payload
            state.successCalls += 1
            if( state.successCalls === 3 )
                state.isFetching = false
        },
        setWatches: ( state, {payload}: PayloadAction<number> ) => {
            state.watches = payload
            state.successCalls += 1
            if( state.successCalls === 3 )
                state.isFetching = false
        },
        setIsFetching: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isFetching = payload
        },
    }
})