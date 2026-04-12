import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBlogs } from "../api/blog";

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async (_, { rejectWithValue }) => {
    try {
        const response = await getAllBlogs();
        if (response.success) {
            return response.data;
        } else {
            return rejectWithValue(response.message);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: [],
        categories: ['All'],
        loading: false,
        error: null
    },
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
                
                // Derive unique categories from blogs
                const uniqueCategories = [...new Set(action.payload.map(blog => blog.category))];
                state.categories = ['All', ...uniqueCategories];
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch blogs";
            });
    }
})

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;