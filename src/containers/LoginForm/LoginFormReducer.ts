import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Login state
export interface loginState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean
}

const initialLoginState: loginState = {
    isLoading: false,
    isSuccess: false,
    isError: false
}

// Login slice
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        load: ( state ) => {
            state.isLoading = true
        },
        success: ( state ) => {
            state.isSuccess = true
        },
        error: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = false
            state.isError = payload
        },
    }
})



// Auth state
export interface authState {
    username: string,
    email: string,
    avatar: string,
    token: string,
    isLoggedIn: boolean
}

const initialAuthState: authState = {
    username: '',
    email: '',
    avatar: '',
    token: '',
    isLoggedIn: false
}

// Auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        set: ( state, {payload}: PayloadAction<{ username: string, email: string, avatar: string, token: string, isLoggedIn: boolean }> ) => {
            state = payload
        },
        logout: ( state, action ) => {
            state = initialAuthState
        }
    }
})