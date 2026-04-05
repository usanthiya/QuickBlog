import { createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage, getUserFromLocalStorage, setUserInLocalStorage, unsetUserInLocalStorage } from "../setup/helpers/auth";

const initialState = {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            setUserInLocalStorage(action.payload.token, action.payload.user);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            unsetUserInLocalStorage();
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;