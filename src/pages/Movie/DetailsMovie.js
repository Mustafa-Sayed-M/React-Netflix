import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatRunTime } from "../../functions/functions";
import { useDispatch, useSelector } from "react-redux";
import StarsList from "../../components/StarsList";
import Loader from "../../components/Loader";
import LinkKeyword from "../../components/LinkKeyword";
import DetailsMedia from "../DetailsMedia";
import {
    fetchMovie,
    fetchMovieImages,
    fetchMovieKeywords,
    fetchMovieSimilar
} from "../../store/slices/movie_slices/movieSlice";

function DetailsMovie() {

    const StarsListMemoized = React.memo(StarsList);
    const LoaderMemoized = React.memo(Loader);

    // Dispatch Hook:
    const dispatch = useDispatch();

    // Params Hook:
    const movie_id = useParams()?.movie_id;

    // Selector Hook:
    const { movie, keywordsMovie, similarMovie, imagesMovie } = useSelector(state => state.movie);

    // Effect Hook:
    useEffect(() => {
        if (movie_id) {
            dispatch(fetchMovie(movie_id));
            dispatch(fetchMovieImages(movie_id));
            dispatch(fetchMovieKeywords(movie_id));
            dispatch(fetchMovieSimilar(movie_id));
        }
    }, [dispatch, movie_id]);

    // Extract Data:
    const {
        title = '',
        overview = '',
        backdrop_path,
        runtime = 0,
        popularity = 0,
        production_companies = [],
        production_countries = [],
        budget = 0,
        spoken_languages = '',
        vote_average = 0,
        release_date = '',
        genres = [] } = movie.data;

    const dataItems = [
        {
            key: 'Languages',
            label: 'Languages:',
            data: spoken_languages.length > 0
                && <ul>
                    {
                        spoken_languages.map((lang, index) => {
                            return (
                                <span key={lang.id || index} className="me-1">{lang.name}</span>
                            )
                        })
                    }
                </ul>
        },
        {
            key: 'Keywords',
            label: 'Keywords:',
            data: keywordsMovie.data.keywords.length > 0
                && <ul>
                    {
                        keywordsMovie.data.keywords.map((keyword, index) => {
                            return (
                                <LinkKeyword
                                    path='/search'
                                    className='underLineWhenHover me-1'
                                    key={keyword.id || index}
                                    content={keyword.name}
                                />
                            )
                        })
                    }
                </ul>
        },
        {
            key: 'Type',
            label: 'Type:',
            data: genres.length > 0 && <ul>
                {
                    genres.map(genre => {
                        return (
                            <span key={genre.name} className="me-1">{genre.name}</span>
                        )
                    })
                }
            </ul>
        },
        {
            key: 'Rating',
            label: 'Rating:',
            data: vote_average > 0 && <div className="ms-2 d-flex align-items-center">
                <StarsListMemoized className='me-2' rate={vote_average} />
            </div>,
        },
        {
            key: 'Popularity',
            label: 'Popularity:',
            data: popularity > 0 && <span>{popularity}</span>,
        },
        {
            key: 'Runtime',
            label: 'Runtime:',
            data: runtime > 0 && <span>{formatRunTime(runtime)}</span>,
        },
        {
            key: 'Budget',
            label: 'Budget:',
            data: budget > 0 && <span>{budget}$</span>,
        },
        {
            key: 'Production Countries',
            label: 'Production Countries:',
            data: production_countries.length > 0 &&
                <ul>
                    {
                        production_countries.map((country, index) => {
                            return (
                                <span key={index} className="me-1">{country.name}</span>
                            )
                        })
                    }
                </ul>
        },
        {
            key: 'Production Companies',
            label: 'Production Companies:',
            data: production_companies.length > 0 &&
                <ul>
                    {
                        production_companies.map((Company, index) => {
                            return (
                                <span key={index} className="me-1">{Company.name}</span>
                            )
                        })
                    }
                </ul>
        },
    ];

    const mediaData = {
        media: movie,
        singleMedia: movie,
        dataItems: dataItems,
        mediaTitle: title,
        mediaYear: release_date,
        mediaOverview: overview,
        mediaBackdrop: backdrop_path,
        mediaImages: imagesMovie.data,
        mediaSimilar: similarMovie.data,
    }

    // Return Content
    return (
        movie.loading ?
            <LoaderMemoized />
            :
            <DetailsMedia mediaData={mediaData} />
    )
}

export default DetailsMovie;