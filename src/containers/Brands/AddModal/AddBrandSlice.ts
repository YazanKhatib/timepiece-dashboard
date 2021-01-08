import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Brands state
export interface addBrandState {
    name: string,
    editId: string,
    isLoading: boolean,
    isSuccess: boolean
}

const initialAddBrandState: addBrandState = {
    name: "",
    editId: "",
    isLoading: false,
    isSuccess: false,
}

// Add Brands slice
export const addBrandSlice = createSlice({
    name: 'add_brand',
    initialState: initialAddBrandState,
    reducers: {
        init: state => initialAddBrandState,
        set: ( state, {payload}: PayloadAction<{name: string}> ) => {
            state.name = payload.name
        },
        setEditId: ( state, {payload}: PayloadAction<string> ) => {
            state.editId = payload
        },
        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },
        setIsSuccess: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isSuccess = payload
        },
    }
})