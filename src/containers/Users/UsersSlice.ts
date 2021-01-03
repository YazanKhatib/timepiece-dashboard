import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dealers state
export interface user {
    username: string,
    name: string,
    email: React.ReactNode,
    status: React.ReactNode,
    actions: React.ReactNode
}

export interface usersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    users: {
        [id: string]: user
    }

}

const initialUsersState: usersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    users: {}
}

// Dealers slice
export const usersSlice = createSlice({
    name: 'users',
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
        addUsers: ( state, {payload}: PayloadAction<{ [id: string]: user }> ) => {
            state.users = { ...state.users, ...payload }
        }
    }
})