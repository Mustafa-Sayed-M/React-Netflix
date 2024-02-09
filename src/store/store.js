import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movie_slices/moviesSlice";
import movieReducer from "./slices/movie_slices/movieSlice";
import tvReducer from "./slices/tv_slices/tvSlice";
import seriesReducer from "./slices/tv_slices/seriesSlice";
import likedReducer from "./slices/likedSlice";
import trendingReducer from "./slices/trendingSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        tv: tvReducer,
        series: seriesReducer,
        liked: likedReducer,
        trending: trendingReducer,
        searchResults: searchReducer,
    }
})

export default store;