import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../services/api';


export const fetchTrending = createAsyncThunk('trendingSlice/fetchTrending', async () => {
    const API_TRENDING = `${api.base_url}${api.get_trending_all_day}?api_key=${api.api_key}`
    const res = await fetch(API_TRENDING);
    const data = await res.json();
    return data;
})

const trendingSlice = createSlice({
    name: 'trendingSlice',
    initialState: {
        trending: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0
            },
            loading: false,
            error: null
        },
    },
    reducers: {
        setSearchValue: (state, action) => {
            state.trending.searchValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrending.pending, (state, action) => {
            state.trending.loading = true;
        });
        builder.addCase(fetchTrending.fulfilled, (state, action) => {
            state.trending.loading = false;
            state.trending.data = action.payload;
        });
        builder.addCase(fetchTrending.rejected, (state, action) => {
            console.log(Error('Failed Get Data'));
            state.trending.loading = false;
            state.trending.error = action.error.message;
        });
    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = trendingSlice.actions;
export default trendingSlice.reducer;