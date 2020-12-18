import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: 'test',
    initialState: 0,
    reducers: {
        changeValue: ( state, {payload}: PayloadAction<{ n: number }> ) => state + payload.n
    }
})

export { testSlice }

const reducer = {
    test: testSlice.reducer
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})