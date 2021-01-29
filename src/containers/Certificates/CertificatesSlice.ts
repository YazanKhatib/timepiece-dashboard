import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
export interface user {
    id: string,
    username: string,
    name: string,
    email: string,
    email_status: boolean,
    status: boolean,
    phone: string,
    birth: string,
    gender: string,
    address: string
}

export interface certificate {
    id: string;
    fulfilled: boolean;
    user: user;
}

// Certificates state
export interface certificatesState {
    isLoaded: boolean, // First load
    isLoading: boolean, // On filtering laoder
    isFetching: boolean,
    certificates: certificate[],
    detailsIsOpen: boolean,
    activeCertificate: string
}

const initialCertificatesState: certificatesState = {
    isLoaded: false,
    isLoading: false,
    isFetching: false,
    certificates: [],
    detailsIsOpen: false,
    activeCertificate: ""
}

// Certificates slice
export const certificatesSlice = createSlice({
    name: 'certificates',
    initialState: initialCertificatesState,
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
        addCertificates: ( state, {payload}: PayloadAction<certificate[]> ) => {
            state.certificates = [ ...state.certificates, ...payload ]
        },
        setDetailsIsOpen: ( state, {payload}: PayloadAction<boolean> ) => {
            state.detailsIsOpen = payload
        },
        setActiveCertificate: ( state, {payload}: PayloadAction<string> ) => {
            state.activeCertificate = payload
        },
        setFulfilled: ( state, {payload}: PayloadAction<{ id: string, fulfilled: boolean }> ) => {
            let index = state.certificates.findIndex( certificate => certificate.id === payload.id )
            if( index !== -1 )
                state.certificates[index].fulfilled = payload.fulfilled
        },
    }
})