import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../api/dashboard.js";
import { useDispatch } from "react-redux";

const initialState = {
  dashboard: {
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardStats: (state, action) => {
      state.dashboard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard stats";
      });
  },
});

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardStats();
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { setDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
