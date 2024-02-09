import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../../store/slices/searchSlice";
import { fetchSeriesImages, fetchSeriesKeywords, fetchSeriesSimilar } from "../../store/slices/tv_slices/seriesSlice";
import StarsList from "../../components/StarsList";
import Loader from "../../components/Loader";
import LinkKeyword from "../../components/LinkKeyword";
import DetailsMedia from "../DetailsMedia";
import { fetchSeries } from "../../store/slices/tv_slices/seriesSlice";

function DetailsSeries() {

    const StarsListMemoized = React.memo(StarsList);

    const dispatch = useDispatch();

    const { series, keywordsSeries, similarSeries, imagesSeries } = useSelector(state => state.series)

    // Params Hook:
    const { series_id } = useParams();

    // Effect Hook:
    useEffect(() => {
        dispatch(fetchSeries(series_id));
        dispatch(fetchSeriesKeywords(series_id));
        dispatch(fetchSeriesImages(series_id));
        dispatch(fetchSeriesSimilar(series_id));
    }, [dispatch, series_id]);

    // Extract Data:
    const {
        name = '',
        overview = '',
        number_of_episodes = 0,
        number_of_seasons = 0,
        production_companies = [],
        production_countries = [],
        popularity = 0,
        languages = [],
        backdrop_path = '',
        original_name = '',
        vote_average = 0,
        first_air_date = 0,
        seasons = [],
        genres = [],
    } = series.data;


    // Handel:
    const handelKeyword = (keyword) => {
        dispatch(setKeyword(keyword));
    }

    // Data Items:
    const dataItems = [
        {
            key: 'Languages',
            label: 'Languages:',
            data: languages.length > 0
                &&
                <ul>
                    {
                        languages.map((lang, index) => {
                            return (
                                <span key={lang.id || index} className="me-1 text-capitalize">{lang}</span>
                            )
                        })
                    }
                </ul>
        },
        {
            key: 'Keywords',
            label: 'Keywords:',
            data: keywordsSeries.data.results && keywordsSeries.data.results.length > 0
                &&
                <ul>
                    {
                        keywordsSeries.data.results.map((keyword, index) => {
                            return (
                                <LinkKeyword
                                    path='/search'
                                    className='underLineWhenHover me-1'
                                    key={keyword.id || index}
                                    onClickFunc={() => { handelKeyword(keyword.name) }}
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
            data: genres.length > 0 &&
                <ul>
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
            data: vote_average > 0 && <StarsListMemoized rate={vote_average} />,
        },
        {
            key: 'Popularity',
            label: 'Popularity:',
            data: popularity > 0 && <span>{popularity}</span>,
        },
        {
            key: 'Original Name',
            label: 'Original Name:',
            data: <span>{original_name}</span>,
        },
        {
            key: 'Number of Episodes',
            label: 'Number of Episodes:',
            data: <span>{number_of_episodes}</span>,
        },
        {
            key: 'Number of  Seasons',
            label: 'Number of  Seasons:',
            data: <span>{number_of_seasons}</span>,
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
    ]

    const mediaData = {
        media: series,
        singleMedia: series.data,
        dataItems: dataItems,
        mediaTitle: name,
        mediaYear: first_air_date,
        mediaOverview: overview,
        mediaBackdrop: backdrop_path,
        mediaImages: imagesSeries.data,
        mediaSimilar: similarSeries.data,
        mediaSeasons: {
            series_id,
            seasons
        },
    }

    // Return Content
    return (
        backdrop_path ?
            <DetailsMedia mediaData={mediaData} />
            :
            <Loader />
    )
}

export default DetailsSeries;