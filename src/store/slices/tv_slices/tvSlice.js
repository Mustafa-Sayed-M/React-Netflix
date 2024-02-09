import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../../functions/functions";
import api from "../../../services/api";

const constructApiUrl = (endpoint, params) => {
    const queryString = new URLSearchParams(params).toString();
    return `${api.base_url}${endpoint}?${queryString}`;
};

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzg0ZWNmYzliZDM3YWUyZWU5ZDY2NjkzZTUzOWE2YiIsInN1YiI6IjY1YzY2OTYzOTRkOGE4MDE2MjEyOGU2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y3UE_bp6BCbVVj3t8VJmOoraP4xdxylrK3nX-CM5Ms'
    }
};

export const fetchTv = createAsyncThunk('tvSlice/fetchTv', async ({ page, genre }) => {
    const API_TV = constructApiUrl(api.get_tv, { api_key: api.api_key, page, with_genres: genre });
    return fetchData(API_TV, options);
});

export const fetchTvGenres = createAsyncThunk('tvSlice/fetchTvGenres', async () => {
    const API_GENRES = constructApiUrl(api.get_tv_genres, { api_key: api.api_key });
    return fetchData(API_GENRES, options);
});

const tvSlice = createSlice({
    name: 'tvSlice',
    initialState: {
        tv: {
            data: {
                results: [],
                page: 0,
                total_pages: 0,
                total_results: 0,
            },
            loading: false,
            error: null,
        },
        genresTv: {
            data: {
                genres: []
            },
            loading: false,
            error: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        // ==================================
        builder.addCase(fetchTv.pending, (state, action) => {
            state.tv.loading = true;
        });
        builder.addCase(fetchTv.fulfilled, (state, action) => {
            state.tv.loading = false;
            state.tv.data = action.payload;
        });
        builder.addCase(fetchTv.rejected, (state, action) => {
            state.tv.loading = false;
            state.tv.error = action.error.message;
        });

        // ==================================
        builder.addCase(fetchTvGenres.pending, (state, action) => {
            state.genresTv.loading = true;
        });
        builder.addCase(fetchTvGenres.fulfilled, (state, action) => {
            state.genresTv.loading = false;
            state.genresTv.data = action.payload;
        });
        builder.addCase(fetchTvGenres.rejected, (state, action) => {
            state.genresTv.loading = false;
            state.genresTv.error = action.error.message;
        });
    }
});

// eslint-disable-next-line no-empty-pattern
export const { } = tvSlice.actions;
export default tvSlice.reducer;