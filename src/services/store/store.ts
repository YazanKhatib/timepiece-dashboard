import { configureStore } from "@reduxjs/toolkit";

// Slices
import { loginSlice } from "../../containers/LoginForm/LoginFormSlice";
import { dealersSlice } from '../../containers/Dealers/DealersSlice';
import { usersSlice } from '../../containers/Users/UsersSlice';
import { watchesSlice } from '../../containers/Watches/WatchesSlice';
import { addWatcheSlice } from '../../containers/Watches/AddModal/AddWatchSlice';
import { analyticsSlice } from "../../containers/Analytics/AnalyticsSlice";
import { offersSlice } from "../../containers/Offers/OffersSclice";
import { brandsSlice } from "../../containers/Brands/BrandsSlice";
import { addBrandSlice } from "../../containers/Brands/AddModal/AddBrandSlice"


const reducer = {
    login: loginSlice.reducer,
    analytics: analyticsSlice.reducer,
    dealers: dealersSlice.reducer,
    users: usersSlice.reducer,
    watches: watchesSlice.reducer,
    add_watch: addWatcheSlice.reducer,
    offers: offersSlice.reducer,
    brands: brandsSlice.reducer,
    add_brand: addBrandSlice.reducer
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})