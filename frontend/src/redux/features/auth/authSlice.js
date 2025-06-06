import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload; //saving the credentials after login
            localStorage.setItem('userInfo', JSON.stringify(action.payload)) //the credentials are still saved even after refreshing the page ,i.e., after refreshing the page the user is still logged in.
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('expirationTime', expirationTime)
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const {
    setCredentials, 
    logout
} = authSlice.actions;

export default authSlice.reducer;