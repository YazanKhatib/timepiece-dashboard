import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface detailedUser {
    username: string,
    name: string,
    email: string,
    phone: string,
    birth: string,
    gender: string,
    address: string
}


// Users state
export interface user {
    username: string,
    name: string,
    email: React.ReactNode,
    phone: string,
    actions: React.ReactNode
}

export interface usersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    users: {
        [id: string]: user
    },
    user: detailedUser,
    detailsIsOpen: boolean,
    isLoadingUser: boolean


}

const initialUsersState: usersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    users: {},
    user: {
        username: "",
        name: "",
        email: "",
        phone: "",
        birth: "",
        gender: "",
        address: ""
    },
    detailsIsOpen: false,
    isLoadingUser: true

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
        addUsers: ( state, {payload}: PayloadAction<{ [id: string]: user }> ) => {
            state.users = { ...state.users, ...payload }
        },
        setUser: (state, {payload}: PayloadAction<detailedUser>) => {
            state.user = payload
        },
        setIsLoadingUser: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoadingUser = payload
        },
        setDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.detailsIsOpen = payload
        },

    }
})