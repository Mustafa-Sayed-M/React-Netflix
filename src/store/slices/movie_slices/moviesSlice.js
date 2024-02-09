import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../../functions/functions";
import api from '../../../services/api';

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

export const fetchMovies = createAsyncThunk('moviesSlice/fetchMovies', async ({ page, genre }) => {
    const API_MOVIES = constructApiUrl(api.get_movies, { api_key: api.api_key, page, with_genres: genre });
    return fetchData(API_MOVIES, options);
});


export const fetchMovieGenres = createAsyncThunk('moviesSlice/fetchMovieGenres', async () => {
    const API_GENRES = constructApiUrl(api.get_movies_genres, { api_key: api.api_key });
    return fetchData(API_GENRES, options);
});

export const fetchUpcomingMovies = createAsyncThunk('moviesSlice/fetchUpcomingMovies', async () => {
    const API_UPCOMING = constructApiUrl(`${api.get_movie}${api.get_upcoming}`, { api_key: api.api_key });
    return fetchData(API_UPCOMING, options);
});

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState: {
        movies: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0,
            },
            loading: false,
            error: null,
        },
        genresMovies: {
            data: {
                genres: []
            },
            loading: false,
            error: null,
        },
        upcomingMovies: {
            data: {
                page: 0,
                results: [],
                total_results: 0,
                total_pages: 0,
            },
            loading: false,
            error: null,
        },
    },
    reducers: {
        addQuery: (state, action) => {
            state.searchMovies.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        // ==================================
        builder.addCase(fetchMovies.pending, (state) => {
            state.movies.loading = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies.loading = false;
            state.movies.data = action.payload;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.movies.loading = false;
            state.movies.error = action.error.message;
        });

        // ==================================
        builder.addCase(fetchMovieGenres.pending, (state, action) => {
            state.genresMovies.loading = true;
        });
        builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
            state.genresMovies.loading = false;
            state.genresMovies.data = action.payload;
        });
        builder.addCase(fetchMovieGenres.rejected, (state, action) => {
            state.genresMovies.loading = false;
            state.genresMovies.error = action.error.message;
        });

        // ==================================
        builder.addCase(fetchUpcomingMovies.pending, (state, action) => {
            state.upcomingMovies.loading = true;
        });
        builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
            state.upcomingMovies.loading = false;
            state.upcomingMovies.data = action.payload;
        });
        builder.addCase(fetchUpcomingMovies.rejected, (state, action) => {
            state.upcomingMovies.loading = false;
            state.upcomingMovies.error = action.error.message;
        });
    }
});

export const { addQuery } = moviesSlice.actions;
export default moviesSlice.reducer;