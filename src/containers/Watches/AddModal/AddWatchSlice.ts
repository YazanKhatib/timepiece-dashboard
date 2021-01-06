import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Watches state
export interface addWatcheState {
    fields: {
        clasp_material: string,
        clasp: string,
        bracelet_color: string,
        dial_numbers: string,
        dial: string,
        crystal: string,
        bezel_material: string,
        water_resistance: string,
        case_diameter: string,
        jewels: string,
        power_reserve: string,
        base_calibar: string,
        calibar: string,
        gender: string,
        production_year: string,
        bracelet_material: string,
        case_material: string,
        movement: string,
        location: string,
        description: string,
        condition: string,
        delivery: string,
        price: string,
        model: string,
        brand: string
    },
    step: number
}

const initialAddWatchState: addWatcheState = {
    fields: {
        clasp_material: "",
        clasp: "",
        bracelet_color: "",
        dial_numbers: "",
        dial: "",
        crystal: "",
        bezel_material: "",
        water_resistance: "",
        case_diameter: "",
        jewels: "",
        power_reserve: "",
        base_calibar: "",
        calibar: "",
        gender: "",
        production_year: "",
        bracelet_material: "",
        case_material: "",
        movement: "",
        location: "",
        description: "",
        condition: "",
        delivery: "",
        price: "",
        model: "",
        brand: ""
    },
    step: 1
}

type fieldType = "clasp_material" | "clasp" | "bracelet_color" | "dial_numbers" | "dial" | "crystal" | "bezel_material" | "water_resistance" | "case_diameter" | "jewels" | "power_reserve" | "base_calibar" | "calibar" | "gender" | "production_year" | "bracelet_material" | "case_material" | "movement" | "location" | "description" | "condition" | "delivery" | "price" | "model" | "brand"

// Users slice
export const addWatcheSlice = createSlice({
    name: 'add_watche',
    initialState: initialAddWatchState,
    reducers: {
        set: ( state, {payload}: PayloadAction<{ field: fieldType, value: string }> ) => {
            state.fields[payload.field] = payload.value
        },
        setStep: ( state, {payload}: PayloadAction<number> ) => {
            state.step = payload
        },
    }
})