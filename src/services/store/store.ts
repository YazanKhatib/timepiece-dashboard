import { configureStore } from "@reduxjs/toolkit";

// Slices
import { loginSlice } from "../../containers/LoginForm/LoginFormSlice";
import { dealersSlice } from '../../containers/Dealers/DealersSlice';
import { usersSlice } from '../../containers/Users/UsersSlice';
import { watchesSlice } from '../../containers/Watches/WatchesSlice';
import { analyticsSlice } from "../../containers/Analytics/AnalyticsSlice";


const reducer = {
    login: loginSlice.reducer,
    analytics: analyticsSlice.reducer,
    dealers: dealersSlice.reducer,
    users: usersSlice.reducer,
    watches: watchesSlice.reducer
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})