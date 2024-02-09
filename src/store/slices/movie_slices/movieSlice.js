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

export const fetchMovie = createAsyncThunk('movieSlice/fetchMovie', async (movie_id) => {
    const API = constructApiUrl(`${api.get_movie}${movie_id}`, { api_key: api.api_key });

    return fetchData(API, options);
});

export const fetchMovieKeywords = createAsyncThunk('movieSlice/fetchMovieKeywords', async (movie_id) => {
    const API_KEYWORDS = constructApiUrl(`${api.get_movie}${movie_id}${api.get_keywords}`, { api_key: api.api_key });
    return fetchData(API_KEYWORDS, options);
});

export const fetchMovieSimilar = createAsyncThunk('movieSlice/fetchMovieSimilar', async (movie_id) => {
    const API_SIMILAR = constructApiUrl(`${api.get_movie}${movie_id}${api.get_similar}`, { api_key: api.api_key });
    return fetchData(API_SIMILAR, options);
});

export const fetchMovieImages = createAsyncThunk('movieSlice/fetchMovieImages', async (movie_id) => {
    const API_IMAGES = constructApiUrl(`${api.get_movie}${movie_id}${api.get_images}`, { api_key: api.api_key });
    return fetchData(API_IMAGES, options);
});

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: {
        movie: {
            data: {
                id: 0,
                title: '',
                backdrop_path: '',
                poster_path: '',
                overview: '',
                release_date: '',
                vote_average: 0,
                vote_count: 0,
                genres: []
            },
            loading: false,
            error: null,
        },
        keywordsMovie: {
            data: {
                keywords: []
            },
            loading: false,
            error: null,
        },
        similarMovie: {
            data: {
                results: []
            },
            loading: false,
            error: null,
        },
        imagesMovie: {
            data: {
                backdrops: []
            },
            loading: false,
            error: null,
        },
    },
    reducer: {},
    extraReducers: (builder) => {
        // ===================================
        builder.addCase(fetchMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMovie.fulfilled, (state, action) => {
            state.movie.loading = false;
            state.movie.data = action.payload;
        });
        builder.addCase(fetchMovie.rejected, (state, action) => {
            state.movie.loading = false;
            state.error = action.error.message;
        });

        // ===================================
        builder.addCase(fetchMovieKeywords.pending, (state) => {
            state.keywordsMovie.loading = true;
        });
        builder.addCase(fetchMovieKeywords.fulfilled, (state, action) => {
            state.keywordsMovie.loading = false;
            state.keywordsMovie.data = action.payload;
        });
        builder.addCase(fetchMovieKeywords.rejected, (state, action) => {
            state.keywordsMovie.loading = false;
            state.keywordsMovie.error = action.error.message;;
        });

        // ===================================
        builder.addCase(fetchMovieSimilar.pending, (state) => {
            state.similarMovie.loading = true;
        });
        builder.addCase(fetchMovieSimilar.fulfilled, (state, action) => {
            state.similarMovie.loading = false;
            state.similarMovie.data = action.payload;
        });
        builder.addCase(fetchMovieSimilar.rejected, (state, action) => {
            state.similarMovie.loading = false;
            state.similarMovie.error = action.error.message;;
        });

        // ===================================
        builder.addCase(fetchMovieImages.pending, (state) => {
            state.imagesMovie.loading = true;
        });
        builder.addCase(fetchMovieImages.fulfilled, (state, action) => {
            state.imagesMovie.loading = false;
            state.imagesMovie.data = action.payload;
        });
        builder.addCase(fetchMovieImages.rejected, (state, action) => {
            state.imagesMovie.loading = false;
            state.imagesMovie.error = action.error.message;;
        });

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = movieSlice.actions;
export default movieSlice.reducer;