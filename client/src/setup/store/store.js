import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slice/authSlice.js";
import blogReducer from "../../slice/blogSlice.js";
import dashboardReducer from "../../slice/dashboard.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        dashboard: dashboardReducer
    }
})

export default store;