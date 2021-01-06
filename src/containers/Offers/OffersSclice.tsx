import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface watch {
    id: string,
    name: string,
    model: string,
    description: string,
    condition: string,
    location: string,
    delivery: string,
    price: number,
    proposed_price: number,
    production_year: number,
    case_material: string,
    movement: string,
    bracelet_material: string,
    gender: string,
    calibar: string,
    base_calibar: string,
    power_reserve: number,
    jewels: number,
    case_diameter: number,
    water_resistance: number,
    bezel_material: string,
    crystal: string,
    dial: string,
    dial_numbers: string,
    bracelet_color: string,
    clasp: string,
    clasp_material: string,
}


export interface user {
    id: string,
    username: string,
    name: string,
    email: string,
    phone: string,
    birth: string,
    gender: string,
    address: string,
    offers: watch[],
}

// Users state
export interface offersState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    users: user[],
    userDetailsIsOpen: boolean,
    watchDetailsIsOpen: boolean,
    loadingStatuses: string[],
    activeUser: string,
    activeWatch: string,
}

const initialOffersState: offersState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    users: [],
    userDetailsIsOpen: false,
    watchDetailsIsOpen: false,
    loadingStatuses: [],
    activeUser: "",
    activeWatch: "",
}

// Users slice
export const offersSlice = createSlice({
    name: 'offers',
    initialState: initialOffersState,
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
        setUserDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.userDetailsIsOpen = payload
        },
        setWatchDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.watchDetailsIsOpen = payload
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
        setActiveWatch: ( state, {payload}: PayloadAction<string> ) => {
            state.activeWatch = payload
        },
    }
})