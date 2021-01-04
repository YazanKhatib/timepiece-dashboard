import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface user {
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

// Users state
export interface usersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    users: user[],
    detailsIsOpen: boolean,
    loadingStatuses: string[],
    activeUser: string
}

const initialUsersState: usersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    users: [],
    detailsIsOpen: false,
    loadingStatuses: [],
    activeUser: ""
}

// Users slice
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
        addUsers: ( state, {payload}: PayloadAction<user[]> ) => {
            state.users = [ ...state.users, ...payload ]
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
        setActiveUser: ( state, {payload}: PayloadAction<string> ) => {
            state.activeUser = payload
        },
    }
})