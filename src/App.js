import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieGenres, fetchMovies, fetchUpcomingMovies } from "./store/slices/movie_slices/moviesSlice";
import { fetchTrending } from "./store/slices/trendingSlice";
import { fetchTv, fetchTvGenres } from "./store/slices/tv_slices/tvSlice";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import MoviesPage from "./pages/Movie/MoviesPage";
import TvPage from "./pages/Tv/TvPage";
import Profile from "./pages/Profile";
import DetailsMovie from "./pages/Movie/DetailsMovie";
import DetailsSeries from "./pages/Tv/DetailsSeries";
import SeasonEpisodes from "./pages/Tv/SeasonEpisodes";
import DetailsEpisode from "./pages/Tv/DetailsEpisode";
import Search from "./pages/Search";
import Upcoming from "./pages/Upcoming";
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies({ page: 1, genre: '' }));
    dispatch(fetchMovieGenres());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchTv({ page: 1, genre: '' }));
    dispatch(fetchTvGenres());
    dispatch(fetchTrending());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/tv' element={<TvPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:movie_id' element={<DetailsMovie />} />
        <Route path='/series/:series_id' element={<DetailsSeries />} />
        <Route path='/series/:series_id/season/:number_season' element={<SeasonEpisodes />} />
        <Route path='/series/:series_id/season/:season_number/episode/:episode_number' element={<DetailsEpisode />} />
        <Route path='/upcoming' element={<Upcoming />} />
      </Routes>
    </div>
  );
}

export default App;