import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../services/api';
import { fetchData } from '../../functions/functions';

const constructApiUrl = (endpoint, params) => {
    const queryString = new URLSearchParams(params).toString();
    return `${api.base_url}${endpoint}?${queryString}`;
};

export const fetchSearch = createAsyncThunk('searchSLice/fetchSearch', async (query) => {
    const API_SEARCH = `${api.base_url}${api.get_multiSearch}?api_key=${api.api_key}&query=${query}}`
    return fetchData(API_SEARCH);
})

export const fetchSearchMovies = createAsyncThunk('moviesSlice/fetchSearchMovies', async ({ query }) => {
    const API_SEARCH_MOVIES = constructApiUrl(api.get_search_movie, { api_key: api.api_key, query: query });
    return fetchData(API_SEARCH_MOVIES);
});

export const fetchSearchTv = createAsyncThunk('moviesSlice/fetchSearchTv', async ({ query }) => {
    const API_SEARCH_TV = constructApiUrl(api.get_search_tv, { api_key: api.api_key, query: query });
    return fetchData(API_SEARCH_TV);
});

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        searchResults: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0
            },
            keyword: '',
            loading: false,
            error: null,
        },
        searchMovies: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0,
            },
            loading: false,
            error: null,
        },
        searchTv: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0,
            },
            loading: false,
            error: null,
        },
        keyword: '',
    },
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearch.pending, (state) => {
            state.searchResults.loading = true;
        });
        builder.addCase(fetchSearch.fulfilled, (state, action) => {
            state.searchResults.loading = false;
            state.searchResults.data = action.payload;
        });
        builder.addCase(fetchSearch.rejected, (state, action) => {
            console.log(Error('Failed Get Data'));
            state.searchResults.loading = false;
            state.searchResults.error = action.error.message;
        });

        // ==================================
        builder.addCase(fetchSearchMovies.pending, (state) => {
            state.searchMovies.loading = true;
        });
        builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
            state.searchMovies.loading = false;
            state.searchMovies.data = action.payload;
        });
        builder.addCase(fetchSearchMovies.rejected, (state, action) => {
            state.searchMovies.loading = false;
            state.searchMovies.error = action.error.message;
        });

        // ==================================
        builder.addCase(fetchSearchTv.pending, (state) => {
            state.searchTv.loading = true;
        });
        builder.addCase(fetchSearchTv.fulfilled, (state, action) => {
            state.searchTv.loading = false;
            state.searchTv.data = action.payload;
        });
        builder.addCase(fetchSearchTv.rejected, (state, action) => {
            state.searchTv.loading = false;
            state.searchTv.error = action.error.message;
        });
    }
})

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;