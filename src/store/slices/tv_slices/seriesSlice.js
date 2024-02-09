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

export const fetchSeries = createAsyncThunk('seriesSlice/fetchSeries', async (series_id) => {
    const API = constructApiUrl(`${api.get_series}${series_id}`, { api_key: api.api_key });
    return fetchData(API, options);
});

export const fetchSeriesKeywords = createAsyncThunk('seriesSlice/fetchSeriesKeywords', async (series_id) => {
    const API_KEYWORDS = constructApiUrl(`${api.get_series}${series_id}${api.get_keywords}`, { api_key: api.api_key });
    return fetchData(API_KEYWORDS, options);
});

export const fetchSeriesSimilar = createAsyncThunk('seriesSlice/fetchSeriesSimilar', async (series_id) => {
    const API_SIMILAR = constructApiUrl(`${api.get_series}${series_id}${api.get_similar}`, { api_key: api.api_key });
    return fetchData(API_SIMILAR, options);
});

export const fetchSeriesImages = createAsyncThunk('seriesSlice/fetchSeriesImages', async (series_id) => {
    const API_IMAGES = constructApiUrl(`${api.get_series}${series_id}${api.get_images}`, { api_key: api.api_key });
    return fetchData(API_IMAGES, options);
});

const initialState = {
    series: {
        data: {
            id: 0,
            name: '',
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
    keywordsSeries: {
        data: {
            results: []
        },
        loading: false,
        error: null,
    },
    similarSeries: {
        data: {
            results: []
        },
        loading: false,
        error: null,
    },
    imagesSeries: {
        data: {
            backdrops: []
        },
        loading: false,
        error: null,
    },
}

const seriesSlice = createSlice({
    name: 'seriesSlice',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        // ===================================
        builder.addCase(fetchSeries.pending, (state) => {
            state.series.loading = true;
        });
        builder.addCase(fetchSeries.fulfilled, (state, action) => {
            state.series.loading = false;
            state.series.data = action.payload;
        });
        builder.addCase(fetchSeries.rejected, (state, action) => {
            state.series.loading = false;
            state.series.error = action.error.message;
        });

        // ===================================
        builder.addCase(fetchSeriesKeywords.pending, (state) => {
            state.keywordsSeries.loading = true;
        });
        builder.addCase(fetchSeriesKeywords.fulfilled, (state, action) => {
            state.keywordsSeries.loading = false;
            state.keywordsSeries.data.results = action.payload.results;
        });
        builder.addCase(fetchSeriesKeywords.rejected, (state, action) => {
            state.keywordsSeries.loading = false;
            state.keywordsSeries.error = action.error.message;;
        });

        // ===================================
        builder.addCase(fetchSeriesSimilar.pending, (state) => {
            state.similarSeries.loading = true;
        });
        builder.addCase(fetchSeriesSimilar.fulfilled, (state, action) => {
            state.similarSeries.loading = false;
            state.similarSeries.data = action.payload;
        });
        builder.addCase(fetchSeriesSimilar.rejected, (state, action) => {
            state.similarSeries.loading = false;
            state.similarSeries.error = action.error.message;;
        });

        // ===================================
        builder.addCase(fetchSeriesImages.pending, (state) => {
            state.imagesSeries.loading = true;
        });
        builder.addCase(fetchSeriesImages.fulfilled, (state, action) => {
            state.imagesSeries.loading = false;
            state.imagesSeries.data = action.payload;
        });
        builder.addCase(fetchSeriesImages.rejected, (state, action) => {
            state.imagesSeries.loading = false;
            state.imagesSeries.error = action.error.message;;
        });

    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = seriesSlice.actions;
export default seriesSlice.reducer;