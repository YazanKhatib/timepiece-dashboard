import { configureStore } from "@reduxjs/toolkit";

// Slices
import { loginSlice } from "../../containers/LoginForm/LoginFormSlice";
import { dealersSlice } from '../../containers/Dealers/DealersSlice'


const reducer = {
    login: loginSlice.reducer,
    dealers: dealersSlice.reducer
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})