import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        isSetAuth(state, action) {
            state.isAuth = action.payload;
        },
    }
})

export const { isSetAuth} = authSlice.actions;
export default authSlice;