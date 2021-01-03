import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dealers state
export interface analyticsState {
    dealers: number | null,
    users: number | null,
    watches: number | null
}

const initialAnalyticsState: analyticsState = {
    dealers: null,
    users: null,
    watches: null
}

// Analytics slice
export const analyticsSlice = createSlice({
    name: 'dealers',
    initialState: initialAnalyticsState,
    reducers: {
        setDealers: ( state, {payload}: PayloadAction<number> ) => {
            state.dealers = payload
        },
        setUsers: ( state, {payload}: PayloadAction<number> ) => {
            state.users = payload
        },
        setWatches: ( state, {payload}: PayloadAction<number> ) => {
            state.watches = payload
        },
    }
})