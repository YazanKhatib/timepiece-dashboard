import { configureStore } from "@reduxjs/toolkit";

// Slices
import { loginSlice } from "../../containers/LoginForm/LoginFormSlice";
import { dealersSlice } from '../../containers/Dealers/DealersSlice';
import { usersSlice } from '../../containers/Users/UsersSlice';
import { watchesSlice } from '../../containers/Watches/WatchesSlice';
import { addWatcheSlice } from '../../containers/Watches/AddModal/AddWatchSlice';
import { analyticsSlice } from "../../containers/Analytics/AnalyticsSlice";
import { offersSlice } from "../../containers/Offers/OffersSclice";
import { ordersSlice } from "../../containers/Orders/OrdersSclice";
import { certificatesSlice } from "../../containers/Certificates/CertificatesSlice";
import { brandsSlice } from "../../containers/Brands/BrandsSlice";
import { addBrandSlice } from "../../containers/Brands/AddModal/AddBrandSlice"
import { predefinedMenusSlice } from '../../components/PredefinedMenus/PredefinedMenusSlice'
import { resetPasswordSlice } from "../../containers/ResetPasswordForm/ResetPasswordFormSlice";


const reducer = {
    login: loginSlice.reducer,
    reset_password: resetPasswordSlice.reducer,
    analytics: analyticsSlice.reducer,
    dealers: dealersSlice.reducer,
    users: usersSlice.reducer,
    watches: watchesSlice.reducer,
    add_watch: addWatcheSlice.reducer,
    offers: offersSlice.reducer,
    orders: ordersSlice.reducer,
    certificates: certificatesSlice.reducer,
    brands: brandsSlice.reducer,
    add_brand: addBrandSlice.reducer,
    predefined_menus: predefinedMenusSlice.reducer
}

export default configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})