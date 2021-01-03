import { configureStore } from "@reduxjs/toolkit";

// Slices
import { loginSlice } from "../../containers/LoginForm/LoginFormSlice";
import { dealersSlice } from '../../containers/Dealers/DealersSlice';
import { usersSlice } from '../../containers/Users/UsersSlice';


const reducer = {
    login: loginSlice.reducer,
    dealers: dealersSlice.reducer,
    users: usersSlice.reducer,
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})