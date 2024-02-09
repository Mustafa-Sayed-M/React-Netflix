const API_KEY = process.env.REACT_APP_API_KEY;
const api = {
    // Api Key:
    api_key: API_KEY,

    // Base Url:
    base_url: 'https://api.themoviedb.org/3',

    // Movie:
    get_movies: '/discover/movie',
    
    get_movie: '/movie/', // Require Movie Id
    get_upcoming: 'upcoming', // Require Movie Id

    // Tv:
    get_tv: '/discover/tv',
    get_series: '/tv/', // Require Series Id
    get_season: '/season/', // Require Season Number

    // Images:
    poster_image: 'https://image.tmdb.org/t/p/w500', // Require Poster Path
    backdrop_image: 'https://image.tmdb.org/t/p/original', // Require Image Path
    get_images: '/images',

    // Reviews:
    get_reviews: '/reviews',

    // Keywords:
    get_keywords: '/keywords',

    // Similar:
    get_similar: '/similar',

    // Genres:
    get_movies_genres: '/genre/movie/list',
    get_tv_genres: '/genre/tv/list',

    // Trending Endpoints:
    get_trending_all_day: '/trending/all/day',
    get_trending_all_week: '/trending/all/week',
    get_trending_movies_day: '/trending/movie/day',
    get_trending_movies_week: '/trending/movie/week',
    get_trending_series_day: '/trending/tv/day',
    get_trending_series_week: '/trending/tv/week',

    // Search:
    get_multiSearch: '/search/multi',
    get_search_movie: '/search/movie',
    get_search_tv: '/search/tv'
}

export default api;