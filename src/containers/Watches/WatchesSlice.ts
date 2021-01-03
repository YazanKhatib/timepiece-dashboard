import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dealers state
export interface watch {
    description: React.ReactNode,
    model: string,
    condition: string,
    price: number,
    actions: React.ReactNode,
    status: React.ReactNode
}

export interface watchesState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    watches: {
        [id: string]: watch
    }

}

const initialWatchsState: watchesState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    watches: {}
}

// Watchs slice
export const watchesSlice = createSlice({
    name: 'watches',
    initialState: initialWatchsState,
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
        addWatchs: ( state, {payload}: PayloadAction<{ [id: string]: watch }> ) => {
            state.watches = { ...state.watches, ...payload }
        }
    }
})