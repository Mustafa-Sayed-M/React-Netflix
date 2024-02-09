import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { formatRunTime, formatRating, fetchData } from "../../functions/functions";
import SliderPhotos from "../../components/Sliders/SliderPhotos";
import SliderGuestStars from "../../components/Sliders/SliderGuestStars";
import SliderCrew from "../../components/Sliders/SliderCrew";
import api from '../../services/api';
import Loader from "../../components/Loader";

function DetailsEpisode() {
    // Hooks:
    const { series_id, episode_number, season_number } = useParams();

    const [episodeData, setEpisodeData] = useState({
        name: '',
        overview: '',
        air_date: '',
        runtime: 0,
        guest_stars: [],
        crew: [],
        vote_average: 0,
    });
    const [images, setImages] = useState({ stills: [] });

    // Api Links
    const api_link = `${api.base_url}${api.get_single_series}${series_id}/season/${season_number}/episode/${episode_number}?api_key=${api.api_key}`;
    const api_images_link = `${api.base_url}${api.get_single_series}${series_id}/season/${season_number}/episode/${episode_number}/images?api_key=${api.api_key}`;

    useEffect(() => {
        fetchData(api_link, setEpisodeData);
        fetchData(api_images_link, setImages);
    }, [api_images_link, api_link])

    // Extract Data:
    const {
        name,
        overview,
        air_date,
        guest_stars,
        crew,
        runtime,
        vote_average,
    } = episodeData;


    // Data Items:
    const dataItems = [
        {
            key: 'runtime',
            label: 'Runtime',
            data: runtime && <p className="me-2">Runtime: ( {formatRunTime(runtime)} )</p>,
        },
        {
            key: 'episode',
            label: 'Episode',
            data: episode_number ? <p className="me-2">Episode: ( {episode_number} )</p> : '',
        },
        {
            key: 'season',
            label: 'Season',
            data: season_number ? <p className="me-2">Season: ( {season_number} )</p> : '',
        },
        {
            key: 'vote average',
            label: 'Vote Average',
            data: vote_average ? <p className="me-2">Vote Average: {formatRating(vote_average)}</p> : '',
        },
        {
            key: 'air date',
            label: 'Air Date',
            data: <p className="me-2">Air Date: {air_date}</p>,
        },
    ]

    // Return Content
    return (
        episodeData.still_path ?
            <div className="details_episode_page">
                <div className="mb-3" style={{ height: '70vh' }}>
                    <div className="bg_image h-100">
                        <Image
                            src={`${api.backdrop_image}${episodeData.still_path}?api_key=${api.api_key}`}
                            alt={name}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                </div>
                <Container fluid>
                    {/* Details */}
                    <div className="details mb-4">
                        <h4 className="mb-2">{name}</h4>
                        <p className='opacity-75 mb-3'>{overview}</p>
                        <h4 className="mb-4 head_title">Details: </h4>
                        <ul>{dataItems.map((item, index) => item.data && <li key={index} className="border-bottom pb-2">{item.data}</li>)}</ul>
                    </div>
                    {/* Photos */}
                    {
                        images.stills.length > 0 && <div className="photos mb-5">
                            <h4 className="mb-4 head_title">Photos: <span className="fs-6">({images.stills.length})</span></h4>
                            <SliderPhotos listPhotos={images.stills} />
                        </div>
                    }
                    {/* Guest Stars */}
                    {
                        guest_stars.length > 0 && <div className="guest_stars mb-5">
                            <h4 className="mb-4 head_title">Guest Stars: <span className="fs-6">({guest_stars.length})</span></h4>
                            <SliderGuestStars listGuestStars={guest_stars} />
                        </div>
                    }
                    {/* Crew */}
                    {
                        crew.length > 0 && <div className="crew mb-5">
                            <h4 className="mb-4 head_title">Crew: <span className="fs-6">({crew.length})</span></h4>
                            <SliderCrew listCrew={crew} />
                        </div>
                    }
                </Container>
            </div>
            :
            <Loader />
    )
}

export default DetailsEpisode;