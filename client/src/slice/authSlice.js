import { createSlice } from "@reduxjs/toolkit";
import { setUserInLocalStorage } from "../setup/helpers/auth";
import { getTokenFromLocalStorage, getUserFromLocalStorage } from "../setup/helpers/auth";

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
        }
    }
})

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;