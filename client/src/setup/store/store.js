import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slice/authSlice.js";
import blogReducer from "../../slice/blogSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer
    }
})

export default store;